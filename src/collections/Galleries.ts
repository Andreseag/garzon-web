import { CollectionConfig } from 'payload'

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'Contenido',
  },
  labels: {
    singular: 'Fotogalería',
    plural: 'Fotogalerías',
  },
  fields: [
    {
      name: 'title',
      label: 'Título de la Galería',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      label: 'Fotos de la Galería',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Imagen',
        plural: 'Imágenes',
      },
      fields: [
        {
          name: 'image',
          label: 'Archivo de Imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Pie de foto (Descripción)',
          type: 'textarea',
          required: true,
        },
        {
          name: 'photographer',
          label: 'Nombre del Fotógrafo',
          type: 'text',
          defaultValue: 'Redacción Garzón',
        },
        {
          name: 'credit',
          label: 'Crédito / Agencia',
          type: 'text',
          defaultValue: 'Garzón Web',
        },
      ],
    },
  ],
}
