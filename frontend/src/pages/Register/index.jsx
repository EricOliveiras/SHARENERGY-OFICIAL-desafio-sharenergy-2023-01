import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import { contextUser } from '../../contexts/userContexts'
import { creeateUser } from '../../validators/userValidators'
import Header from '../../components/Header' 
import Footer from '../../components/Footer' 

import './style.css'    

const Register = () => {
  const { register, handleSubmit, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(creeateUser)
  })

  const onSubmit = async ({ username, email, password }) => {
    const result = await contextUser.create(username, email, password)
    if (result) reset()
  }

  return (
    <>
      <Header />
      <div className='register-container'>
        <h2 className="register-title">Cadastre-se</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <label className='label' htmlFor="username">Nome de usuário</label>
          <input className='input' type="text" name="username" {...register('username')}/>
          <p className='errors'>{errors.username?.message}</p>

          <label className='label' htmlFor="email">Email</label>
          <input className='input' type="text" name="email" {...register('email')}/>
          <p className='errors'>{errors.email?.message}</p>

          <label className='label' htmlFor="password">Senha</label>
          <input className='input' type="password" name="password" {...register('password')}/>
          <p className='errors'>{errors.password?.message}</p>

          <label className='label' htmlFor="passwordConfirmation">Confirme a senha</label>
          <input className='input' type="password" name="passwordConfirmation" {...register('passwordConfirmation')}/>
          <p className='errors'>{errors.passwordConfirmation?.message}</p>

          <button className='register-button' type="submit">Enviar</button> 
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default Register