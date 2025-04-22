import * as dotenv from 'dotenv'
import { resolve } from 'path'
import type { Config } from 'drizzle-kit'

dotenv.config({ path: resolve(__dirname, '../.env') })

export default {
  schema: './drizzle/schema/index.ts',
  out: './drizzle/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  }
} satisfies Config
