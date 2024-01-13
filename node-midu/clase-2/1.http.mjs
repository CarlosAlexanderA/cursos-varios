import http from 'node:http'
import fs from 'node:fs'
// --watch para recargar el servidor cada vez que se guarda el archivo
const desiredPort = process.env.PORT ?? 1234
const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8') // con charset utf-8

  if (req.url === '/') {
    // res.statusCode = 200 // OK
    res.end('Bienvenido a mi página de inico!')
  } else if (req.url === '/nodemon.png') {
    fs.readFile('./nodemon.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal Server Error')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contact') {
    // res.statusCode = 200 // !estatuscode = 200 <- es por defecto
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404 // not found
    res.end('<h1>Error 404 </h1>')
  }

  console.log('request recieved: ', req.url)
}
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
