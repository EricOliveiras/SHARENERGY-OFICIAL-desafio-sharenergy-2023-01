import axios from 'axios'

const randomUser = axios.create({
  baseURL: 'https://randomuser.me/api',
});

export default randomUser;