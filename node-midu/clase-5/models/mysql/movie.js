import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  posrt: 3306,
  password: '123123',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      // get genre ids from database using genre names
      const [genres] = await connection.query('select id, name from genre where lower(name) = ?;', [lowerCaseGenre])
      if (genres.length === 0) return []
      console.log(genres)
      // get the id from the first genre
      const [{ id }] = genres
      console.log(id)
      // !get all movies ids from database table

      // !la query a movie_genres
      // !join
      // !y devolver resultados...
      const getMovieByGenre = `select bin_to_uuid(id) as id, title, year, director, duration, poster, rate from movie join movie_genres as mg on id = mg.movie_id
      WHERE mg.genre_id = ${2};`
      const [movies] = await connection.query(getMovieByGenre)

      return movies
    }

    // * result devuelve una tupla "[]"
    // * -> [resultado de la tabla, esquema de la tabla]
    const [movies] = await connection.query('select bin_to_uuid(id) id, title, year, director, duration, poster, rate from movie;')
    return movies
  }

  static async getById ({ id }) {

  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
