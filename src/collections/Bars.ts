import { CollectionConfig } from 'payload'

export const Bars: CollectionConfig = {
  slug: 'bars',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'barType'],
    description: 'Colección para listar bares, gastrobares y discotecas.',
  },
  access: {
    read: () => true, // Público (ajusta esto según tus necesidades de seguridad)
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre del Bar',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Breve Descripción',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'barType',
      label: 'Tipo de Establecimiento',
      type: 'select',
      options: [
        { label: 'Bar Tradicional', value: 'traditional_bar' },
        { label: 'Gastrobar', value: 'gastrobar' },
        { label: 'Discoteca / Club', value: 'nightclub' },
        { label: 'Cervecería', value: 'brewery' },
        { label: 'Otro', value: 'other' },
      ],
      defaultValue: 'traditional_bar',
      required: true,
    },
    {
      name: 'location',
      label: 'Dirección / Ubicación',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Teléfono de Contacto',
      type: 'text',
    },
    {
      name: 'featuredImage',
      label: 'Imagen Principal',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'googleMapsUrl',
      label: 'Enlace a Google Maps',
      type: 'text',
    },
    {
      name: 'menuUrl',
      label: 'Enlace a Carta o Web',
      type: 'text',
      admin: {
        placeholder: 'Url donde se puede ver la carta, menú o sitio web del bar.',
      },
    },
    {
      name: 'isActive',
      label: '¿Está activo?',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
