import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import { clientContext } from '../../contexts/clientContext'
import { updateClient } from '../../validators/clientValidators'

import './style.css'

const newHandle = (event) => {
  console.log(event)
}

const ClientUpdatePage = () => {
  const navigate = useNavigate()

  const getName = localStorage.getItem('name')
  const getCpf = localStorage.getItem('cpf')
  const getEmail = localStorage.getItem('email')
  const getPhone = localStorage.getItem('phone')
  const getAddress = localStorage.getItem('address')
  const getId = localStorage.getItem('id')
  const token = localStorage.getItem('token')

  const [value, setValue] = useState({
    name: getName,
    cpf: getCpf,
    email: getEmail,
    phone: getPhone,
    address: getAddress
  })

  const customChange = (event) => {
    setValue({ [event.target.name]: event.target.value })
  }

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(updateClient)
  })

  const onSubmit = async ({ name, email, cpf, phone, address }) => {
    const result = await clientContext.update(getId, token, name, email, cpf, phone, address)

    if (result.status === 200) {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('cpf')
      localStorage.removeItem('email')
      localStorage.removeItem('phone')
      localStorage.removeItem('address')

      setTimeout(() => {
        navigate('/client')
      }, 3000)
    }
  }

  return (
    <>
      <div className='update-client-container'>
        <h2 className="update-client-title">Atualizar cliente</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <label className='label' htmlFor="name">Nome</label>
          <input type={'text'} className='input' value={value.name} {...register('name', { onChange: customChange })} />
          <p className='errors'>{errors.name?.message}</p>
         
          <label className='label' htmlFor="email">Email</label>
          <input className='input' type="text" name="email" value={value.email} {...register('email', { onChange: customChange })}/>
          <p className='errors'>{errors.email?.message}</p>

          <label className='label' htmlFor="cpf">cpf</label>
          <input className='input' type="text" name="cpf" value={value.cpf} {...register('cpf', { onChange: customChange })}/>
          <p className='errors'>{errors.cpf?.message}</p>

          <label className='label' htmlFor="phone">Telefone</label>
          <input className='input' type="text" name="phone" value={value.phone} {...register('phone', { onChange: customChange })}/>

          <label className='label' htmlFor="address">Endereço</label>
          <input className='input' type="text" name="address" value={value.address} {...register('address', { onChange: customChange })}/>

          <button className='update-client-button' type="submit">Atualizar</button>
          <Link className='update-client-p' to='/client'>VOLTAR</Link>
        </form>
    </div>
    <ToastContainer />
  </>
  )
}

export default ClientUpdatePage