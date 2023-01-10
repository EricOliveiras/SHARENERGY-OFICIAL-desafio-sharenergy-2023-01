import { notify } from '../notify';
import api from '../services/api';

export const contextUser = {
  async create(username, email, password) {
    try {
      const result = await api.post('/user', {
        username, 
        email, 
        password
      })
      
      notify(result.status, 'Usuário cadastrado com sucesso!')
      
      return result
    } catch (e) {
      notify(e.response.status, 'Nome de usuário ou email já cadastrado!')
    }
  },
  
  async login(username, password) {
    try {
      return await api.post('/user/login', {
        username, 
        password
      })

    } catch (e) {
      notify(e.response.status, 'Nome de usuário ou senha incorretos')
    }
  }
}