import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  if (credentials.token) {

  }
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }