import path from 'path'
import { readFileSync } from 'fs'
import genDiff from '../src/index.js'

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

test('flat JSON diff', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8')
  expect(genDiff(file1, file2)).toEqual(expected.trim())
})