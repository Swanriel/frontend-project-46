import { readFileSync } from 'fs'
import path from 'path'
import genDiff from '../src/index.js'

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

describe('Plain formatter', () => {
  test('should return correct plain output for nested structures', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    
    const expected = `
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
    `.trim()

    expect(genDiff(file1, file2, 'plain')).toEqual(expected)
  })

  test('should work with YAML files', () => {
    const file1 = getFixturePath('file1.yaml')
    const file2 = getFixturePath('file2.yaml')
    
    const expected = `...`
    expect(genDiff(file1, file2, 'plain')).toEqual(expected)
  })
})
