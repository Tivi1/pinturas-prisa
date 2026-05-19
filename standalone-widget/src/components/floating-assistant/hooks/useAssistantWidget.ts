"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QUICK_ACTION_MOCK_REPLIES } from "../constants/assistantMessages";
import { INITIAL_ASSISTANT_COPY } from "../constants/widgetPublicCopy";
import { sendMessageToAssistant } from "../services/assistantApi";
import type { AssistantMessage, AssistantView, QuickActionId } from "../types/assistant.types";

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

  const handleQuickAction = useCallback(
    (id: QuickActionId) => {
      const pack = QUICK_ACTION_MOCK_REPLIES[id];
      if (!pack) return;

      const t = Date.now();
      const userMsg: AssistantMessage = {
        id: newId(),
        role: "user",
        content: pack.userEcho,
        createdAt: t,
        meta: { quickActionId: id },
      };
      const assistantMsg: AssistantMessage = {
        id: newId(),
        role: "assistant",
        content: pack.assistantReply,
        createdAt: t + 1,
        meta: { quickActionId: id },
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setError(null);
    },
    [],
  );

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

    try {
      const result = await sendMessageToAssistant(text, conversationIdRef.current, {
        onStreamDelta: (chunk) => {
          if (!chunk) return;
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

      const finalText = typeof result.reply === "string" ? result.reply.trim() : "";
      if (!finalText) {
        setMessages((prev) => prev.filter((m) => m.id !== assistantShellId));
        setError("El agente no devolvió texto. Revisa la API o intenta de nuevo.");
        return;
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantShellId ? { ...m, content: result.reply } : m,
        ),
      );
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
    handleQuickAction,
    handleSendText,
  };
}
