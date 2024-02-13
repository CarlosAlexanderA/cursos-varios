import express from 'express'
import logger from 'morgan'

import {Server} from 'socket.io'
import {createServer} from 'node:http'
import { createClient } from '@libsql/client/.'


const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery:{}
})

const db= createClient({
  url:"libsql://open-omega-red-carlosalexandera.turso.io",
  authToken: process.env.DB_TOKEN
})

await db.execute()

io.on('connection',(socket)=>{
  console.log('a user has connected');

  socket.on('disconnect', ()=>{
    console.log('an user has disconnected');
  })

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
})

app.use(logger('dev'))

app.get('/',(req, res)=>{
  // ? cwd -> donde se inicio el proceso
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port,()=>{
  console.log(`Server running http://localhost:${port}`);
})