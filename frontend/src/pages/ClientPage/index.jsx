import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'

import { clientContext } from '../../contexts/clientContext'
import HeaderDashboard from '../../components/HeaderDashboard'
import ClientCard from '../../components/ClientCard'

import './style.css'

const ClientPage = () => {
  const [clients, setclients] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

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

  const getClients = async () => {
    const response = await clientContext.readAll(token)
    setclients(response)
    setLoading(false)
  }
  
  useEffect(() => {
    getClients()
  }, [])
  
  return (
    <>
      <HeaderDashboard />
      <div className="container-client">
        <div className="nav-client">
          <h3 className="title-client">Clientes</h3>
          <Link className='add-client' to='/client-search'>Buscar cliente</Link>
          <Link className='add-client' to='/client-register'>Registrar novo cliente</Link>
        </div>
          <div className="container-client-card-box">
            {!loading ? (
              clients.map((client) => {
                const { id, name, email, cpf, phone, address } = client
                return (
                  <ClientCard 
                    key={id}
                    name={name}
                    cpf={cpf}
                    email={email}
                    phone={phone}
                    address={address}

                    onClickDelete={async () => removeclients(id, token)}
                    onClickUpdate={async () => handleUpdateClick(id, name, email, cpf, phone, address)}
                  />
                )
              })
            ): (
              <p>Loading...</p>
            )}
          </div>
      </div>
    </>
  )
}

export default ClientPage