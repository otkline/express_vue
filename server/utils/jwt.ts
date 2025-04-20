import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const SECRET_KEY = JWT_SECRET as jwt.Secret

export function generateToken(payload: object, expiresIn: '1h' | number = '1h') {
  const options: SignOptions = { expiresIn }
  return jwt.sign(payload, SECRET_KEY, options)
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY) as { id: number; name: string; email: string}
}
