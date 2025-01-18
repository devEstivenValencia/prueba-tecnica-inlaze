import { loadHomeSearchParams } from './searchParams'
import { HomeHeroSection } from './sections/hero-section'
import { PopularMoviesSection } from './sections/popular-movies-section'
import { fetchPopularMovies } from '@/features/movies/fetchers/fetch-popular-movies'
import { Movie } from '@/features/movies/movie'
import type { SearchParams } from 'nuqs/server'

type PageProps = {
	searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: PageProps) {
	const res = await fetchPopularMovies()
	const { page } = await loadHomeSearchParams(searchParams)

	if (!res) {
		return <h1>Error al cargar la pagina</h1>
	}

	const { results, totalPages } = res
	const firstMovie = results[0]
	const secondMovie = results[1]

	return (
		<main className='flex flex-col items-center gap-6 pb-12 pt-6'>
			<HomeHeroSection firstMovie={firstMovie as Movie} secondMovie={secondMovie as Movie} />
			<PopularMoviesSection page={+page} totalPages={totalPages} />
		</main>
	)
}
