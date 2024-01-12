import net from 'node:net'

export function finAvaliablePort (desirePort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desirePort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') finAvaliablePort(0).then(port => resolve(port))
      else reject(err)
    })
  })
}
