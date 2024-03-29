import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <main className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  )
}
