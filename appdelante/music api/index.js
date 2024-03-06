import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mediaserver from 'mediaserver'

const PORT = process.env.PORT || 3050
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.set('appname', 'api music')

app.use(express.static(path.join(__dirname, 'public')))// -> se hace publico y puees acceder desde el mismo navegador

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: './' })
})

app.get('/songs', (req, res) => {
  res.sendFile('./songs.json', { root: './' })
})

app.get('/songs/:name', (req, res) => {
  const song = path.join(__dirname, 'songs', req.params.name)
  console.log(song)
  mediaserver.pipe(req, res, song)
})

app.listen(PORT, () => {
  console.log(`Server ${app.get('appname')} running on http://localhost:${PORT}`)
})
