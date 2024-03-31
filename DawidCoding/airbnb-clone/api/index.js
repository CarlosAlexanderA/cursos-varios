import express from 'express'

import cors from 'cors'

const PORT = process.env.PORT ?? 4000

const app = express()

app.use(express.json())
const ACCEPTED_ORIGINS = ['http://localhost:5173', 'https://localhost:4000']

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true)
    if (!origin) return callback(null, true)
    return callback(new Error('NOT allowed by CORS'))
  }
}))
app.use(cors())

app.disable('x-powered-by') // desabilitar el header X-Powered-By: Express

app.post('/', (req, res) => {
  console.log(req.body)
  res.json({ ...req })
})

app.get('/test', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
