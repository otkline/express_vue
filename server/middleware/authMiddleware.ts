import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export function authMiddleware(req: Request, res: Response, next: NextFunction):void {
    const token = req.cookies?.token
    if (!token) {
        res.status(401).json({ message: 'トークンが見つかりません' })
        return
    }

    try {
        const decoded = verifyToken(token)
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
        }
        next()
    } catch(err:any) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'トークンの有効期限が切れています' })
            return
        }
        res.status(401).json({ message: '不正なトークンです' })
    }
}
