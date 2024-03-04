import { app } from '../index.js'

app.get('/Username', (req, res) => {
  res.send('username route')
})

app.get('/profile', (req, res) => {
  console.log(req.body)
  res.send('profile page')
})
