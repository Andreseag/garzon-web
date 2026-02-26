import React from 'react'

export function RichText({ content }: { content: any }) {
  if (!content?.root?.children) return null

  return (
    <div className="lexical-content">
      {content.root.children.map((node: any, i: number) => {
        if (node.type === 'heading') {
          // Usamos 'ElementType' que es el tipo estándar de React para etiquetas dinámicas
          const Tag = node.tag as React.ElementType

          return (
            <Tag
              key={i}
              className="font-sans font-black tracking-tighter uppercase text-2xl md:text-3xl mt-8 mb-4 text-slate-900 dark:text-white"
            >
              {node.children?.map((child: any, j: number) => (
                <span key={j}>{child.text}</span>
              ))}
            </Tag>
          )
        }

        if (node.type === 'paragraph') {
          return (
            <p key={i} className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300 text-lg">
              {node.children?.map((child: any, j: number) => {
                if (child.format === 1) {
                  // 1 suele ser Bold en Lexical
                  return (
                    <strong key={j} className="font-bold">
                      {child.text}
                    </strong>
                  )
                }
                return <span key={j}>{child.text}</span>
              })}
            </p>
          )
        }

        return null
      })}
    </div>
  )
}
