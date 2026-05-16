import axios from 'axios'

const api = axios.create({
  baseURL: 'https://restful-blogging-app-backend.vercel.app/api'
})

export default api