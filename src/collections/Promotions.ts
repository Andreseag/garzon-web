import type { CollectionConfig } from 'payload'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  labels: { singular: 'Promocional', plural: 'Promocionales' },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'relationship', relationTo: 'media', required: true },
    { name: 'link', type: 'text', label: 'URL de destino (Web/WhatsApp)', required: true },
    { name: 'subtext', type: 'text', label: 'Texto pequeño (Ej: "Valido hasta...")' },
  ],
}
