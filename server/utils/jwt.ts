import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret

export function generateToken(payload: object, expiresIn: '1h' | number = '1h') {
  const options: SignOptions = { expiresIn }
  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { id: number; name: string; email: string}
}
