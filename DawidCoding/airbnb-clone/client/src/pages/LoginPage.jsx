import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-medium text-center mb-4">Login</h1>
        <form action="#" className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" name="" id="" />
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
