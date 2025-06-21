import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  return { data1, data2 }
};

export default genDiff