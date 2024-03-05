import { Router } from 'express'
const router = Router()

router.get('/Username', (req, res) => {
  res.send('username route')
})

router.get('/profile', (req, res) => {
  console.log(req.body)
  res.send('profile page')
})

export default router
