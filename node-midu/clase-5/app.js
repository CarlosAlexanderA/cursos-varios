import express, { json } from 'express'

import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())

  app.disable('x-powered-by') // desabilitar el header X-Powered-By: Express

  app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' })
  })

  // metodos normales: GET/HEAD/POST -> CORS PRE-Filght
  // metodos complejps: PUT/PATCH/DELETE -> OPTIONS

  //* todos los recursos que sean MOVIES se identifican con /movies
  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server Listening on port http://localhost:${PORT}`)
  })
}
