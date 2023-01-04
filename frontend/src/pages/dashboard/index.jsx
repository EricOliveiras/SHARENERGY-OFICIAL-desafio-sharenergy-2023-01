import React, { useEffect, useState } from 'react'

import HeaderDashboard from '../../components/HeaderDashboard'
import { randomUserContext } from '../../contexts/randomUserContext'

import './style.css'

const Dashboard = () => {
  const [post, setPost] = useState({
    users: [],
    isLoading: true,
    errors: null
  });

  useEffect(() => {
    randomUserContext.getUsers()
      .then((users) => {
        setPost({
          users,
          isLoading: false
        });
      })
      .catch((error) => setPost({ error, isLoading: false }));
  }, [])
  
  if (!post) return null;

  return (
    <>
      <div className='container-dashboard'>
        <HeaderDashboard /> 
        {!post.isLoading ? (
          post.users.map((user) => {
            const { username, name, email, image, age } = user;
            return (
              <div className='container-user'>
                <div key={username}>
                  <div>
                    <img src={image} alt={name} />
                  </div>
                  <p>Nome: {name}</p>
                  <p>Idade: {age}</p>
                  <p>Email: {email}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default Dashboard