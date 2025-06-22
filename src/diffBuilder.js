import _ from 'lodash'

const buildDiff = (data1 = {}, data2 = {}) => {
  const safeData1 = _.isObject(data1) ? data1 : {}
  const safeData2 = _.isObject(data2) ? data2 : {}
  const keys = _.union(_.keys(safeData1), _.keys(safeData2)).sort()
  return keys.map((key) => {
    if (!_.has(safeData2, key)) {
      return { key, type: 'removed', value: safeData1[key] }
    }
    if (!_.has(safeData1, key)) {
      return { key, type: 'added', value: safeData2[key] }
    }
    const value1 = safeData1[key]
    const value2 = safeData2[key]
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { 
        key, 
        type: 'nested', 
        children: buildDiff(value1, value2), 
      }
    }
    if (!_.isEqual(value1, value2)) {
      return { 
        key, 
        type: 'changed', 
        oldValue: value1, 
        newValue: value2,
      }
    }
    return { key, type: 'unchanged', value: value1 }
  })
}

export default buildDiff
