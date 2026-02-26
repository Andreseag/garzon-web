interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
}
export const DEPORTES_DATA: Post[] = [
  {
    id: "dep-1",
    title: "Garzón F.C. se clasifica a las finales del torneo regional",
    excerpt:
      "En un partido vibrante en el estadio local, el equipo del municipio logró la victoria necesaria para asegurar su puesto en la siguiente fase.",
    category: "Deportes",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
    slug: "garzon-fc-clasifica-finales",
  },
  {
    id: "dep-2",
    title: "Vuelta al Huila pasará por las principales vías de Garzón",
    excerpt:
      "La caravana ciclística más importante de la región llegará este jueves, lo que implicará cierres viales programados en la Avenida Circunvalar.",
    category: "Deportes",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c4b282?q=80&w=1000&auto=format&fit=crop",
    slug: "vuelta-huila-garzon",
  },
  {
    id: "dep-3",
    title: 'Abren inscripciones para la maratón "San Silvestre" local',
    excerpt:
      "El instituto de deportes invita a todos los jóvenes y adultos a participar en la carrera de cierre de año que recorrerá los barrios del oriente.",
    category: "Deportes",
    image:
      "https://images.unsplash.com/photo-1461891263873-d81c0028122c?q=80&w=1000&auto=format&fit=crop",
    slug: "maraton-san-silvestre-garzon",
  },
];
