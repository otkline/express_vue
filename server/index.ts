import express from 'express'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})