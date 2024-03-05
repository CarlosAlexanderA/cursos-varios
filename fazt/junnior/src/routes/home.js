import { Router } from 'express'
const router = Router()

router.all('/about', (req, res) => {
  const title = 'creado desde las rutas'
  res.render('index', { title })
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

export default router
