import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const register = async credentials => {
  const response = await axios.post(baseUrl, credentials)

  return response.data
}

export default { getAll, register }