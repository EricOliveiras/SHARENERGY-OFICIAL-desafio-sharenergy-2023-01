import React, { useState } from 'react'

import HeaderDashboard from '../../components/HeaderDashboard'
import HttpCatImage from '../../components/HttpCatImage'

import './style.css'

const HttpCat = () => {
  const [inputValue, setInputValue] = useState('404')
  const [show, setShow] = useState('dontShow')
  const [src, setSrc] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  
  const handleShowImage = () => {
    setShow('show')
    setSrc(`https://http.cat/${inputValue}`)
  }

  return (
    <>
      <HeaderDashboard />
      <div className='container-cat'>
        <h4 className='cat-title'>HTTP Cat</h4>
        <p className='cat-paragraph'>Digite um HTTP Code</p>
        <input className='cat-input' type="text" onChange={handleInputChange}/>
        <HttpCatImage src={src} show={show}/>
        <button className='cat-button' onClick={handleShowImage}>Enviar</button>
      </div>
    </>
  )
}

export default HttpCat