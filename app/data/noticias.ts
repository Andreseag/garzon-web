interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
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
];

export const POLITICA_DATA = [
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
