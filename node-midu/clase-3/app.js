const express = require('express');
const movies = require('./movies.json');
const app = express();

app.disable('x-powered-by'); // desabilitar el header X-Powered-By: Express

app.get('/', (req, res) => {
  res.json({message: 'hola mundo'});
});

// todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const {genre} = req.query;

  if (genre) {
    const fileredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLocaleLowerCase())
    );

    return res.json(fileredMovies);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  // path ro regex
  const {id} = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({message: 'movie not found'});
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`);
});
