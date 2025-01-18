export interface Movie {
	id: number
	title: string
	description: string
	releaseDate: string
	genres: string[]
	homepage: string
	score: string
	scoreCount: number
	poster: string
	country: string
	revenue: number
	budget: number
	trailers: Array<Trailer> | null
}

export interface Trailer {
	name: string
	url: string | null
	key: string
}
