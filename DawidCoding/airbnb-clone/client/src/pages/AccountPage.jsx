import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { PlacesPage } from './PlacesPage'
import AccountNav from '../components/AccountNav'

export function ProfilePage() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)
  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }
  if (!ready) {
    return 'loading...'
  }
  if (ready && !user && !redirect) {
    return <Navigate to="/login" />
  }

  const logout = async () => {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }
  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto mt-8">
          loggen in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  )
}

//! me quede en 2:19:11 / 6:58:57
