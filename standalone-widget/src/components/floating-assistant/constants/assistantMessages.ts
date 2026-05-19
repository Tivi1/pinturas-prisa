/** Respuestas rápidas locales (no llaman a Cody; el campo de texto sí). */
export const QUICK_ACTION_MOCK_REPLIES: Record<
  string,
  { userEcho: string; assistantReply: string }
> = {
  surface: {
    userEcho: "Quiero elegir pintura según la superficie",
    assistantReply:
      "Perfecto. Indica si es muro interior, exterior, madera, metal o fachada y te oriento con la línea PRISA adecuada (ej. arquitectónico, esmaltes, impermeabilizantes).",
  },
  quote: {
    userEcho: "Necesito cotizar un producto",
    assistantReply:
      "Para cotizar, comparte producto aproximado, m² a cubrir y ciudad. Mientras tanto puedes revisar la calculadora PRISA en el sitio.",
  },
  store: {
    userEcho: "Busco una tienda cercana",
    assistantReply:
      "Usa el localizador en la página o indica tu CP o colonia; luego te sugeriremos distribuidores autorizados cerca de ti.",
  },
  promos: {
    userEcho: "Quiero ver promociones",
    assistantReply:
      "Revisa la sección de promociones del sitio o el newsroom; cuando esté la API, podremos mostrarte ofertas vigentes personalizadas.",
  },
  support: {
    userEcho: "Hablar con soporte",
    assistantReply:
      "Te conectaremos con soporte. Deja tu mensaje abajo o el teléfono de contacto corporativo en la web para seguimiento inmediato.",
  },
};
