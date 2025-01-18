'use server'

import { BaseSearchParams } from '@/common/utils/generate-search-params'
import { generateUri } from '@/common/utils/generate-uri'
import { api } from '@/config/http/api.http'
import { getApiRoute } from '@/config/routes/api.routes'

interface ServerResponse {
	page: number
	results: Array<{
		adult: boolean
		backdrop_path?: string
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

interface Response {
	page: number
	results: Array<{
		id: number
		title: string
		poster: string
		score: string
		scoreCount: number
	}>
	totalPages: number
	totalResults: number
}

function mapperResponse(data: ServerResponse): Response {
	return {
		page: data.page,
		results: data.results.map(movie => ({
			id: movie.id,
			title: movie.title,
			poster: movie.poster_path,
			score: movie.vote_average.toFixed(2),
			scoreCount: movie.vote_count
		})),
		totalPages: data.total_pages,
		totalResults: data.total_results
	}
}

export async function fetchMoviesByName(params?: BaseSearchParams) {
	const url = getApiRoute('SEARCH_MOVIE')
	const uri = generateUri(url, params)
	return await api(uri).then(res => mapperResponse(res.data))
}
