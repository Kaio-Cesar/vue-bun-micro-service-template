import { existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

if (!existsSync('./data/db')) {
  mkdirSync(dirname(process.env.DB_FILE_NAME!), { recursive: true })
}
