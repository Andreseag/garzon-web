import type { CollectionConfig } from 'payload'

export const PollVotes: CollectionConfig = {
  slug: 'poll-votes',
  admin: {
    useAsTitle: 'municipality',
    defaultColumns: ['poll', 'ageRange', 'municipality', 'gender', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'poll',
      type: 'relationship',
      relationTo: 'polls',
      required: true,
      label: 'Sondeo Asociado',
    },
    {
      name: 'optionId',
      type: 'text',
      required: true,
      label: 'ID de la Opción Votada',
    },
    {
      name: 'ageRange',
      type: 'select',
      options: [
        { label: '18 - 28 años', value: '18-28' },
        { label: '29 - 45 años', value: '29-45' },
        { label: '46 - 60 años', value: '46-60' },
        { label: 'Mayor de 60 años', value: '61+' },
      ],
      label: 'Rango de Edad',
    },
    {
      name: 'municipality',
      type: 'text',
      label: 'Municipio o Zona',
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Femenino', value: 'Femenino' },
        { label: 'Otro', value: 'Otro' },
        { label: 'Prefiero no decirlo', value: 'Prefiero no decirlo' },
      ],
      label: 'Género',
    },
  ],
}
