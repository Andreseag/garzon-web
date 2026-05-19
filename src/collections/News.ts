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
    defaultColumns: ['title', 'category', 'publishDate', 'status'],
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
              required: true,
              label: 'Autor de la noticia',
              admin: {
                // Si seleccionas un columnista, este campo se puede ocultar o dejar opcional
                condition: (data) => data.category !== 'opinion',
              },
            },
            {
              name: 'columnist',
              label: 'Seleccionar Columnista',
              type: 'relationship',
              relationTo: 'columnists', // Nombre de la colección que creamos antes
              required: true,
              admin: {
                position: 'sidebar', // Lo ponemos en el sidebar para que resalte
                description: 'Este campo es obligatorio para la categoría Opinión',
              },
            },
          ],
        },
        {
          label: 'Metadatos y Organización',
          fields: [
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
                description: 'Selecciona la categoría principal de la noticia',
              },
            },
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
