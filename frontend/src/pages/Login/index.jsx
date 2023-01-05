import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { contextUser } from '../../contexts/userContexts'
import { loginUser } from '../../validators/userValidators'

import Header from '../../components/Header'

import './style.css'    

const Login = () => {
  const [isChecked, setIsChecked] = useState(true)
  const navigate = useNavigate()

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(loginUser)
  })

  const handleChange = (e) => {
    setIsChecked(e.target.checked)
    if (e.target.checked) return true
  }

  const handleSave = (username, password) => {
    if (isChecked) {
      Cookies.set('username', username)
      Cookies.set('password', password)
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
    }
  }

  const onSubmit = async ({ username, password }) => {
    const response = await contextUser.login(username, password)
    const token = response.data.id

    try {
      if (response.status === 200 && token) {
        Cookies.set('token', token, { expires: 1 })
        handleSave(username, password)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
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
            <input className='check' type="checkbox" name="remember" checked={isChecked} onChange={handleChange}/>
            <label className='remember' htmlFor="remember">Lembrar-me</label>
          </div>
          <p>Não tem conta? <Link className='register-link' to={'/register'}>Registre-se</Link> </p>
          <button className='login-button' type="submit">Entrar</button>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login