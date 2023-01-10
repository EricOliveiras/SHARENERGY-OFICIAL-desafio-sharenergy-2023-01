import { notify } from '../notify';
import api from '../services/api';

export const clientContext = {
  async create(token, name, email, cpf, phone, address) {
    try {
      const result = await api.post('/client', {
        name, 
        email, 
        cpf,
        phone,
        address
      }, { headers: {
        'authorization': `Bearer ${token}`,
      }})
      
      notify(result.status, 'Cliente cadastrado com sucesso!')
      
      return result
    } catch (e) {
      if (e.response.status !== 201) {
        notify(e.response.status, 'Parece que algo deu errado')
      }
    }
  },
  
  async readAll(token) {
    try {
      const result = await api.get('/client/read-all', {
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })

      const clients = result.data.map((client) => ({
        id: `${client.id}`,
        name: `${client.name}`,
        cpf: `${client.cpf}`,
        email: `${client.email}`,
        address: `${client.address}`,
        phone: `${client.phone}`
      }))

      return clients
    } catch (e) {
      notify(e.response.status, 'Parece que algo deu errado')
    }
  },
  
  async readByParam(token, param) {
    try {
      const result = await api.post('/client/read-by-param', { param }, {
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })

      const clients = result.data.map((client) => ({
        id: `${client.id}`,
        name: `${client.name}`,
        cpf: `${client.cpf}`,
        email: `${client.email}`,
        address: `${client.address}`,
        phone: `${client.phone}`
      }))

      return clients
    } catch (e) {
      notify(e.response.status, 'Parece que algo deu errado')
    }
  },
  
  async update(
    id,
    token,
    name, 
    email, 
    cpf,
    phone,
    address, 
  ) {
    try {
      const result = await api.put(`/client/update/${id}`, {
        name, 
        email, 
        cpf,
        phone,
        address
      }, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }
      )
 
      notify(result.status, 'Cliente atualizado com sucesso!')
      
      return result
    } catch (e) {
      notify(e.response.status, 'Parece que algo deu errado')
    }
  },
  
  async delete(id, token) {
    try {
      const result = await api.delete('/client/delete', {
        data: { id },
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })

      notify(result.status, 'Cliente deletado com sucesso!')

      return result
    } catch (e) {
      notify(e.response.status, 'Parece que algo deu errado')
    }
  }
}