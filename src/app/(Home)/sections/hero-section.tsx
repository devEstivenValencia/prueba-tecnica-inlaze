import { genImageUrl } from '@/common/utils/generate-image-url'
import { fetchTrailers } from '@/features/movies/fetchers/fetch-trailer-info'
import { Movie, Trailer } from '@/features/movies/movie'
import { cn } from '@/lib/utils'
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
		<section
			id='hero'
			className='flex h-fit w-full flex-col items-center gap-6 md:h-[60vh] md:flex-row md:justify-center md:gap-12'
		>
			<div className='flex flex-col gap-4'>
				<h1 className='bg-gradient-to-r from-[rgba(255,0,182,.4)] to-white bg-clip-text text-center font-heading text-3xl font-bold text-transparent md:text-left md:text-5xl'>
					Encuentra peliculas y mucho mas
				</h1>
				<p className='font-medium'>
					Cansado de no encontrar la pelicula perfecta. No busques mas, encuentra todo aqui.
				</p>
				<MainTrailer trailer={trailer} className='mt-4 hidden w-fit md:flex' />
			</div>
			<div className='w-full md:h-full'>
				<div className='relative h-80 w-full md:h-full'>
					<Image
						src={genImageUrl(firstMovie.poster)}
						width={256}
						height={256}
						alt={`Popular movie ${firstMovie.title}`}
						className='absolute right-0 top-0 h-[90%] object-contain object-right md:w-auto md:object-cover'
					/>
					<Image
						src={genImageUrl(secondMovie.poster)}
						width={256}
						height={256}
						alt={`Popular movie ${secondMovie.title}`}
						className='absolute bottom-0 left-0 h-[80%] object-contain object-left md:w-auto md:object-cover'
					/>
				</div>
				<MainTrailer trailer={trailer} className='mt-6 md:hidden' />
			</div>
		</section>
	)
}

function MainTrailer({ trailer, className }: { trailer: Trailer; className?: string }) {
	return trailer?.url ? (
		<Link
			href={trailer.url}
			target='_blank'
			className={cn(
				'flex flex-row items-center gap-2 border px-6 py-3 text-xl transition-colors hover:bg-slate-900 hover:text-white',
				className
			)}
		>
			<CirclePlay size={24} />
			<span>Ver trailer</span>
		</Link>
	) : null
}
