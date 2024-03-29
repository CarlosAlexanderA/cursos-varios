import http from 'node:http';
import {finAvaliablePort} from './8.free-port.mjs';

console.log(process.env);
const server = http.createServer((req, res) => {
  console.log('request recieved');
  res.end('<h1>Hola mundo desde node</h1>');
});

// 0 <-- busca un puerto vacio o libre
// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })

finAvaliablePort(3000).then((port) => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`);
  });
});
