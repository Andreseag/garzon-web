import type { CollectionConfig } from 'payload'
import { generateAudioHook } from '../hooks/generateAudio'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Noticias',
    plural: 'Noticias',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'format', 'publishDate', 'status'],
    group: 'Contenido', // Organiza tus colecciones en el sidebar
  },
  access: {
    read: () => true, // Público para todos
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    // Activamos el hook para que corra después de guardar los cambios
    afterChange: [generateAudioHook],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenido',
          fields: [
            {
              name: 'format',
              type: 'select',
              defaultValue: 'news',
              options: [
                { label: 'Noticia estándar', value: 'news' },
                { label: 'Persona de la semana', value: 'person' },
              ],
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Título de la Noticia',
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Sinopsis o Resumen',
              required: true,
              admin: {
                description:
                  'Un resumen corto de la noticia para las tarjetas y previsualizaciones (máx. 160 caracteres).',
              },
              maxLength: 160, // Ideal para SEO y diseño limpio
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'Se genera automáticamente a partir del título si se deja vacío.',
              },
              // Hook para autogenerar el slug
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/ /g, '-')
                        .replace(/[^\w-]+/g, '')
                        .trim()
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Cuerpo de la Noticia',
            },
            {
              name: 'featuredImage',
              type: 'relationship',
              relationTo: 'media',
              required: true,
              label: 'Imagen Destacada',
            },
            {
              name: 'externalVideoUrl',
              type: 'text',
              label: 'Link de Video Externo (YouTube/Vimeo)',
            },
            {
              name: 'newAuthor',
              type: 'text',
              label: 'Autor de la noticia',
              required: true,
              defaultValue: 'Redacción Garzón',
              admin: {
                // 1. Oculta el campo si es Opinión (para que puedan elegir otra cosa)
                condition: (data: Record<string, any>) => data.category !== 'opinion',

                description:
                  'Este campo se autocompleta como "Redacción Garzón" para noticias generales.',
              },
              // 2. Hook de seguridad (Back-end):
              // Esto asegura que, incluso si alguien intenta enviar datos por API,
              // el valor se fuerce a "Redacción Garzón" si la categoría es distinta a 'opinion'.
              hooks: {
                beforeChange: [
                  ({ data, value }) => {
                    if (data?.category !== 'opinion') {
                      return 'Redacción Garzón'
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'category',
              type: 'select',
              required: true,
              options: [
                { label: 'Última hora', value: 'ultima-hora' },
                { label: 'Poder público', value: 'poder-publico' },
                { label: 'Internacional', value: 'internacional' },
                { label: 'Tecnología', value: 'tecnologia' },
                { label: 'Deportes', value: 'deportes' },
                { label: 'Economía', value: 'economia' },
                { label: 'Ciencia y Salud', value: 'ciencia-salud' },
                { label: 'Servicio Social', value: 'servicio-social' },
                { label: 'Denuncia Ciudadana', value: 'denuncia-ciudadana' },
                { label: 'Análisis', value: 'analisis' },
                { label: 'Opinión', value: 'opinion' },
              ],
              admin: {
                condition: (data) => data.format !== 'person',
                description: 'Selecciona la categoría principal de la noticia',
              },
            },
            {
              name: 'columnist',
              label: 'Seleccionar Columnista',
              type: 'relationship',
              relationTo: 'columnists', // Nombre de la colección que creamos antes
              validate: (value: any, { data }: any) => {
                // Solo es obligatorio si es una noticia de "Opinión"
                if (data?.category === 'opinion' && !value) {
                  return 'El columnista es obligatorio para artículos de opinión.'
                }
                return true
              },
              admin: {
                position: 'sidebar', // Lo ponemos en el sidebar para que resalte
                condition: (data) => data.category === 'opinion',
                description: 'Este campo es obligatorio para la categoría Opinión',
              },
            },
          ],
        },
        {
          label: 'Metadatos y Organización',
          fields: [
            {
              name: 'publishDate',
              type: 'date',
              required: true,
              label: 'Fecha de Publicación',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              defaultValue: ({ user }: { user: any }) => user?.id,
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: 'SEO / Meta',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Título (SEO)',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Descripción (SEO)',
            },
          ],
        },
        {
          label: 'Speech',
          fields: [
            {
              name: 'audioNews',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                position: 'sidebar', // Lo mandamos a la barra lateral del admin para que no estorbe
                readOnly: true, // Que sea de solo lectura para que solo la IA lo gestione
              },
            },
          ],
        },
      ],
    },
  ],
}
