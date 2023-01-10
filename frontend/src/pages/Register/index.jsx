import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'

import { contextUser } from '../../contexts/userContexts'
import { creeateUser } from '../../validators/userValidators'
import Header from '../../components/Header'


import './style.css'    

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(creeateUser)
  })

  const onSubmit = async ({ username, email, password }) => {
    const result = await contextUser.create(
      username.toLowerCase(), 
      email.toLowerCase(), 
      password.toLowerCase()
    )

    if (result.status === 201)  {
      reset()
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
    
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

          <p>Já tem conta? <Link className='login-link' to={'/'}>Entrar</Link></p>

          <button className='register-button' type="submit">Cadastrar</button> 
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register