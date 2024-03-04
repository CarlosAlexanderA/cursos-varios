import { app } from '../index.js'

app.all('/about', (req, res) => {
  res.send('about page')
})

app.get('/dashboard', (req, res) => {
  res.send('dashboard')
})
