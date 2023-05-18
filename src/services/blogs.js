import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
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

const update = async (newObj, id) => {
	const config = {
		headers: {Authorization: token}
	}
	const url = `${baseUrl}/${id}`
	const response = await axios.put(url, newObj, config)

	return response.data
}

const remove = async (id) => {
	const config = {
		headers: {Authorization: token}
	}

	const url =`${baseUrl}/${id}`
	const response = await axios.delete(url, config)

	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove }