export function extractPlainText(content: any): string {
  if (!content?.root?.children) return ''

  return content.root.children
    .map((node: any) => {
      if (node.children) {
        return node.children.map((child: any) => child.text || '').join(' ')
      }
      return ''
    })
    .join(' ')
}
