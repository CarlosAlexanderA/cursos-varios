import express from 'express'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import HomeRoutes from './routes/home.js'
import UserRoutes from './routes/users.js'

const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const app = express()

// middelware -> se puede tener varios
// app.use((req, res, next) => {
//   console.log(`Route: ${req.url} Method: ${req.method}`)

//   next()
// })

// settings
app.set('appName', 'Express Simple')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// para entender el texto del lado del cliente -> servidor
app.use(express.text())

// usando morgan
app.use(morgan('dev'))

app.use(express.json())
// Configuración del directorio estático

app.use(express.static(path.join(__dirname, 'public')))// -> se hace publico y puees acceder desde el mismo navegador
// .../index.css, etc

app.use(HomeRoutes)
app.use(UserRoutes)

// funciona con todos los metodos
// GET, POST, PUT, ...0
app.all('/info', (req, res) => {
  res.send('server info')
})

app.get('/', (req, res) => {
  res.sendFile('./static/index.html', {
    root: './'
  })
})

app.get('/products', (req, res) => {
  res.send('products')
})
// parametros en la url
app.get('/hello/:user', (req, res) => {
  console.log(req.params)
  res.send(`Hello ${'asd'}`)
})

app.get('/add/:x/:Y', (req, res) => {
  const { x, y } = req.params
  res.send(`result: ${parseInt(x) + parent(y)}`)
})

app.get('/users/:username/:photo', (req, res) => {
  if (req.params.username === 'javascript') {
    return res.sendFile('./javascript.png', {
      root: './'
    })
  }
  res.send('el usuario no tiene acceso')
})

// queryes en la url -> http://...?x=ads
app.get('/search', (req, res) => {
  if (req.query.q === 'javascript') {
    res.send('lista de libros de javascript')
  } else {
    res.send('page normal')
  }
})
app.get('/user', (req, res) => {
  res.json({
    name: 'none',
    lastname: 'jssol',
    age: 40,
    points: [1, 2, 3],
    address: {
      city: 'new york',
      street: 'some street 123'
    }
  })
})

app.post('/user', (req, res) => {
  console.log(req.body)
  res.send('Nuevo usuario creado')
})

// autentificacion
// app.use((req, res, next) => {
//   if (req.query.login === 'carlos@algo.com') {
//     next()
//   } else {
//     res.send('no autorizado')
//   }
// })

app.use((req, res) => {
  res.status(404).send('pagina no encontrada')
})
app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`)
})
