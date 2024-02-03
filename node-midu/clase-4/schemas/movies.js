import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'movie title is required'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Fantasy',
      'Biography',
      'Drama',
      'Romance',
      'Sci-Fi',
      'Animation',
      'Crime'
    ])
  ),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'poster must be a valid URL'
  })
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
