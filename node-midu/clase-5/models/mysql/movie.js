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
      // ?get all movies ids from database table la query a movie_genres join y devolver resultados...
      const [movies] = await connection.query('select bin_to_uuid(id) as id, title, year, director, duration, poster, rate from movies join movie_genres as mg on id = mg.movie_id WHERE mg.genre_id = ?;', [id])
      return movies
    }

    // * result devuelve una tupla "[]"
    // * -> [resultado de la tabla, esquema de la tabla]
    const [movies] = await connection.query('select bin_to_uuid(id) id, title, year, director, duration, poster, rate from movies;')
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query('select bin_to_uuid(id) id, title, year, director, duration, poster, rate from movies where id = uuid_to_bin(?);', [id])

    if (movie.length === 0) return null

    return movie[0]
  }

  static async create ({ input }) {
    const { title, year, director, duration, poster, rate } = input

    const [uuidResult] = await connection.query('select uuid() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query('INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (uuid_to_bin(?), ?, ?, ?, ?, ?, ?);', [uuid, title, year, director, duration, poster, rate])
    } catch (error) {
      // no permitir que el usuario lo vea, puede enviar info sensible
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query('select bin_to_uuid(id) id, title, year, director, duration, poster, rate from movies where id = uuid_to_bin(?);', [uuid])

    return movies[0]
  }

  static async delete ({ id }) {
    // ?crear el delete exercise
    try {
      await connection.query('delete from movies where bin_to_uuid(id) = ?', [id])
    } catch (error) {
      throw new Error('Error to deleting movie')
    }
  }

  static async update ({ id, input }) {
    // ?crear el update exercise
    try {
      const updateFields = []
      const queryParams = []

      Object.entries(input).forEach(([key, value]) => {
        if (value !== undefined) {
          updateFields.push(`${key} = ?`)
          queryParams.push(value)
        }
      })

      const updateQuery = `UPDATE movies SET ${updateFields.join(', ')} WHERE bin_to_uuid(id) = ?;`
      queryParams.push(id)

      await connection.query(updateQuery, queryParams)

      const movie = await this.getById({ id })
      return movie
    } catch (error) {
      throw new Error('Error ❌ to updating user')
    }
  }
}
