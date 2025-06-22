import _ from 'lodash'

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (value === null) return 'null'
    return value
  }

  const indentSize = depth * 4
  const currentIndent = ' '.repeat(indentSize)
  const bracketIndent = ' '.repeat(indentSize - 4)

  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${formatValue(val, depth + 1)}`
  );

  return [
    '{',
    ...lines,
    `${bracketIndent}}`
  ].join('\n')
};

const formatStylish = (diff, depth = 1) => {
  const indentSize = depth * 4
  const indent = ' '.repeat(indentSize - 2)
  const bracketIndent = ' '.repeat(indentSize - 4)

  const lines = diff.flatMap((node) => {
    const { key, type } = node;

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${formatValue(node.value, depth + 1)}`
      case 'removed':
        return `${indent}- ${key}: ${formatValue(node.value, depth + 1)}`
      case 'changed':
        return [
          `${indent}- ${key}: ${formatValue(node.oldValue, depth + 1)}`,
          `${indent}+ ${key}: ${formatValue(node.newValue, depth + 1)}`
        ];
      case 'nested':
        return `${indent}  ${key}: ${formatStylish(node.children, depth + 1)}`
      case 'unchanged':
        return `${indent}  ${key}: ${formatValue(node.value, depth + 1)}`
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  });

  return [
    '{',
    ...lines,
    `${bracketIndent}}`
  ].join('\n')
}

export default formatStylish
