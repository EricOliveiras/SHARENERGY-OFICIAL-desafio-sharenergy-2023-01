import axios from 'axios'

const randomDog = axios.create({
  baseURL: 'https://random.dog'
});

export default randomDog