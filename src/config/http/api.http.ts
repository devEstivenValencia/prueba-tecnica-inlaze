import { ENVS } from '../envs'
import axios from 'axios'

const api = axios.create({
	baseURL: ENVS.API_URL,
	headers: {
		Authorization: `Bearer ${ENVS.API_AUTH_TOKEN}`
	},
	params: {
		language: 'es'
	}
})

export { api }
