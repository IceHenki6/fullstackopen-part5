import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
  // const request = axios.get(baseUrl)
  // return request.then(response => response.data)
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newObj) => {
	const config = {
		headers: {Authorization: token}
	}

	const response = await axios.post(baseUrl, newObj, config)
	return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }