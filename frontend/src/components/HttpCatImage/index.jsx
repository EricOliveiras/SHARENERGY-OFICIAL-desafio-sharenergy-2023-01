import React from 'react'

import './style.css'

const HttpCatImage = ({ src, show }) => {
  return (
    <img className={show} src={src}/>
  )
}

export default HttpCatImage;
