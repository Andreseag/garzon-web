import { CollectionConfig } from 'payload'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export const Hotels: CollectionConfig = {
  slug: 'hotels',
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (!data?.slug && data?.name) {
            data.slug = formatSlug(data.name)
          }
        }
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'location', 'phone'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre del Establecimiento',
    },
    { name: 'slug', type: 'text', required: false, admin: { position: 'sidebar' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'hotel',
      label: 'Tipo de Establecimiento',
      options: [
        {
          label: 'Hotel / Alojamiento',
          value: 'hotel',
        },
        {
          label: 'Balneario',
          value: 'balneario',
        },
      ],
      admin: {
        position: 'sidebar',
      },
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
      label: 'Teléfono de Contacto / Reservas',
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
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
  ],
}
