import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAuth = () => {
    return localStorage.getItem('token') ? true : false
  }

  return isAuth() ? children : <Navigate to='/'/>
}

export default PrivateRoute