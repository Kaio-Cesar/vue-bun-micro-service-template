import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const example = sqliteTable('example', {
  id: integer().primaryKey({ autoIncrement: true }),
  data: text(),
  otherData: text(),
})
