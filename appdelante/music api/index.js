import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mediaserver from 'mediaserver'
import multer from 'multer'
import fs from 'node:fs'

const PORT = process.env.PORT || 3050
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const optionsMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'songs'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: optionsMulter })

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

app.post('/songs', upload.single('song'), (req, res) => {
  const fileSongs = path.join(__dirname, 'songs.json')
  const name = req.file.originalname
  fs.readFile(fileSongs, 'utf-8', (err, file) => {
    if (err) throw err

    const songs = JSON.parse(file)
    songs.push({ name })
    fs.writeFile(fileSongs, JSON.stringify(songs), (err) => {
      if (err) throw err

      res.sendFile('./index.html', { root: './' })
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server ${app.get('appname')} running on http://localhost:${PORT}`)
})
