import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Header = () => {
  return (
    <>
      <div className='header-primary'>
        <h3 className='header-title-primary'>
          <Link className='header-title-primary' to="/">Sharenergy</Link>
        </h3>
      </div>
    </>
  )
}

export default Header