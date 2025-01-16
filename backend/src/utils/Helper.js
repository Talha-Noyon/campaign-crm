import moment from 'moment-timezone'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

export function getTimestamp() {
  return Number(moment().tz('Asia/Dhaka'))
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

/**
 * Get the old `__filename` and `__dirname` from the import.meta.url
 * @param {string} metaUrl
 */
export function getLegacyPath(metaUrl) {
  const __filename = fileURLToPath(metaUrl)
  const __dirname = dirname(__filename)

  return {__filename, __dirname}
}
