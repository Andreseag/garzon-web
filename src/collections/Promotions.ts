import type { CollectionConfig } from 'payload'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  labels: { singular: 'Promocional', plural: 'Promocionales' },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    // --- IMÁGENES HORIZONTALES (Para Banners Top/Bottom) ---
    {
      name: 'horizontalImageDesktop',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen Horizontal (Desktop)',
    },
    {
      name: 'horizontalImageMobile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen Horizontal (Mobile)',
    },
    // --- IMÁGENES VERTICALES (Para Sidebars/Columnas) ---
    {
      name: 'verticalImageDesktop',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Vertical (Desktop)',
    },
    {
      name: 'verticalImageMobile',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Vertical (Mobile)',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'URL de destino',
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Ver más',
    },
  ],
}
