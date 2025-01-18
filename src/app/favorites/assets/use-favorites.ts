'use client'

import { favoritiesRepository } from '@/features/favorities/favorities.repository'
import { fetchMovie } from '@/features/movies/fetchers/fetch-movie'
import { Movie } from '@/features/movies/movie'
import { useEffect, useState } from 'react'

export function useFavorites() {
	const [favorites, setFavorites] = useState<Movie[] | null>(null)
	const [loading, setLoading] = useState(false)

	async function fetchFavorites() {
		setLoading(true)
		const favoriteIds = favoritiesRepository().getAll()
		const favorites = await Promise.all(favoriteIds.map(fetchMovie))
			.then(movies => movies.filter((movie): movie is Movie => movie !== null))
			.finally(() => setLoading(false))

		setFavorites(favorites)
	}

	useEffect(() => {
		fetchFavorites()
	}, [])

	return {
		favorites,
		isLoading: loading
	}
}
