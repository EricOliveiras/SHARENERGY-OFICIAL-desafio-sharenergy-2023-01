import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HeaderDashboard from '../../components/HeaderDashboard'
import { clientContext } from '../../contexts/clientContext'
import ClientCard from '../../components/ClientCard'

import './style.css'

const ClientSearch = () => {
  const navigate = useNavigate()

  const [client, setClient] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const token = localStorage.getItem('token')

  const handleSearch = async () => {
    const result = await clientContext.readByParam(token, searchValue)
    setClient(result)
  }

  const handleClearSearch = () => {
    setClient([])
    setSearchValue('')
  }
  
  const removeclients = async (id, token) => {
    const resuult = await clientContext.delete(id, token)
    if (resuult.status === 200) {
      window.location.reload()
    }
  }

  const handleUpdateClick = (id, name, email, cpf, phone, address) => {
    localStorage.setItem('id', id)
    localStorage.setItem('name', name)
    localStorage.setItem('cpf', cpf)
    localStorage.setItem('email', email)
    localStorage.setItem('phone', phone)
    localStorage.setItem('address', address)

    navigate(`/client/update/${id}`)
  }

  return (
    <>
      <HeaderDashboard />
      <div className='container-search'>
        <input type="text"
          className='search'
          value={searchValue}
          placeholder={'Buscar cliente por Nome, Email ou CPF'}
          onChange={handleChange}
        />
        <button 
          className='button-search' 
          type="submit"
          onClick={handleSearch}
        >
          Buscar
        </button>
        <button 
          className='button-search' 
          type="submit"
          onClick={handleClearSearch}
        >
          Limpar
        </button>
      </div>
      <div className='container-search-client-card-box'>
          {
            client.map((client) => {
              const { id, name, email, cpf, phone, address } = client
              return (
                <ClientCard
                  key={id}
                  name={name}
                  cpf={cpf}
                  email={email}
                  phone={phone}
                  address={address}

                  onClickDelete={async() => removeclients(id, token)}
                  onClickUpdate={async () => handleUpdateClick(id, name, email, cpf, phone, address)}
                />
              )
            })
          }   
        </div>
    </>
  )
}

export default ClientSearch