const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()

app.use(express.json())

app.disable('x-powered-by') // desabilitar el header X-Powered-By: Express

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

// metodos normales: GET/HEAD/POST -> CORS PRE-Filght
// metodos complejps: PUT/PATCH/DELETE -> OPTIONS

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://movies.com'

]
// todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const origin = req.header('origin')

  // cuando la peticion es del mismo ORIGIN no se envia el origin
  // http://localhost:1234 -> http://localhost:1234
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) res.header('Access-Control-Allow-Origin', origin)

  const { genre } = req.query

  if (genre) {
    const fileredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLocaleLowerCase())
    )

    return res.json(fileredMovies)
  }
  res.json(movies)
})

app.post('/movies', (req, res) => {
  console.log('error: ', req.body)
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  // crypto crea ids unicas
  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  // esto no es REST, porque estamos guardando el estado de la aplicacion en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (!result.success) return res.status(404).json({ message: JSON.parse(result.error.message) })

  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'movie not found' })
  }

  const updateMovie = { ...movies[movieIndex], ...result.data }

  movies[movieIndex] = updateMovie

  res.status(202).json(updateMovie)
})

app.get('/movies/:id', (req, res) => {
  // path ro regex
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'movie not found' })
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
  res.send(200)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`)
})
