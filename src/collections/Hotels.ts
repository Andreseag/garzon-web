import { CollectionConfig } from 'payload'

export const Hotels: CollectionConfig = {
  slug: 'hotels',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'phone'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre del Hotel / Alojamiento',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción de las Instalaciones',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen Principal',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Dirección o Sector',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      label: 'Enlace de Google Maps',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono de Reservas',
    },
    {
      name: 'bookingUrl',
      type: 'text',
      label: 'Enlace de Reserva o Sitio Web',
    },
    {
      name: 'isActive',
      label: '¿Está activo?',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
      index: true,
    },
  ],
}
