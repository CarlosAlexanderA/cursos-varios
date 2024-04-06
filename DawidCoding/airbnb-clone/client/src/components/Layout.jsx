import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <main className="py-4 px-8 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  )
}
