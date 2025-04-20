import express, { Request, Response } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

// 認証が必要なルート
router.get('/me', authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: 'ログイン済みユーザー情報',
    user: req.user, // authMiddleware で追加された値
  })
})

export default router
