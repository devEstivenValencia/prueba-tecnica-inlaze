import { BackLink } from './assets/back-link'
import { AddToFavorites } from '@/components/add-to-favorites'
import { MovieImage } from '@/components/movie-image'
import { TextDate } from '@/components/text-date'
import { Badge } from '@/components/ui/badge'
import { fetchMovie } from '@/features/movies/fetchers/fetch-movie'
import { YouTubeEmbed } from '@next/third-parties/google'
import { ArrowUpRight, Star } from 'lucide-react'
import Link from 'next/link'

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const data = await fetchMovie(+id)

	if (!data) {
		return <h1>Error al cargar la pagina</h1>
	}

	return (
		<main className='flex flex-col gap-6 py-4'>
			<BackLink />
			<h1 className='bg-gradient-to-r from-[rgba(255,0,182,.9)] to-white bg-clip-text text-center font-heading text-xl font-bold text-transparent'>
				{data.title}
			</h1>
			<div className='relative mx-auto'>
				<MovieImage path={data.poster} alt={`Detalles ${data.title}`} width={256} height={256} />
				<AddToFavorites movieId={+id} className='absolute right-4 top-4' />
			</div>
			<div className='grid w-full grid-cols-[auto,1fr,auto] items-center gap-4'>
				<TextDate date={data.releaseDate} format='YYYY' />
				<div className='h-1 w-full bg-white' />
				<div className='flex flex-wrap items-center gap-2'>
					<Star size={16} />
					<p>{data.score}</p>
					<p>|</p>
					<p>{data.scoreCount} votos</p>
				</div>
			</div>
			<p>{data.description}</p>
			{data.homepage && (
				<Link
					href={data.homepage}
					className='flex flex-row items-center gap-2 text-blue-500 transition-colors hover:text-blue-300'
				>
					<span>Ver ahora</span>
					<ArrowUpRight />
				</Link>
			)}
			<ul className='flex w-full flex-row flex-wrap gap-2'>
				{data.genres.map(genre => (
					<li key={genre}>
						<Badge variant='secondary' className='select-none text-sm'>
							{genre}
						</Badge>
					</li>
				))}
			</ul>
			<div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
				{data?.trailers?.map(trailer => <YouTubeEmbed videoid={trailer.key} key={trailer.key} />)}
			</div>
		</main>
	)
}
