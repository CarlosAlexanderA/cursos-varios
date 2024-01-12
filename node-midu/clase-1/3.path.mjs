import { basename, extname, join, sep } from 'node:path'

console.log(sep) // <-- barra sepradora de carpetas segun SO

// unir rutas con path join
const filePath = join('/content', 'subfolder', 'test.txt')
console.log(filePath)

// nombre base
const base = basename('/tmp/algo-secret-files/password.txt')
console.log(base)

// nombre base sin extencion
const fileName = basename('/tmp/algo-secret-files/password.txt', '.txt')
console.log(fileName)

// obtener extencion
const ext = extname('my.super.image.jpg')
console.log(ext)
