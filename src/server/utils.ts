import { Config } from '@/types'
import fs from 'fs'
import { logLevel } from './index'

/**
 *
 * @returns Config
 */
export const getConfig = (): Config => {
  const defaultFile = `${process.cwd()}/src/config.default.json`
  let file = `${process.cwd()}/data/config.json`
  let fileContents

  if (!fs.existsSync(file)) {
    log('INFO', 'config', 'not found, copying config.default.json')
    fs.copyFileSync(defaultFile, file)
  }

  fileContents = fs.readFileSync(file, { encoding: 'utf8' })
  const json = JSON.parse(fileContents)
  log('INFO', 'config', `read from disk: ${file}`)
  return json
}

/**
 * Set a nested value on an object via dot notation string
 * @param obj
 * @param dotPath // e.g. 'myProp1.myProp2'
 * @param value
 */
export const setProperty = (obj: any, dotPath: string, value: any): void => {
  const keys = dotPath.split('.')
  let current = obj

  keys.forEach((key, i) => {
    if (!(key in current)) {
      current[key] = {} // Create the object if it doesn't exist
    }

    if (i === keys.length - 1) {
      current[key] = value // Final key - set the  value
    }

    current = current[key] // Set current for next iteration
  })
}

/**
 *
 * @param level
 * @param title
 * @param message
 */
type LogType = 'INFO' | 'WARN' | 'ERROR'
type LogLevel = '' | 'verbose'
export function log(
  type: LogType,
  title: string,
  message: string,
  level?: LogLevel
) {
  if (level === logLevel || !level) {
    let text = ''
    const separator = ' '

    text += `[${type}]`
    text += separator
    text += new Date().toISOString()
    text += separator
    text += title
    text += separator
    text += message

    console.log(text)
  }
}
