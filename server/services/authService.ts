import bcrypt from 'bcryptjs'
import { pool } from '../config/db'
import { users } from '../drizzle/schema'
import { SelectModel } from 'drizzle-orm'

type User = SelectModel<typeof users>

export async function registerUser(name:string, email:string, password:string) {
    // 既に登録済みのメールアドレスをチェック
    const [existing] = await pool.execute<User[]>('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length > 0) {
        throw new Error('既に登録されているメールアドレスです')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
    const params = [name, email, hashedPassword]
    await pool.execute(query, params)
}

export async function loginUser(email:string, password:string) {
    const [rows] = await pool.execute<User[]>('SELECT * FROM users WHERE email = ?', [email])
    const user = rows[0]
  
    if (!user) return { success: false, message: 'ユーザーが見つかりません' }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) return { success: false, message: 'パスワードが間違っています' }
  
    return { success: true, user }
}
