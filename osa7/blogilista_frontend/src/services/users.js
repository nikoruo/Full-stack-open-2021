import axios from 'axios'

const baseUrl = '/api/users'

//kaikki k�ytt�j�t
const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('response', response)
  return response.data
}

export default { getAll }