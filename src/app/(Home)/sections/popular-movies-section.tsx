import { genURLSearchParams } from '@/common/utils/generate-search-params'
import { AddToFavorites } from '@/components/add-to-favorites'
import { MovieImage } from '@/components/movie-image'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { fetchPopularMovies } from '@/features/movies/fetchers/fetch-popular-movies'
import { FlameIcon, Star } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
	page: number
	totalPages: number
}

export async function PopularMoviesSection({ page, totalPages }: PaginationProps) {
	const res = await fetchPopularMovies([['page', page]])

	if (!res) {
		return <h1>Error al cargar la seccion de peliculas populares</h1>
	}

	const { results } = res

	return (
		<section id='popular-movies' className='flex w-full flex-col gap-8'>
			<div className='grid grid-cols-[auto,auto,1fr] items-center gap-1'>
				<FlameIcon />
				<h2 className='w-full font-heading text-2xl font-semibold'>Popular movies</h2>
				<div className='ml-4 h-1 w-auto bg-white' />
			</div>
			<ul className='grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{results.map(movie => (
					<li key={movie.id} className='relative'>
						<AddToFavorites movieId={movie.id} className='absolute right-2 top-2 z-50' />
						<Link href={`/movie/${movie.id}`} className='group flex flex-col gap-2'>
							<MovieImage path={movie.poster} width={256} height={256} alt={`Popular movie ${movie.title}`} />
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
			<PopularMoviesPagination page={page} totalPages={totalPages} />
		</section>
	)
}

function PopularMoviesPagination({ page, totalPages }: PaginationProps) {
	return (
		<Pagination>
			<PaginationContent className='flex w-full items-center justify-between'>
				{page > 1 && (
					<PaginationItem>
						<PaginationPrevious href={`?${genURLSearchParams([['page', +page - 1]])}`} scroll={false} />
					</PaginationItem>
				)}
				<span className='text-sm'>
					Pag {page} de {totalPages}
				</span>
				{page < totalPages && (
					<PaginationItem>
						<PaginationNext href={`?${genURLSearchParams([['page', +page + 1]])}`} scroll={false} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	)
}
