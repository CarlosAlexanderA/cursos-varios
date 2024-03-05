import { Router } from 'express'
const router = Router()

router.all('/about', (req, res) => {
  const title = 'creado desde las rutas'
  res.render('index', { title })
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

router.get('/posts', async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = await response.json()

  // console.log(json)

  res.render('posts', { posts: json })
})
export default router
