import { readdir, stat } from 'fs/promises'
import path from 'path'
import pc from 'picocolors'
const folder = process.argv[2] ?? '.' // por defecto es '.'

async function ls (folder) {
  let files
  try {
    files = await readdir(folder)
  } catch {
    console.error(pc.red(`Error al leer el directorio ${folder}`))
    process.exit(1) // saliendo con errores
  }
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await stat(filePath) // ? stat - informacion del archivo
    } catch (error) {
      console.error(`No se puedo ller el archivo ${filePath}`)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(
      fileSize.toString().padStart(10)
    )} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)
  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
