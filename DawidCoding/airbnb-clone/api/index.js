import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserModel } from './models/User.js'

config()

const bcryptSalt = bcrypt.genSaltSync(10) // exriptado de password
const jwtSecret = 'asdfghjklqwertyuiopzxcvbnm' // secret token

const app = express()
const PORT = process.env.PORT ?? 4000
app.use(express.json())
const ACCEPTED_ORIGINS = ['http://localhost:5173', 'https://localhost:4000']

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true)
      if (!origin) return callback(null, true)
      return callback(new Error('NOT allowed by CORS'))
    }
  })
)
app.use(cors())

app.disable('x-powered-by') // desabilitar el header X-Powered-By: Express
await mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json({ test: 'ok' })
})
app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: './' })
})

// create account
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc)
  } catch (error) {
    console.log(error)
    res.status(422).json(error)
  }
})
// login account
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const userDoc = await UserModel.findOne({
      email
    })
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password)
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err
            res.cookie('token', token).json('pass ok')
          }
        )
      } else {
        res.status(422).json('pass not ok')
      }
    } else {
      res.json('not found')
    }
  } catch (error) {
    console.log(error)
    res.status(422).json(error)
  }
})

app.get('/test', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
