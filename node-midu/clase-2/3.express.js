// npm install express -E // ? <- es una dependencia de produccion
const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const app = express()
app.disable('x-powered-by') // <- desactivar el head de powered Express
const PORT = process.env.PORT ?? 1234

// middelware con express
app.use(express.json())

// middelware manual
// app.use((req, res, next) => {
//   console.log('mi primer middelware')
//   // trackear la request a labase de datos
//   // revisar si el usuario tiene cookies
//   if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timeStamp = Date.now()
//     // mutar la request y meter la infomracion en el req.body <-
//     req.body = data
//     next() // ! <- indicar que despues de hacer lo necesario continuar con las URL
//   })
// })

app.get('/', (req, res) => {
  // !status 200 es por defecto
  // res.status(200).send('<h1>Mi página</h1>')
  res.send('<h1>Mi página</h1>')
})
app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})
app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// el error 404 siempre va al final para no perjudicar nuestras rutas anteriores
// el use engloba todo (GET, POST, PATCH...ETC)
app.use((req, res) => {
  console.log('error page')
  res.status(404).send('<h1>404</h1>')
})

// app.all('*',(req, res)=>{
//   res.sendStatus(404).send('<h1>404</h1>')

// })

app.listen(PORT, () => {
  console.log('server listening on port http://localhost:1234')
})
