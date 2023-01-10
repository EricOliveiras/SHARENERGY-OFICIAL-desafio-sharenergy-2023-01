import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'

import { contextUser } from '../../contexts/userContexts'
import { loginUser } from '../../validators/userValidators'

import Header from '../../components/Header'

import './style.css'    

const Login = () => {
  const navigate = useNavigate()

  const savedUsername = localStorage.getItem('username')
  const savedPassword = localStorage.getItem('password')
  const savedChecked = localStorage.getItem('checked')

  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if(savedChecked === true) {
      setValue({
        username: savedUsername,
        password: savedPassword
      })
      setChecked(true)
    }
  })

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(loginUser)
  })

  const handleChange = (event) => {
    setValue({ [event.target.name]: event.target.value })
  }

  const handleChecked = (event) => {
    setChecked(event.target.checked)
  }

  const onSubmit = async ({ username, password }) => {
    const response = await contextUser.login(username, password)

    if (!response) return

    const token = response.data.token

    if (response.status === 200 && token) {
      localStorage.setItem('token', token)

      if (checked === true) {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        localStorage.setItem('checked', true)
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.setItem('checked', false)
      }

      navigate('/dashboard')
    }
  }

  return (
    <>
      <Header />
      <div className='login-container'>
        <h2 className="login-title">Entrar</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <label className='label' htmlFor="username">username</label>
          <input className='input' type="text" name="username" value={value.username} {...register('username', { onChange: handleChange } )}/>
          <p className='errors'>{errors.username?.message}</p>

          <label className='label' htmlFor="password">Senha</label>
          <input className='input' type="password" name="password" value={value.password} {...register('password', { onChange: handleChange } )}/>
          <p className='errors'>{errors.password?.message}</p>
          
          <div className='container-check'>
            <input className='check' type="checkbox" name="rememberMe" checked={checked} onChange={handleChecked}/>
            <label className='remember' htmlFor="rememberMe">Lembrar-me</label>
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