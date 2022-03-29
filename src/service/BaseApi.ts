import axios from 'axios'

const api = axios.create({
  baseURL: 'https://opentdb.com',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default api
