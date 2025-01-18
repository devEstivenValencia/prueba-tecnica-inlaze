'use client'

import { fetchMovie } from '@/features/movies/fetchers/fetch-movie'
import { Movie } from '@/features/movies/movie'
import { useFavorites } from '@/hooks/use-favorites'
import { useEffect, useState } from 'react'

export function useFetchFavorites() {
	const [favorites, setFavorites] = useState<Movie[] | null>(null)
	const [loading, setLoading] = useState(false)
	const { getAll } = useFavorites()

	useEffect(() => {
		async function fetchFavorites() {
			setLoading(true)
			const favoriteIds: number[] = getAll()
			const favorites = await Promise.all(favoriteIds.map(fetchMovie))
				.then(movies => movies.filter((movie): movie is Movie => movie !== null))
				.finally(() => setLoading(false))

			setFavorites(favorites)
		}
		fetchFavorites()
	}, [])

	return {
		favorites,
		isLoading: loading
	}
}
