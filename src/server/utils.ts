import fs from 'fs'
import path from 'path'
import { Config } from '@/types'
import { logLevel } from './index'
import cron from 'node-cron'

/**
 *
 * @returns Config
 */
export const getConfig = (): Config => {
  const cwd = process.cwd()
  const defaultFile = path.join(cwd, 'src', 'config.default.json')
  const dir = path.join(cwd, 'data')
  const file = path.join(dir, 'config.json')

  if (!fs.existsSync(dir)) {
    log('INFO', 'data', `create folder: ${dir}`)
    fs.mkdirSync(dir)
  }

  if (!fs.existsSync(file)) {
    log('INFO', 'data', 'configuration not found, copying config.default.json')
    fs.copyFileSync(defaultFile, file)
  }

  const fileContents = fs.readFileSync(file, { encoding: 'utf8' })
  const json = JSON.parse(fileContents)
  log('INFO', 'data', `configuration read from disk: ${file}`)
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

export const cronTask = (
  interval: number = 5, // 5m default
  callback: Function
) => {
  const cronString = `*/${interval} * * * *`
  const task = cron.schedule(
    cronString,
    () => {
      callback()
      log('INFO', 'cron', 'task executed')
    },
    {
      scheduled: false,
    }
  )

  log('INFO', 'cron', `task schedule: every ${interval} minutes`)
  return task
}
