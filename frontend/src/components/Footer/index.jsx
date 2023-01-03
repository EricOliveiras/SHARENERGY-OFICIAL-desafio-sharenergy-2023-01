import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <h3 className='footer-title'>
          <Link to='/'>Sharenergy</Link>
        </h3>
        <p className='footer-paragraph'>Desenvolvido por  <Link href='https://github.com/EricOliveiras'>Eric Oliveira</Link></p>
      </div>
    </>
  )
}

export default Footer