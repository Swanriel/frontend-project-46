import { readFileSync } from 'fs'
import path from 'path'
import { load } from 'js-yaml'

const parseFile = (filepath) => {
  try {
    const fileExtension = path.extname(filepath).toLowerCase()
    const fileContent = readFileSync(filepath, 'utf-8')

    switch (fileExtension) {
      case '.json':
        return JSON.parse(fileContent) || {}
      case '.yml':
      case '.yaml':
        return load(fileContent) || {}
      default:
        throw new Error(`Unsupported format: ${fileExtension}`)
    }
  }
    catch (e) {
    console.error(`Error parsing file ${filepath}:`, e.message)
    return {}
  }
}

export default parseFile
