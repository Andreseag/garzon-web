import type { CollectionConfig } from 'payload'

export const FestivalEvents: CollectionConfig = {
  slug: 'festival-events',
  labels: {
    singular: 'Evento del Festival',
    plural: 'Eventos del Festival',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'category', 'isFeatured'],
    group: 'Colonias de Villanueva', // Mantén todo organizado en el admin
  },
  access: {
    read: () => true, // Público para el sitio web
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nombre del Evento',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL amigable para el evento (ej: concierto-principal)',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Fecha y Hora',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Música', value: 'musica' },
        { label: 'Gastronomía', value: 'gastronomia' },
        { label: 'Deporte', value: 'deporte' },
        { label: 'Religioso', value: 'religioso' },
        { label: 'Desfile / Cultural', value: 'cultural' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lugar del evento',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      label: 'Enlace de Google Maps',
      admin: {
        description: 'Pega el enlace de compartir de Google Maps aquí',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Costo de entrada',
      defaultValue: 'Entrada libre',
      admin: {
        description: 'Ej: "Entrada libre", "$20.000 COP", etc.',
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Imagen destacada',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Destacar evento (Hero)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'promoUrl',
      type: 'text',
      label: 'Link de promoción (WhatsApp/Venta)',
      admin: {
        description: 'Enlace externo para que el usuario compre o pregunte.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descripción detallada',
    },
  ],
}
