import React, { useState } from 'react'

import HeaderDashboard from '../../components/HeaderDashboard'
import { randomDogContext } from '../../contexts/randomDogContext'

import './style.css'

const RandomDog = () => {
  const [src, setSrc] = useState('')
  const [loading, setLoading] = useState(true)
  
  const handleShowImage = async () => {
    setLoading(true)
    const response = await randomDogContext.getDog()
    setSrc(response.data.url)
    setLoading(false)
  }

  return (
    <>
      <HeaderDashboard />
      <div className='container-dog'>
        <button className='dog-button' onClick={handleShowImage}>Clique Para mostrar uma imagem</button>
        {!loading ? 
          (
           <img className='show-dog' src={src}/>
          )
        : (
          <p style={{ marginTop: '20px' }}>Loading...</p>
          )
        }
      </div>
    </>
  )
}

export default RandomDog