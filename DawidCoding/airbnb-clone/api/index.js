import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import imageDownloader from 'image-downloader'
import { config } from 'dotenv'
import { UserModel } from './models/User.js'
import cookieParser from 'cookie-parser'
// packaging managment
import multer from 'multer'

import fs from 'fs'
import { PlaceModel } from './models/Place.js'
config()

const bcryptSalt = bcrypt.genSaltSync(10) // exriptado de password
const jwtSecret = 'asdfghjklqwertyuiopzxcvbnm' // secret token
const PORT = process.env.PORT ?? 4000
const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'https://localhost:4000',
  'https://127.0.0.1:5173'
]

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

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

app.use('/uploads', express.static(process.cwd() + '/uploads'))

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
            res.cookie('token', token).json(userDoc)
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

// get info profile
app.get('/profile', (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await UserModel.findById(userData.id)
      res.json({ name, email, _id })
    })
  } else {
    res.json(null)
  }
})

// close session
app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body

  const newName = 'photo' + Date.now() + '.jpg'
  const directory = process.cwd() + '/uploads/' + newName
  await imageDownloader.image({ url: link, dest: directory })
  res.json(newName)
})
// get photo img
app.post('/upload-by-link/:photo', async (req, res) => {
  res.sendFile({})
})

// create phot form file

const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = []
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads/', ''))
  }
  res.json(uploadedFiles)
  console.log(uploadedFiles)
})

// save datas form places
app.post('/places', async (req, res) => {
  const { token } = req.cookies
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests
  } = req.body
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err
    const placeDoc = await PlaceModel.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
    })

    res.json(placeDoc)
  })
})

// get all places from user
app.get('/places', async (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err

    const { id } = userData
    res.json(await PlaceModel.find({ owner: id }))
  })
})

// get places by id
app.get('/places/:id', async (req, res) => {
  const { id } = req.params
  res.json(await PlaceModel.findById(id))
})

// update places
app.put('/places', async (req, res) => {
  const { token } = req.cookies
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests
  } = req.body

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err
    const placeDoc = await PlaceModel.findById(id)
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests
      })
      await placeDoc.save()
      res.json('ok')
    }
  })
})

app.get('/test', async (req, res) => {
  res.json({ response: 'ok' })
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
