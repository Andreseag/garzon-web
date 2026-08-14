import { CollectionConfig } from 'payload'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Si estamos creando o actualizando, y el slug está vacío o no existe, lo generamos del nombre
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
    defaultColumns: ['name', 'cuisineType', 'location'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre del Restaurante',
    },
    { name: 'slug', type: 'text', required: false, admin: { position: 'sidebar' } },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción / Especialidad',
    },
    {
      name: 'cuisineType',
      type: 'text',
      label: 'Tipo de Comida (ej. Típica, Italiana, Carnes)',
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
      label: 'Teléfono / WhatsApp de Contacto',
    },
    {
      name: 'menuUrl',
      type: 'text',
      label: 'Enlace al Menú o Redes Sociales',
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
