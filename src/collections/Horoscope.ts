import { CollectionConfig } from 'payload'

export const Horoscope: CollectionConfig = {
  slug: 'horoscopes',
  // MOVIDO: labels ahora es hermano de slug y admin
  labels: {
    singular: 'Horóscopo',
    plural: 'Horóscopos',
  },
  admin: {
    useAsTitle: 'sign',
    defaultColumns: ['sign', 'publishDate'],
    group: 'Contenido', // Organiza tus colecciones en el sidebar
  },
  fields: [
    {
      name: 'sign',
      label: 'Signo Zodiacal',
      type: 'select',
      required: true,
      options: [
        { label: 'Aries', value: 'aries' },
        { label: 'Tauro', value: 'tauro' },
        { label: 'Géminis', value: 'geminis' },
        { label: 'Cáncer', value: 'cancer' },
        { label: 'Leo', value: 'leo' },
        { label: 'Virgo', value: 'virgo' },
        { label: 'Libra', value: 'libra' },
        { label: 'Escorpio', value: 'escorpio' },
        { label: 'Sagitario', value: 'sagitario' },
        { label: 'Capricornio', value: 'capricornio' },
        { label: 'Acuario', value: 'acuario' },
        { label: 'Piscis', value: 'piscis' },
      ],
    },
    {
      name: 'image',
      label: 'Imagen Representativa',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      label: 'Predicción del día',
      type: 'textarea',
      required: true,
    },
    {
      name: 'publishDate',
      label: 'Fecha de la Predicción',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
