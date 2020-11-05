import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${newObject._id}`
  const response = await axios.put(url, newObject, config)
  return response.data
}

const comment = async (incomingComment, blogId) => {
  const url = `${baseUrl}/${blogId}/comments`
  const response = await axios.post(url, incomingComment)
  return response.data
}

const remove = async newObject => {
  const config = {
    headers: { Authorization: token},
  }
  console.log(newObject)
  const url = `${baseUrl}/${newObject._id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, put, remove, setToken, comment }