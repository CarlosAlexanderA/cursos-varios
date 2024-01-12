const fs = require('node:fs')
const fsp = require('node:fs/promises') // <-- con promesas

const { readFile: readFileAll } = require('node:fs/promises')

const stats = fs.statSync('./archivo.txt')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log('texto asincrono: ', text)
})

console.log(stats.isFile())

// usando promesas
fsp.readFile('./archivo2.txt', 'utf-8').then((text) => {
  console.log(text)
})

console.log(stats.size)

Promise.all([
  readFileAll('./archivo.txt', 'utf-8'),
  readFileAll('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('Todas las promesas ', text)
  console.log('Todas las promesas ', secondText)
})
