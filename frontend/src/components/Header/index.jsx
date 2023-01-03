import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Header = () => {
  return (
    <>
      <div className='header'>
        <h3>
          <Link className='header-title' to="/">Sharenergy</Link>
        </h3>
        <nav className='header-nav'>
          <ul className='header-list'>
            <Link className='header-item-list' to='/'>Login</Link>
            <p>|</p>
            <Link className='header-item-list' to='/register'>Cadastro</Link>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header