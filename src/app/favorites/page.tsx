'use client'

import { useFetchFavorites } from './assets/use-fetch-favorites'
import { MovieImage } from '@/components/movie-image'
import { Skeleton } from '@/components/ui/skeleton'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function FavoritesPage() {
	const { favorites, isLoading } = useFetchFavorites()
	return (
		<main className='flex flex-col gap-4'>
			{isLoading ? (
				<Grid>
					{Array.from({ length: 12 }).map((_, i) => (
						<li key={i}>
							<Skeleton className='h-64 w-full bg-slate-500/25' />
						</li>
					))}
				</Grid>
			) : (
				<>
					<div className='grid grid-cols-[auto,1fr,auto] items-center gap-4'>
						<h1>Mis favoritos</h1>
						<div className='ml-4 h-1 w-auto bg-white' />
						<span>{favorites?.length} totales</span>
					</div>
					<Grid>
						{favorites?.map(movie => (
							<li key={movie.id} className='relative'>
								<Link href={`/movie/${movie.id}`} className='group flex flex-col gap-2'>
									<MovieImage path={movie.poster} alt={`Movie ${movie.title}`} width={256} height={256} />
									<p>{movie.title}</p>
									<div className='flex flex-wrap items-center gap-2'>
										<Star size={16} />
										<p>{movie.score}</p>
										<span>- {movie.scoreCount} votos</span>
									</div>
								</Link>
							</li>
						))}
					</Grid>
				</>
			)}
		</main>
	)
}

function Grid({ children }: { children: React.ReactNode }) {
	return <ul className='grid grid-cols-2 gap-4'>{children}</ul>
}
