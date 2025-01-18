import { genImageUrl } from '@/common/utils/generate-image-url'
import { fetchTrailers } from '@/features/movies/fetchers/fetch-trailer-info'
import { Movie } from '@/features/movies/movie'
import { CirclePlay } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
	firstMovie: Movie
	secondMovie: Movie
}

export async function HomeHeroSection({ firstMovie, secondMovie }: HeroSectionProps) {
	const trailers = await fetchTrailers(firstMovie.id)
	const trailer = trailers[0]

	return (
		<section id='hero' className='flex h-fit flex-col items-center gap-6'>
			<h1 className='bg-gradient-to-r from-[rgba(255,0,182,.4)] to-white bg-clip-text text-center font-heading text-3xl font-bold text-transparent'>
				Encuentra peliculas y mucho mas
			</h1>
			<p className='font-medium'>Cansado de no encontrar la pelicula perfecta. No busques mas, encuentra todo aqui.</p>
			<div className='relative h-80 w-full'>
				<Image
					src={genImageUrl(firstMovie.poster)}
					width={256}
					height={256}
					alt={`Popular movie ${firstMovie.title}`}
					className='absolute right-0 top-0 h-[90%] object-contain object-right'
				/>
				<Image
					src={genImageUrl(secondMovie.poster)}
					width={256}
					height={256}
					alt={`Popular movie ${secondMovie.title}`}
					className='absolute bottom-0 left-0 h-[80%] object-contain object-left'
				/>
			</div>
			{trailer?.url && (
				<Link
					href={trailer.url}
					target='_blank'
					className='flex flex-row items-center gap-2 border px-6 py-3 text-xl transition-colors hover:bg-slate-900 hover:text-white'
				>
					<CirclePlay size={24} />
					<span>Ver trailer</span>
				</Link>
			)}
		</section>
	)
}
