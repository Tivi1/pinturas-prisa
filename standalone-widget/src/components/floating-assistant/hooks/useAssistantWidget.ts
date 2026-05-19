"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INITIAL_ASSISTANT_COPY } from "../constants/widgetPublicCopy";
import { sendMessageToAssistant } from "../services/assistantApi";
import type { AssistantMessage, AssistantView } from "../types/assistant.types";

const CONVERSATION_STORAGE_KEY = "prisa-assistant-cody-conversation-id";

function readStoredConversationId(): string | undefined {
  if (typeof sessionStorage === "undefined") return undefined;
  try {
    const v = sessionStorage.getItem(CONVERSATION_STORAGE_KEY);
    return v && v.trim() ? v.trim() : undefined;
  } catch {
    return undefined;
  }
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function createInitialMessages(): AssistantMessage[] {
  const t = Date.now();
  return [
    {
      id: newId(),
      idempotencyKey: "seed-welcome",
      role: "assistant",
      content: INITIAL_ASSISTANT_COPY,
      createdAt: t,
    },
  ];
}

export function useAssistantWidget() {
  const [view, setView] = useState<AssistantView>("closed");
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [messages, setMessages] = useState<AssistantMessage[]>(createInitialMessages);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const conversationIdRef = useRef<string | undefined>(readStoredConversationId());
  /** URL de la página padre leída del query param ?pageUrl= (util cuando el widget corre en dominio propio). */
  const parentPageUrlRef = useRef<string | undefined>(
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("pageUrl") ?? undefined)
      : undefined,
  );
  /** Acumula el texto ya streameado via onStreamDelta para detectar respuesta válida. */
  const streamedRef = useRef<string>("");

  const openPanel = useCallback(() => {
    setView("open");
    setShowWelcomeBubble(false);
  }, []);

  const closePanel = useCallback(() => {
    setView("closed");
  }, []);

  const minimizePanel = useCallback(() => {
    setView("minimized");
  }, []);

  const restorePanel = useCallback(() => {
    setView("open");
  }, []);

  const toggleFromFab = useCallback(() => {
    if (view === "open") minimizePanel();
    else openPanel();
  }, [view, minimizePanel, openPanel]);

  const dismissWelcomeBubble = useCallback(() => {
    setShowWelcomeBubble(false);
  }, []);

  const scrollToLatest = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToLatest();
  }, [messages, loading, scrollToLatest]);

  const appendMessage = useCallback((msg: AssistantMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleSendText = useCallback(async () => {
    const text = draft.trim();
    if (!text || loading) return;

    const userMsg: AssistantMessage = {
      id: newId(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };

    const assistantShellId = newId();
    const assistantShell: AssistantMessage = {
      id: assistantShellId,
      role: "assistant",
      content: "",
      createdAt: Date.now() + 1,
    };

    setDraft("");
    setError(null);
    appendMessage(userMsg);
    appendMessage(assistantShell);
    setLoading(true);
    streamedRef.current = "";

    try {
      const result = await sendMessageToAssistant(text, conversationIdRef.current, {
        pageUrl: parentPageUrlRef.current,
        onStreamDelta: (chunk) => {
          if (!chunk) return;
          streamedRef.current += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantShellId
                ? { ...m, content: m.content + chunk }
                : m,
            ),
          );
        },
      });

      if (result.conversationId) {
        conversationIdRef.current = result.conversationId;
        try {
          sessionStorage.setItem(CONVERSATION_STORAGE_KEY, result.conversationId);
        } catch {
          /* ignore */
        }
      }

      const finalText =
        (typeof result.reply === "string" ? result.reply.trim() : "") ||
        streamedRef.current.trim();

      if (!finalText) {
        setMessages((prev) => prev.filter((m) => m.id !== assistantShellId));
        setError("El agente no devolvio texto. Revisa la API o intenta de nuevo.");
        return;
      }

      // Si result.reply tiene contenido úsalo para normalizar; si no, el bubble ya
      // fue rellenado por onStreamDelta y no hace falta sobreescribir.
      if (result.reply.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantShellId ? { ...m, content: result.reply } : m,
          ),
        );
      }
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== assistantShellId));
      setError(e instanceof Error ? e.message : "No se pudo completar el envío.");
    } finally {
      setLoading(false);
    }
  }, [appendMessage, draft, loading]);

  return {
    view,
    showWelcomeBubble,
    messages,
    draft,
    setDraft,
    loading,
    error,
    listRef,
    openPanel,
    closePanel,
    minimizePanel,
    restorePanel,
    toggleFromFab,
    dismissWelcomeBubble,
    handleSendText,
  };
}
