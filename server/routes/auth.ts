import express, { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/authService'
import { generateToken } from '../utils/jwt'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
        await registerUser(name, email, password)
        res.status(201).json({ message: '登録成功' })
    } catch (err:any) {
        if (err.message.includes('登録されているメールアドレス')) {
            res.status(409).json({ error: err.message }) // 409 Conflict
        } else {
            res.status(500).json({ error: '登録に失敗しました' })
        }
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user:any = await loginUser(email, password)
        if (user.success) {
            const token = generateToken({ id: user.id, name: user.name, email: user.email })
            // トークンをjavascriptからアクセス不可なcookieに保存
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',    // 本番はtrue（HTTPS限定）
                sameSite: 'lax', // または 'strict' にしてCSRF対策
                maxAge: 1000 * 60 * 60 // 1h
            })
            res.status(200).json({ message: 'ログイン成功' })
        } else {
            res.status(401).json({ error: 'メールアドレスまたはパスワードが正しくありません' })
        }
    } catch (err:any) {
        console.error('ログインエラー:', err)
        res.status(500).json({ error: 'エラーが発生しました' })
    }
})

router.post('/logout', async (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })
    res.sendStatus(200)
})

export default router
