'use client'

import { useFetchFavorites } from './use-fetch-favorites'
import { MovieImage } from '@/components/movie-image'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export function FavoritesGrid() {
	const { favorites } = useFetchFavorites()

	return (
		<ul className='grid grid-cols-2 gap-4'>
			{favorites?.map(movie => (
				<li key={movie.id} className='relative'>
					<Link href={`/movie/${movie.id}`} className='group flex flex-col gap-2'>
						<Suspense fallback={<div>Loading...</div>}>
							<MovieImage path={movie.poster} alt={`Movie ${movie.title}`} width={256} height={256} />
						</Suspense>
						<p>{movie.title}</p>
						<div className='flex flex-wrap items-center gap-2'>
							<Star size={16} />
							<p>{movie.score}</p>
							<span>- {movie.scoreCount} votos</span>
						</div>
					</Link>
				</li>
			))}
		</ul>
	)
}
