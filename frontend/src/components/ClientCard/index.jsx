import React from 'react'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

import './style.css'

const ClientCard = ({ id, name, email, cpf, phone, address, onClickDelete, onClickUpdate }) => {
  return (
    <>
      <div className="client-card-container" key={id}>
        <div>
          <h4 className="client-name">{name}</h4>
          <p className="client-info">Email: {email}</p>
          <p className="client-info">CPF: {cpf}</p>
          <p className="client-info">Telefone: {phone}</p>
          <p className="client-info">Endereço: {address}</p>
        </div>
        <div className="icons">
          <BsPencilSquare className='pencil'onClick={onClickUpdate}/>
          <BsTrash className='trash' onClick={onClickDelete}/>
        </div>
      </div>
    </>
  )
}

export default ClientCard