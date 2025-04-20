import { UserInfo } from '../UserInfo'

declare global {
  namespace Express {
    export interface Request {
      user?: UserInfo
    }
  }
}
