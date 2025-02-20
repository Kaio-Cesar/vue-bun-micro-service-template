import { existsSync, mkdirSync } from 'node:fs'

if (!existsSync('./data/db')) {
  mkdirSync('./data/db', { recursive: true })
}
