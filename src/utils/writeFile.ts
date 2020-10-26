import fs from 'fs'

/**
 *
 * @param path - data file path
 * @param data - json content
 */
const writeFile = (fileName: string, data: unknown): void => {
  fs.writeFileSync(`${fileName}.json`, JSON.stringify(data, null, 2))
}

export default writeFile
