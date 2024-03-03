import express from 'express'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT ?? 3000
let products = [{
  id: 1,
  name: 'laptop',
  price: 3000
}]

app.use(morgan('dev'))
app.use(express.json())

app.get('/products', (req, res) => {
  res.json(products)
})

app.post('/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body }
  products.push(newProduct)
  res.send(newProduct)
})

app.put('/products/:id', (req, res) => {
  const data = req.body
  const productFound = products.find(product => product.id === parseInt(req.params.id))

  if (!productFound) {
    return res.status(404).json({ message: 'product not found' })
  }
  products = products.map(p => p.id === productFound.id ? { ...p, ...data } : p)
  res.json({ message: 'product actualizado' })
})

app.delete('/products/:id', (req, res) => {
  const productFound = products.find(product => product.id === parseInt(req.params.id))

  if (!productFound) {
    return res.status(404).json({ message: 'product not found' })
  }
  products = products.filter(p => p.id !== parseInt(productFound.id))
  res.sendStatus(204)
})

app.get('/products/:id', (req, res) => {
  console.log(req.params.id)
  const productFound = products.find(product => product.id === parseInt(req.params.id))

  if (!productFound) {
    return res.status(404).json({ message: 'product not found' })
  }
  res.json(productFound)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
