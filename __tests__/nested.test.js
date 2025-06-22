import { readFileSync } from 'fs'
import path from 'path'
import genDiff from '../src/index.js'

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('nested structure diff', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFileSync(getFixturePath('expected-nested.txt'), 'utf-8')
  expect(genDiff(file1, file2)).toEqual(expected.trim())
})
