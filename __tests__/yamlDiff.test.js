import path from 'path'
import { readFileSync } from 'fs'
import genDiff from '../src/index.js'

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

test('flat YAML diff', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8')
  expect(genDiff(file1, file2)).toEqual(expected.trim())
})
