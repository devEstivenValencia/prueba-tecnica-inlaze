import { ENVS } from '../envs'

export const API_ROUTES = {
	POPULAR_MOVIES: '/movie/popular',
	MOVIE: '/movie',
	SEARCH_MOVIE: '/search/movie'
} as const

export function getApiRoute(route: keyof typeof API_ROUTES): string {
	if (!API_ROUTES[route]) {
		throw new Error(`Route ${route} not found in API_ROUTES`)
	}

	return ENVS.API_URL + API_ROUTES[route]
}
