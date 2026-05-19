import { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
    group: 'Contenido',
  },
  labels: {
    singular: 'Suscriptor',
    plural: 'Suscriptores',
  },
  access: {
    // Ajusta esto según quién quieres que pueda ver la lista
    read: ({ req: { user } }) => !!user,
    create: () => true, // Público para que el formulario pueda escribir
    update: () => false, // Mejor no permitir edición de emails
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
      unique: true, // Evita registros duplicados
      label: 'Correo electrónico',
      validate: (val: string | string[] | null | undefined) => {
        const email = Array.isArray(val) ? val[0] : val
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
          return 'Por favor, ingresa un correo electrónico válido.'
        }
        return true
      },
    },
  ],
  timestamps: true, // Esto nos dará la fecha de suscripción automáticamente
}
