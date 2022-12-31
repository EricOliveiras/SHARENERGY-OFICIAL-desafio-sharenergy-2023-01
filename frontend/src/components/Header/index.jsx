import React from 'react'
import './style.css'

const Header = () => {
  return (
    <>
      <div className='header'>
        <h3 className='header-title'>
          <a href="/">Sharenergy</a>
        </h3>
        <nav className='header-nav'>
          <ul className='header-list'>
            <li className='header-item-list'><a className='nav-link' href="/login">Login</a></li>
            <p>|</p>
            <li className='header-item-list'><a className='nav-link' href="/register">Cadastro</a></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header