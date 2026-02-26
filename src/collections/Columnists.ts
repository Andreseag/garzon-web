import { CollectionConfig } from 'payload'

export const Columnists: CollectionConfig = {
  slug: 'columnists',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialty'],
    group: 'Contenido',
  },
  labels: {
    singular: 'Columnista',
    plural: 'Columnistas',
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre Completo',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Foto de Perfil',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'specialty',
      label: 'Especialidad / Cargo',
      type: 'text',
      admin: { placeholder: 'Ej: Analista Político, Economista...' },
    },
    {
      name: 'bio',
      label: 'Breve Biografía',
      type: 'textarea',
    },
  ],
}
