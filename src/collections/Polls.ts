import { CollectionConfig } from 'payload'

export const Polls: CollectionConfig = {
  slug: 'polls',
  labels: {
    singular: 'Encuesnta',
    plural: 'Encuestas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'totalVotes'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Pregunta o Tema de la Encuesta',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Imagen Principal / Portada de la Encuesta',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Encuesta Activa',
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      minRows: 2,
      labels: {
        singular: 'Candidato / Opción',
        plural: 'Candidatos / Opciones',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Nombre del Candidato u Opción',
        },
        {
          name: 'partyOrSubtitle',
          type: 'text',
          label: 'Partido Político o Subtítulo (Opcional)',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Fotografía',
        },
        {
          name: 'votes',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Conteo automático de votos',
          },
        },
      ],
    },
    {
      name: 'totalVotes',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Total acumulado',
      },
    },
  ],
}
