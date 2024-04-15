import express from 'express';

const app = express();
const port = 3000; // Puerto que quieras utilizar

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
