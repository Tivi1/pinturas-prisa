export const SITE_CONFIG = {
  name: "Pinturas PRISA",
  tagline: "Expertos en Pinturas y Recubrimientos",
  description: "Nuestros productos están diseñados con los más altos estándares de calidad en la industria de pinturas y recubrimientos en México, garantizando durabilidad, eficiencia y confianza en cada aplicación.",
  phone: "+523331341900",
  phoneDisplay: "33 31 34 19 00",
  email: "info@prisa.mx",
  url: "https://prisa.mx",
  logoUrl: "https://prisa.mx/wp-content/uploads/2026/01/logo_prisa.svg",
  logoWhiteUrl: "https://prisa.mx/wp-content/uploads/2025/05/logo_prisa_blanco.svg",
  heroVideoUrl: "https://prisa.mx/wp-content/uploads/2025/07/Prisa-industrial_v3.mp4",
};

export const NAV_LINKS = [
  { label: "Quiénes somos", href: "/adn-prisa" },
  { label: "Productos", href: "#", hasSubmenu: true },
  { label: "Promociones", href: "/promociones" },
  { label: "Gama de Colores", href: "/gama-de-colores" },
  { label: "Inspiración", href: "#", hasSubmenu: true },
];

export const TOP_NAV_LINKS = [
  { label: "Calculadora PRISA®", href: "/calculadora-prisa" },
  { label: "Trabaja en PRISA®", href: "/unete-a-prisa" },
  { label: "Localiza tu Tienda PRISA®", href: "/localiza-tu-tienda" },
];

/** Items del mega menú Productos: con `href` enlazan a subcategoría. */
export type MegaMenuItem = { label: string; href?: string };

export type ProductMegaCategory = {
  name: string;
  href: string;
  imageUrl: string;
  menuImageUrl: string;
  idealPara: MegaMenuItem[];
  tipo: MegaMenuItem[];
  /** Columna izquierda del mega menú (por defecto: «Ideal para»). */
  column1Title?: string;
  /** Columna central (por defecto: «Tipo de productos»). */
  column2Title?: string;
};

export const PRODUCT_CATEGORIES: ProductMegaCategory[] = [
  {
    name: "Arquitectónico",
    href: "/categorias/arquitectonico",
    imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_Arquitectonico.webp",
    menuImageUrl:
      "https://prisa.mx/wp-content/uploads/2025/06/img_Arquitectonico_menu.webp",
    idealPara: [
      { label: "Exteriores", href: "/categorias/arquitectonico/exterior" },
      { label: "Interiores", href: "/categorias/arquitectonico/interior" },
    ],
    tipo: [
      { label: "100% Acrílica", href: "/categorias/arquitectonico/100-acrilica" },
      { label: "Vinil / Acrílica", href: "/categorias/arquitectonico/vinil-acrilica" },
      {
        label: "Selladores y Fondos",
        href: "/categorias/arquitectonico/selladores-y-fondos",
      },
    ],
  },
  {
    name: "Impermeabilizante",
    href: "/categorias/impermeabilizantes",
    imageUrl: "https://prisa.mx/wp-content/uploads/2025/06/img_Impermeabilizante.webp",
    menuImageUrl: "https://prisa.mx/wp-content/uploads/2025/06/img_Impermeabilizante.webp",
    column1Title: "Garantía",
    column2Title: "Tipo",
    idealPara: [
      { label: "10 años", href: "/categorias/impermeabilizantes/10-anos" },
      { label: "7 años", href: "/categorias/impermeabilizantes/7-anos" },
      { label: "5 años", href: "/categorias/impermeabilizantes/5-anos" },
      { label: "3 años", href: "/categorias/impermeabilizantes/3-anos" },
    ],
    tipo: [
      {
        label: "Acrílico elastomérico",
        href: "/categorias/impermeabilizantes/acrilico-elastomerico",
      },
      {
        label: "Acrílico extra elástico",
        href: "/categorias/impermeabilizantes/acrilico-extra-elastico",
      },
      {
        label: "Acrílico fibratado",
        href: "/categorias/impermeabilizantes/acrilico-fibratado",
      },
    ],
  },
  {
    name: "Esmaltes",
    href: "/categorias/esmaltes",
    imageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_metales.webp",
    menuImageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_metales.webp",
    idealPara: [{ label: "Metales" }, { label: "Herrería" }],
    tipo: [{ label: "Alquidálico" }, { label: "Esmalte Acrílico" }, { label: "Anticorrosivos" }],
  },
  {
    name: "Maderas",
    href: "/categorias/madera",
    imageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_maderas.webp",
    menuImageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_maderas.webp",
    idealPara: [{ label: "Interiores" }, { label: "Exteriores" }],
    tipo: [{ label: "Barniz" }, { label: "Tinte" }, { label: "Sellador" }],
  },
  {
    name: "Industrial",
    href: "/categorias/industrial",
    imageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_industrial.webp",
    menuImageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_industrial.webp",
    idealPara: [{ label: "Naves industriales" }, { label: "Estructuras metálicas" }],
    tipo: [{ label: "Epóxicos" }, { label: "Poliuretanos" }, { label: "Primarios" }],
  },
  {
    name: "Automotriz",
    href: "/categorias/automotivo",
    imageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_automotriz.webp",
    menuImageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_automotriz.webp",
    idealPara: [{ label: "Carrocería" }, { label: "Acabado automotriz" }],
    tipo: [{ label: "Base bicapa" }, { label: "Monocapa" }, { label: "Primarios" }],
  },
];

export const PROMOTIONS_DESKTOP = [
  { imageUrl: "https://prisa.mx/wp-content/uploads/2026/04/BannerWeb_1100x483px_72dpis.png", alt: "Promoción PRISA" },
  { imageUrl: "https://prisa.mx/wp-content/uploads/2026/02/Banner_1100-483.png", alt: "Banner PRISA" },
  { imageUrl: "https://prisa.mx/wp-content/uploads/2026/05/banner-prisa-promocion-sellador-alcalino-protec-mayo-1.png", alt: "Sellador Alcalino Protec" },
  { imageUrl: "https://prisa.mx/wp-content/uploads/2026/05/banner-prisa-promocion-colorex-mayo-1.png", alt: "Promoción Colorex" },
];

export const PROMOTIONS_MOBILE = [
  { imageUrl: "https://prisa.mx/wp-content/uploads/2026/04/DIGITAL_800X800PX.png", alt: "Promoción PRISA Mobile" },
  { imageUrl: "https://prisa.mx/wp-content/uploads/2026/02/Banner_800-800.png", alt: "Banner PRISA Mobile" },
];

export const INSPIRATION_ROOMS = [
  { name: "Cocina", href: "/inspiracion-cocina", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_cocina.png" },
  { name: "Salas", href: "/inspiracion-salas", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_salas.png" },
  { name: "Recámaras", href: "/inspiracion-recamaras", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_recamaras.png" },
  { name: "Exteriores", href: "/inspiracion-exteriores", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_exteriores.png" },
  { name: "Comedor", href: "/inspiracion-comedor", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_comedor.png" },
  { name: "Baños", href: "/inspiracion-banos", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_banos.png" },
  { name: "Recámara niños", href: "/inspiracion-recamara-ninos", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_recamaras_ninos.png" },
  { name: "Jardines y patios", href: "/inspiracion-jardines-y-patios", imageUrl: "https://prisa.mx/wp-content/uploads/2025/08/img_jardines_patios.png" },
];

export const COLOR_SWATCHES = [
  { code: "AP148-2", name: "Caramel Cream", hex: "#F3C09D" },
  { code: "AP93-4", name: "Perky Plume", hex: "#DB6C7D" },
  { code: "AP136-6", name: "Plum Pink", hex: "#D6C8D7" },
  { code: "AP71-2", name: "Spring Splash", hex: "#A7E2D4" },
  { code: "AP59-3", name: "Chromatella", hex: "#FCE387" },
  { code: "AP153-4", name: "All Gold", hex: "#FEAB1B" },
  { code: "AP156-1", name: "Sashay Red", hex: "#C6463F" },
  { code: "AP112-4", name: "Willow Branch", hex: "#A3AC5A" },
  { code: "AP165-3", name: "Grassland", hex: "#4E8D47" },
  { code: "AP153", name: "Cronette Orange", hex: "#EC892B" },
  { code: "AP157-4", name: "Purple Comet", hex: "#705676" },
  { code: "AP136-5", name: "Plum Sparkle", hex: "#AE9FBC" },
  { code: "AP141-4", name: "Inca Red", hex: "#B76668" },
  { code: "AP147-2", name: "Prairie Peach", hex: "#F0B99A" },
  { code: "AP98-4", name: "Autumn Blaze", hex: "#EB8C55" },
  { code: "AP75-4", name: "Florence Blue", hex: "#0096AD" },
  { code: "AP71-4", name: "Paradise Waters", hex: "#00B298" },
  { code: "AP121-3", name: "Perry Blue", hex: "#73B1B8" },
  { code: "AP146-4", name: "Firebush", hex: "#C87452" },
  { code: "AP37-4", name: "Copper Ball", hex: "#A2694E" },
];

export const STORE_LOCATOR = {
  title: "Localiza tu tienda",
  heading: "¿Dónde comprar productos PRISA®?",
  description: "Encuentra tu tienda PRISA® más cercana y recibe asesoría personalizada de nuestros expertos. Contamos con una amplia red de distribuidores en todo México, listos para brindarte soluciones especializadas en pintura y recubrimientos.",
  imageUrl: "https://prisa.mx/wp-content/uploads/2025/06/img_localizaTienda.webp",
  href: "/localiza-tu-tienda",
};

export const CALCULATOR = {
  title: "Calculadora PRISA®",
  heading: "¿Cuánta pintura PRISA® necesito?",
  description: "Con la Calculadora de Pintura PRISA®, descubre fácilmente cuánta pintura necesitas según el área y el tipo de superficie. Ingresa los datos de tu espacio y obtén una recomendación personalizada para ese proyecto que estás por comenzar.",
  disclaimer: "El resultado es un cálculo aproximado. Para determinar la cantidad exacta de pintura, consulta con tu tienda PRISA®. Factores como el tipo de muro, el fondo, la técnica de aplicación y la herramienta utilizada pueden afectar el rendimiento real de la pintura.",
  imageUrl: "https://prisa.mx/wp-content/uploads/2025/05/img_calucladora_prisa.webp",
  href: "/calculadora-prisa",
};

export const WORK_AT_PRISA = {
  heading: "Trabajar en PRISA®",
  description: "¿Quieres formar parte de una empresa líder en crecimiento? Explora las vacantes disponibles en nuestra bolsa de trabajo y encuentra tu oportunidad ideal para unirte al equipo PRISA®.",
  imageUrl: "https://prisa.mx/wp-content/uploads/2025/06/IMG_2438-1-1.png",
  badgesUrl: "https://prisa.mx/wp-content/uploads/2025/06/prisa-badges-color.png",
  href: "/unete-a-prisa",
};

export const DEALER = {
  heading: "Quiero ser concesionario PRISA®",
  description: "¿Buscas una oportunidad de negocio rentable? Sé parte de nuestra red de concesionarios PRISA® y obtén acceso a esquemas comerciales y apoyos diseñados para impulsar el crecimiento de tu negocio.",
  imageUrl: "https://prisa.mx/wp-content/uploads/2025/06/img_distribuidor.webp",
  href: "/unete-a-la-red-de-concesionarios-prisa",
};

export const NEWS_ITEMS = [
  {
    title: "Evento Deportivo Familiar 2026",
    category: "Noticias",
    imageUrl: "https://prisa.mx/wp-content/uploads/2026/04/MG_3722-300x168.jpg",
    href: "/noticia/evento-deportivo-familiar-2026",
  },
  {
    title: "PRISA obtiene el Distintivo ESR® como Empresa Socialmente Responsable",
    category: "Noticias",
    imageUrl: "https://prisa.mx/wp-content/uploads/2026/03/prisa-esr-300x157.jpeg",
    href: "/noticia/prisa-obtiene-el-distintivo-esr-como-empresa-socialmente-responsable",
  },
  {
    title: "Convención Nacional de Liderazgo Comercial 2026: visión, estrategia y compromiso con resultados",
    category: "Noticias",
    imageUrl: "https://prisa.mx/wp-content/uploads/2026/03/foto-grupal-300x200.jpeg",
    href: "/noticia/convencion-nacional-de-liderazgo-comercial-2026-vision-estrategia-y-compromiso-con-resultados",
  },
];

export const FOOTER_LINKS_COL1 = [
  { label: "Trabajar en PRISA®", href: "/unete-a-prisa" },
  { label: "Quiero ser Concesionario", href: "/unete-a-la-red-de-concesionarios-prisa" },
  { label: "Newsroom", href: "/newsroom-prisa" },
  { label: "Amigos Prisa", href: "https://amigosprisa.mx/", external: true },
];

export const FOOTER_LINKS_COL2 = [
  { label: "Reglamento para Proveedores", href: "/reglamento-para-proveedores" },
  { label: "Denuncias y Sugerencias", href: "/denuncias-y-sugerencias" },
  { label: "Código de Ética", href: "https://prisa.mx/wp-content/uploads/2025/07/Codigo_de_Etica.pdf", external: true },
  { label: "Certificaciones", href: "/certificaciones-prisa" },
];

export const FOOTER_LINKS_COL3 = [
  { label: "Aviso de Privacidad", href: "/aviso-de-privacidad" },
  { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
];

export const SOCIAL_LINKS = [
  { platform: "facebook", href: "https://www.facebook.com/PinturasPrisaOficial/" },
  { platform: "instagram", href: "https://www.instagram.com/pinturasprisa/" },
  { platform: "pinterest", href: "https://mx.pinterest.com/pinturasprisa/" },
  { platform: "linkedin", href: "https://www.linkedin.com/company/pinturas-prisa/" },
  { platform: "youtube", href: "https://www.youtube.com/channel/UCm0O79dobQeVWlYG5CTyZhQ" },
];
