import { drizzle } from 'drizzle-orm/bun-sqlite'
import { example } from './schema/schema'
import { randomUUID } from 'node:crypto'

export const db = drizzle(process.env.DB_FILE_NAME!)

await db.insert(example).values({
  data: randomUUID(),
  otherData: randomUUID(),
})

const result = await db.select().from(example).all()
console.log(result)
