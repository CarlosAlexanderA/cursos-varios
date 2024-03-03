import express from 'express'
import morgan from 'morgan'

const PORT = process.env.PORT || 3030
const app = express()

// middelware -> se puede tener varios
// app.use((req, res, next) => {
//   console.log(`Route: ${req.url} Method: ${req.method}`)

//   next()
// })

// usando morgan
app.use(morgan('dev'))

// para entender el texto del lado del cliente -> servidor
app.use(express.text())

app.use(express.json())

// funciona con todos los metodos
// GET, POST, PUT, ...
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

app.use((req, res, next) => {
  if (req.query.login === 'carlos@algo.com') {
    next()
  } else {
    res.send('no autorizado')
  }
})

app.get('/dashboard', (req, res) => {
  res.send('dashboard')
})

app.use((req, res) => {
  res.status(404).send('pagina no encontrada')
})
app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`)
})
