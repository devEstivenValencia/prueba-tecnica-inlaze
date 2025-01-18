import { api } from '@/config/http/api.http'
import { getApiRoute } from '@/config/routes/api.routes'

interface ServerResponse {
	id: number
	results: ServerResponseResults[]
}

interface ServerResponseResults {
	iso_639_1: string
	iso_3166_1: string
	name: string
	key: string
	site: string
	size: number
	type: string
	official: boolean
	published_at: string
	id: string
}

export interface Trailer {
	id: string
	key: string
	name: string
	site: string
	size: number
	type: string
	url: string | null
}

function mapperData(data: ServerResponseResults[]): Trailer[] {
	return data.map(trailer => ({
		id: trailer.id,
		key: trailer.key,
		name: trailer.name,
		site: trailer.site,
		size: trailer.size,
		type: trailer.type,
		url: trailer.site === 'YouTube' ? `https://www.youtube.com/watch?v=${trailer.key}` : null
	}))
}

export async function fetchTrailers(movieId: number) {
	return await api<ServerResponse>(getApiRoute('MOVIE') + `/${movieId}` + '/videos').then(res =>
		mapperData(res.data.results)
	)
}
