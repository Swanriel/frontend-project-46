const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const buildPlainLines = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
      case 'removed':
        return `Property '${currentPath}' was removed`
      case 'updated':
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      case 'nested':
        return buildPlainLines(node.children, currentPath)
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines.join('\n')
}

export default diff => buildPlainLines(diff)
