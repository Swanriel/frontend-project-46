import _ from 'lodash'
import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))
  
  const diffLines = keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`
    }
    if (data1[key] !== data2[key]) {
      return [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`].join('\n')
    }
    return `    ${key}: ${data1[key]}`
  });

  return `{\n${diffLines.join('\n')}\n}`
};

export default genDiff