import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export function authMiddleware(req: Request, res: Response, next: NextFunction):void {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = verifyToken(token)
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
        }
        next()
    } catch {
        res.status(401).json({ message: 'Invalid token' })
    }
}
