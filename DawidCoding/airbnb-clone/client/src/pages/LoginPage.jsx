import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { baseUrl } from '../constants.js'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const handleLoginSubmit = async e => {
    e.preventDefault()

    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials: 'include'
      })

      const json = await res.json()
      console.log('login succesful')
      setRedirect(true)
      return json
    } catch (error) {
      console.error('Error al Ingresar:', error)
      throw error
    }
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-medium text-center mb-4">Login</h1>
        <form
          action="#"
          className="max-w-md mx-auto"
          onSubmit={handleLoginSubmit}>
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
          />
          <button className="primary">Login</button>
          <p className="text-center py-2 text-gray-500">
            Don &apos;t have an acount yet?
            <Link to="/register" className="pl-1 underline text-black">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
