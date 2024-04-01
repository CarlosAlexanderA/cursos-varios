import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registerUser = async e => {
    e.preventDefault()

    try {
      await axios.post('register', {
        name,
        email,
        password
      })
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      throw error // Manejo de errores opcional
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-medium text-center mb-4">Register</h1>
        <form action="#" className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Jon Doe"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            name=""
            id=""
          />
          <button className="primary">Register</button>
          <p className="text-center py-2 text-gray-500">
            Allready a member?
            <Link to="/login" className="pl-1 underline text-black">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
