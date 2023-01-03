import React from 'react'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import { contextUser } from '../../contexts/userContexts'
import { loginUser } from '../../validators/userValidators'
import Header from '../../components/Header' 
import Footer from '../../components/Footer' 

import './style.css'    

const Login = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(loginUser)
  })

  
  const onSubmit = async ({ username, password }) => {
    const response = await contextUser.login(username, password)
    const token = response.data.id

    try {
      if (response.status === 200 && token) {
        navigate('/dashboard')
        localStorage.setItem('token', token)
      }
    } catch (error) {
      return
    }
  }

  return (
    <>
      <Header />
      <div className='login-container'>
        <h2 className="login-title">Entrar</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <label className='label' htmlFor="username">username</label>
          <input className='input' type="text" name="username" {...register('username')}/>
          <p className='errors'>{errors.username?.message}</p>

          <label className='label' htmlFor="password">Senha</label>
          <input className='input' type="password" name="password" {...register('password')}/>
          <p className='errors'>{errors.password?.message}</p>
          
          <div className='container-check'>
            <input className='check' type="checkbox" name="remember"/>
            <label className='remember' htmlFor="remember">Lembrar-me</label>
          </div>
          <button className='login-button' type="submit">Entrar</button>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Login