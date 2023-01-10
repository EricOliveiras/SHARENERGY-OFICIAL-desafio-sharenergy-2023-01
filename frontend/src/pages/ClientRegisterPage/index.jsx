import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import { clientContext } from '../../contexts/clientContext'
import { creeateClient } from '../../validators/clientValidators'

import './styles.css'
import { Link, useNavigate } from 'react-router-dom'

const ClientRegisterPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(creeateClient)
  })

  const onSubmit = async ({ name, email, cpf, phone, address }) => {
    const token = localStorage.getItem('token')
    const result = await clientContext.create(
      token, 
      name.toLowerCase(), 
      email.toLowerCase(), 
      cpf.toLowerCase(), 
      phone.toLowerCase(), 
      address.toLowerCase()
    )

    if (result.status === 201) {
      setTimeout(() => {
        navigate('/client')
      }, 3000)
    }
  }

  return (
    <>
      <div className='register-client-container'>
        <h2 className="register-client-title">Cadastre um novo cliente</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <label className='label' htmlFor="name">Nome</label>
          <input className='input' type="text" name="name" {...register('name')}/>
          <p className='errors'>{errors.name?.message}</p>

          <label className='label' htmlFor="cpf">cpf</label>
          <input className='input' type="text" name="cpf" {...register('cpf')}/>
          <p className='errors'>{errors.cpf?.message}</p>

          <label className='label' htmlFor="email">Email</label>
          <input className='input' type="text" name="email" {...register('email')}/>
          <p className='errors'>{errors.email?.message}</p>

          <label className='label' htmlFor="address">Endereço</label>
          <input className='input' type="text" name="address" {...register('address', { required: false })}/>
          <p className='errors'>{errors.address?.message}</p>

          <label className='label' htmlFor="phone">Telefone</label>
          <input className='input' type="text" name="phone" {...register('phone', { required: false })}/>
          <p className='errors'>{errors.phone?.message}</p>

          <button className='register-client-button' type="submit">Cadastrar</button>
          <Link className='register-client-p' to='/client'>VOLTAR</Link>
        </form>
    </div>
    <ToastContainer />
  </>
  )
}

export default ClientRegisterPage