import parseFile from './parsers.js';
import buildDiff from './diffBuilder.js';
import formatStylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  
  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default genDiff;