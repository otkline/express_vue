import { users } from '../../drizzle/schema'
import { SelectModel } from 'drizzle-orm'

type User = SelectModel<typeof users>

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
