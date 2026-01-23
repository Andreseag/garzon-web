export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
  time?: string;
}

export const NOTICIAS_DATA: Post[] = [
  {
    id: "noticia-1",
    title:
      "Inversión millonaria para la remodelación del Parque Principal de Garzón",
    excerpt:
      "La administración municipal anunció el inicio de las obras que buscan modernizar el espacio público y atraer el turismo en el corazón del Huila.",
    category: "Actualidad",
    // Imagen de arquitectura urbana/parque
    image:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=1200&auto=format&fit=crop",
    slug: "remodelacion-parque-principal-garzon",
  },
  {
    id: "noticia-2",
    title: "Productores de café reportan cifras récord en la última cosecha",
    excerpt:
      "Gracias a las condiciones climáticas favorables, el gremio cafetero de la región celebra un incremento del 15% en la exportación de grano especial.",
    category: "Economía",
    // Imagen de granos de café de alta calidad
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    slug: "record-cosecha-cafe-huila",
  },
  {
    id: "noticia-3",
    title:
      'Garzón se prepara para el festival gastronómico "Sabores de Nuestra Tierra"',
    excerpt:
      "Más de 20 restaurantes locales participarán este fin de semana en un evento que busca resaltar la identidad culinaria del municipio.",
    category: "Cultura",
    // Imagen de gastronomía profesional
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    slug: "festival-gastronomico-sabores-tierra",
  },
  {
    id: "noticia-4",
    title: "Productores de café reportan cifras récord en la última cosecha",
    excerpt:
      "Gracias a las condiciones climáticas favorables, el gremio cafetero de la región celebra un incremento del 15% en la exportación de grano especial.",
    category: "Economía",
    // Imagen de granos de café de alta calidad
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    slug: "record-cosecha-cafe-huila",
  },
  {
    id: "noticia-5",
    title: "Productores de café reportan cifras récord en la última cosecha",
    excerpt:
      "Gracias a las condiciones climáticas favorables, el gremio cafetero de la región celebra un incremento del 15% en la exportación de grano especial.",
    category: "Economía",
    // Imagen de granos de café de alta calidad
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    slug: "record-cosecha-cafe-huila",
  },
];

export const POLITICA_DATA: Post[] = [
  {
    id: "pol-1",
    title: "Concejo Municipal debate nuevo plan de ordenamiento territorial",
    excerpt:
      "En una sesión extraordinaria, los cabildantes analizan las modificaciones que definirán el crecimiento urbano de Garzón durante la próxima década.",
    category: "Política",
    // Imagen de una sala de juntas / debate institucional
    image:
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1200&auto=format&fit=crop",
    slug: "debate-ordenamiento-territorial-garzon",
  },
  {
    id: "pol-2",
    title: "Gobernación del Huila asegura recursos para proyectos sociales",
    excerpt:
      "Se confirmó la asignación de presupuesto para el fortalecimiento de programas de vivienda y atención a la primera infancia en la zona sur del departamento.",
    category: "Política",
    // Imagen de firma de documentos / oficina gubernamental
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
    slug: "recursos-proyectos-sociales-huila",
  },
  {
    id: "pol-3",
    title: "Avanza veeduría ciudadana sobre obras de infraestructura vial",
    excerpt:
      "Líderes comunales presentaron un informe sobre el estado actual de las vías rurales, exigiendo cumplimiento en los plazos de entrega a los contratistas.",
    category: "Política",
    // NUEVA IMAGEN: Maquinaria trabajando en vía (Infraestructura)
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    slug: "veeduria-ciudadana-vias-garzon",
  },
];

export const ELECCIONES_DATA: Post[] = [
  {
    id: "el-1",
    title:
      "Pulso Presidencial: Las coaliciones definen sus precandidatos para la consulta de marzo",
    excerpt:
      "A menos de un año de las elecciones, los movimientos de centro, derecha e izquierda ajustan sus maquinarias para consolidar listas únicas al Congreso.",
    category: "Elecciones 2026",
    // Imagen de banderas y multitud (mitin político)
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200",
    slug: "coaliciones-presidenciales-2026",
  },
  {
    id: "el-2",
    title:
      "Registraduría anuncia nuevas medidas de biometría para evitar fraude",
    excerpt:
      "El organismo electoral implementará tecnología de punta en los puestos de votación para garantizar la transparencia en los escrutinios.",
    category: "Elecciones 2026",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    slug: "medidas-seguridad-votos",
  },
  {
    id: "el-3",
    title: "Voto joven: El 40% del censo electoral será menor de 30 años",
    excerpt:
      "Las tendencias indican que la población juvenil será el factor determinante en la elección del sucesor en la Casa de Nariño.",
    category: "Elecciones 2026",
    // Imagen de jóvenes manifestándose o participando
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
    slug: "voto-joven-colombia",
  },
  {
    id: "el-4",
    title: "Debate sobre la financiación de campañas se toma el Senado",
    excerpt:
      "Nuevos topes y restricciones a donaciones privadas son discutidos para blindar el proceso electoral de intereses particulares.",
    category: "Elecciones 2026",
    // Imagen de arquitectura de capitolio/senado
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    slug: "financiacion-campanas-presidenciales",
  },
  {
    id: "el-5",
    title: "Voto joven: El 40% del censo electoral será menor de 30 años",
    excerpt:
      "Las tendencias indican que la población juvenil será el factor determinante en la elección del sucesor en la Casa de Nariño.",
    category: "Elecciones 2026",
    // Imagen de jóvenes manifestándose o participando
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
    slug: "voto-joven-colombia",
  },
];

export const VIDEO_POSTS = [
  {
    id: "vid-1",
    title:
      "Análisis: El panorama político de Colombia de cara a las Elecciones 2026",
    category: "Elecciones 2026",
    youtubeId: "bpA9sIBoMoI", // Video real de análisis político
    slug: "panorama-politico-colombia-2026",
  },
  {
    id: "vid-2",
    title:
      "Registraduría Nacional prepara logística para los próximos comicios",
    category: "Nacional",
    youtubeId: "ii59Ed294ME", // Video real sobre procesos electorales
    slug: "logistica-registraduria-2026",
  },
];

export const LATEST_NEWS_DATA: Post[] = [
  {
    id: "ln-1",
    title:
      "El auge tecnológico transforma la dinámica laboral en las ciudades principales",
    excerpt:
      "La implementación de inteligencia artificial y modelos híbridos está redefiniendo cómo operan las empresas en los centros urbanos del país.",
    category: "ECONOMÍA",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    slug: "auge-tecnologico-laboral",
    time: "08:30 a.m.",
  },
  {
    id: "ln-2",
    title: "Lanzan programa de becas para la formación de jóvenes talentos",
    excerpt:
      "El gobierno departamental anunció una inversión histórica para financiar estudios superiores de 5.000 estudiantes destacados.",
    category: "EDUCACIÓN",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    slug: "programa-becas-talentos",
    time: "08:15 a.m.",
  },
  {
    id: "ln-3",
    title:
      "Inician diálogos para impulsar nuevas políticas sociales en el departamento",
    excerpt:
      "Mesas de trabajo con líderes comunitarios buscan establecer las bases del nuevo plan de desarrollo regional para este año.",
    category: "POLÍTICA",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
    slug: "dialogos-politicas-sociales",
    time: "08:10 a.m.",
  },
  {
    id: "ln-4",
    title:
      "Colombia busca expandir el mercado del café hacia nuevos horizontes",
    excerpt:
      "Exportadores nacionales exploran mercados en el sudeste asiático ante la creciente demanda de café especial colombiano.",
    category: "CAFÉ",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
    slug: "expansion-mercado-cafe",
    time: "07:55 a.m.",
  },
  {
    id: "ln-5",
    title:
      "Nuevas inversiones extranjeras llegan para fortalecer el agro huilense",
    excerpt:
      "Empresas europeas confirman la construcción de una planta procesadora de frutas que generará cientos de empleos locales.",
    category: "ECONOMÍA",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
    slug: "inversiones-agro-huila",
    time: "07:40 a.m.",
  },
  {
    id: "ln-6",
    title: "Refuerzan medidas de seguridad en las zonas rurales del municipio",
    excerpt:
      "Patrullajes conjuntos entre policía y ejército se intensifican para proteger la temporada de cosecha en las fincas cafeteras.",
    category: "SEGURIDAD",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
    slug: "medidas-seguridad-rural",
    time: "07:25 a.m.",
  },
  {
    id: "ln-7",
    title:
      "Colombia debuta con victoria en la fase eliminatoria del torneo regional",
    excerpt:
      "Con un doblete del delantero titular, el equipo nacional suma sus primeros tres puntos y lidera el grupo A.",
    category: "DEPORTES",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
    slug: "victoria-torneo-regional",
    time: "07:10 a.m.",
  },
  {
    id: "ln-8",
    title:
      "El auge tecnológico transforma la dinámica laboral en las ciudades principales",
    excerpt:
      "La implementación de inteligencia artificial y modelos híbridos está redefiniendo cómo operan las empresas en los centros urbanos del país.",
    category: "ECONOMÍA",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    slug: "auge-tecnologico-laboral",
    time: "08:30 a.m.",
  },
  {
    id: "ln-9",
    title: "Lanzan programa de becas para la formación de jóvenes talentos",
    excerpt:
      "El gobierno departamental anunció una inversión histórica para financiar estudios superiores de 5.000 estudiantes destacados.",
    category: "EDUCACIÓN",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
    slug: "programa-becas-talentos",
    time: "08:15 a.m.",
  },
  {
    id: "ln-10",
    title:
      "Inician diálogos para impulsar nuevas políticas sociales en el departamento",
    excerpt:
      "Mesas de trabajo con líderes comunitarios buscan establecer las bases del nuevo plan de desarrollo regional para este año.",
    category: "POLÍTICA",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
    slug: "dialogos-politicas-sociales",
    time: "08:10 a.m.",
  },
];
