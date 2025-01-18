import { Movie } from '../movie'
import { BaseSearchParams } from '@/common/utils/generate-search-params'
import { generateUri } from '@/common/utils/generate-uri'
import { api } from '@/config/http/api.http'
import { getApiRoute } from '@/config/routes/api.routes'
import { AxiosResponse } from 'axios'

interface PopularMoviesResponse {
	page: number
	results: Array<{
		adult: boolean
		backdrop_path: string
		genre_ids: number[]
		id: number
		original_language: string
		original_title: string
		overview: string
		popularity: number
		poster_path: string
		release_date: string
		title: string
		video: boolean
		vote_average: number
		vote_count: number
	}>
	total_pages: number
	total_results: number
}

interface ServiceResponse {
	page: number
	results: Omit<Movie, 'genres' | 'homepage' | 'country' | 'revenue' | 'budget' | 'trailers' | 'description'>[]
	totalPages: number
	totalResults: number
}

function dataMapper(res: AxiosResponse<PopularMoviesResponse>): ServiceResponse {
	const results = res.data.results.map(movie => ({
		id: movie.id,
		title: movie.title,
		poster: movie.poster_path,
		backdrop: movie.backdrop_path,
		overview: movie.overview,
		releaseDate: movie.release_date,
		score: movie.vote_average.toFixed(2),
		scoreCount: movie.vote_count
	}))

	return {
		page: res.data.page,
		results,
		totalPages: res.data.total_pages,
		totalResults: res.data.total_results
	}
}

export async function fetchPopularMovies(searchParams?: BaseSearchParams) {
	const uri = generateUri(getApiRoute('POPULAR_MOVIES'), searchParams)

	try {
		const data = await api<PopularMoviesResponse>(uri).then(dataMapper)
		return data
	} catch (error) {
		console.error('Error fetching popular movies', error)
	}
}
