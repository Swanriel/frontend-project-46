import { readFileSync } from 'fs'
import path from 'path'
import genDiff from '../src/index.js'

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('JSON formatter', () => {
  test('should return valid JSON output', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    
    const result = genDiff(file1, file2, 'json')
    expect(() => JSON.parse(result)).not.toThrow()
    expect(result).toMatchSnapshot()
  })

  test('should work with YAML files', () => {
    const file1 = getFixturePath('file1.yaml')
    const file2 = getFixturePath('file2.yaml')
    
    const result = genDiff(file1, file2, 'json')
    expect(() => JSON.parse(result)).not.toThrow()
  })
})
