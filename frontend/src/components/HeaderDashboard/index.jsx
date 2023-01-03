import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const HeaderDashboard = () => {

  const logout = () => localStorage.removeItem('token')

  return (
    <>
      <div className='header'>
        <h3>
          <Link className='header-title' to="/dashboard">Sharenergy</Link>
        </h3>
        <nav className='header-nav'>
          <ul className='header-list'>
            <Link className='header-item-list' to='/dashboard'>RANDOM USER</Link>
            <p>|</p>
            <Link className='header-item-list' to='/http-cat'>HTTP CAT</Link>
            <p>|</p>
            <Link className='header-item-list' to='/random-dog'>RANDOM DOG</Link>
            <p>|</p>
            <Link className='header-item-list' to='/register-client'>REGISTRAR CLIENTE</Link>
            <p>|</p>
            <Link className='header-item-list' to='/' onClick={logout}>LOGOUT</Link>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default HeaderDashboard