'use server'

import { Movie } from '../movie'
import { fetchTrailers } from './fetch-trailer-info'
import { api } from '@/config/http/api.http'
import { getApiRoute } from '@/config/routes/api.routes'

interface ServerResponse {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: unknown
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	origin_country: string[]
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface Genre {
	id: number
	name: string
}

export interface ProductionCompany {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

export interface ProductionCountry {
	iso_3166_1: string
	name: string
}

export interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

async function mapperData(data: ServerResponse): Promise<Movie> {
	const trailers = await fetchTrailers(data.id)
	const filteredTrailers = trailers.filter(trailer => trailer.site === 'YouTube')
	return {
		id: data.id,
		title: data.title,
		description: data.overview,
		releaseDate: data.release_date,
		genres: data.genres.map(genre => genre.name),
		homepage: data.homepage,
		score: data.vote_average.toFixed(2),
		scoreCount: data.vote_count,
		poster: data.poster_path,
		budget: data.budget,
		country: data.origin_country[0],
		revenue: data.revenue,
		trailers: filteredTrailers.map(trailer => ({
			name: trailer.name,
			url: trailer.url || '',
			key: trailer.key
		}))
	}
}

export async function fetchMovie(id: number) {
	const url = getApiRoute('MOVIE') + `/${id}`
	return await api<ServerResponse>(url).then(res => mapperData(res.data))
}
