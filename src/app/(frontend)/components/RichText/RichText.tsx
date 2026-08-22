import React from 'react'

export function RichText({ content }: { content: any }) {
  if (!content?.root?.children) return null

  // Función recursiva para renderizar cada nodo
  const renderNode = (node: any, index: number): React.ReactNode => {
    switch (node.type) {
      case 'heading': {
        const Tag = node.tag as React.ElementType
        return (
          <Tag
            key={index}
            className="font-sans font-black capitalize text-xl md:text-3xl mt-8 mb-4 text-slate-900 dark:text-white"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </Tag>
        )
      }

      case 'link': {
        const url = node.fields?.url || '#'
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2f86cc] hover:underline font-medium"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </a>
        )
      }

      case 'paragraph': {
        return (
          <p
            key={index}
            className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300 text-lg"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </p>
        )
      }

      case 'list': {
        const Tag = node.tag as React.ElementType // 'ul' o 'ol'
        return (
          <Tag
            key={index}
            className="mb-6 ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </Tag>
        )
      }

      case 'listitem': {
        return node.tag === 'ol' ? (
          <li key={index} className="pl-2 list-decimal">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </li>
        ) : (
          <li key={index} className="pl-2">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </li>
        )
      }

      case 'text': {
        // Manejo de formatos de Lexical (1: Bold, 2: Italic, 8: Underline, etc.)
        let text = <>{node.text}</>
        if (node.format & 1) text = <p className="">{text}</p> // Corregido a <strong>
        if (node.format & 2) text = <em className="italic">{text}</em>
        if (node.format & 8) text = <span className="underline">{text}</span> // Opcional para subrayado
        return <span key={index}>{text}</span>
      }

      case 'linebreak':
        return <br key={index} />

      case 'quote':
        return (
          <blockquote
            key={index}
            className="border-l-4 text-xl border-slate-300 pl-4 italic text-slate-600 dark:text-slate-400 font-semibold"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </blockquote>
        )

      default:
        return null
    }
  }

  return (
    <div className="lexical-content">
      {content.root.children.map((node: any, i: number) => renderNode(node, i))}
    </div>
  )
}
