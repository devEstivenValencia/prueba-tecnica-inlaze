'use client'

import { AddToFavorites } from './add-to-favorites'
import { Bg } from './bg'
import { MovieImage } from './movie-image'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { fetchMoviesByName } from '@/features/movies/fetchers/fetch-movies-by-name'
import { cn } from '@/lib/utils'
import { Search, Star } from 'lucide-react'
import Link from 'next/link'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

export function SearchMovie() {
	const [open, setOpen] = useState(false)
	const { page, setPage, query, setQuery, resetSearchParams } = useSearchParamsPage()

	const [searchValue] = useDebounce(query, 300)
	const { data, isLoading } = useSWR('SEARCH_BY_ID_' + searchValue + '_PAGE_' + page, () =>
		fetchMoviesByName([
			['query', searchValue],
			['page', page.toString()]
		])
	)

	useEffect(() => console.log(data), [data])

	function handleSearch(e: React.ChangeEvent) {
		const target = e.target as HTMLInputElement
		setQuery(target.value)
		setPage(1)
	}

	function toggleDrawer() {
		setOpen(!open)
		resetSearchParams()
	}

	function redirectToMovie() {
		setOpen(false)
	}

	return (
		<Drawer open={open} onOpenChange={toggleDrawer}>
			<DrawerTrigger asChild>
				<Search className='ml-auto cursor-pointer' />
			</DrawerTrigger>
			<DrawerContent className={cn('h-dvh w-full border-none py-4')}>
				<DrawerHeader className='hidden'>
					<DrawerTitle></DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<Bg />
				<div className='mt-4 flex h-full flex-col gap-4 px-4 pb-12'>
					<Input
						placeholder='Buscar por nombre de pelicula'
						onChange={handleSearch}
						autoFocus
						className='rounded-full bg-white px-4 py-6 text-black placeholder:text-slate-700'
					/>
					{isLoading && Array.from({ length: 8 }).map((_, i) => <SearchSkeleton key={i} />)}
					{!isLoading && !data?.results?.length ? (
						<h1 className='m-auto'>No se encontraron resultados</h1>
					) : (
						<ul className='flex flex-col gap-4 overflow-y-auto'>
							{data?.results?.map(movie => (
								<li key={movie.id} className='relative pr-3'>
									<Link href={`/movie/${movie.id}`} onClick={redirectToMovie} className='flex flex-row gap-4'>
										<MovieImage path={movie.poster} width={64} height={64} alt={`Movie ${movie.title}`} />
										<div className='flex w-4/5 flex-col gap-1'>
											<p>{movie.title}</p>
											<div className='flex flex-row items-center gap-2'>
												<Star size={16} />
												<p>{movie.score}</p>
												<span>- {movie.scoreCount} votos</span>
											</div>
										</div>
									</Link>
									<AddToFavorites movieId={movie.id} className='absolute right-3 top-0' />
								</li>
							))}
							{data?.totalPages && <SearchPagination totalPages={data?.totalPages} />}
						</ul>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	)
}

function SearchSkeleton() {
	return (
		<div className='flex flex-row gap-4'>
			<Skeleton className='h-16 w-16 bg-slate-500/25' />
			<div className='flex w-full flex-col gap-2'>
				<Skeleton className='h-4 w-full bg-slate-500/25' />
				<Skeleton className='h-4 w-3/4 bg-slate-500/25' />
			</div>
		</div>
	)
}

function SearchPagination({ totalPages }: { totalPages: number }) {
	const { page, setPage } = useSearchParamsPage()

	function prevPage() {
		setPage(page - 1)
	}

	function nextPage() {
		setPage(page + 1)
	}

	return (
		<Pagination>
			<PaginationContent className='flex w-full flex-row items-center justify-between gap-1'>
				<PaginationItem>
					<PaginationPrevious href='' onClick={prevPage} aria-label='Go to previous page' />
				</PaginationItem>
				<span className='text-sm'>
					Pag {page} de {totalPages}
				</span>
				<PaginationItem>
					<PaginationNext href='' onClick={nextPage} aria-label='Go to next page' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

function useSearchParamsPage() {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	const [query, setQuery] = useQueryState('query', parseAsString.withDefault(''))

	function resetSearchParams() {
		setPage(1)
		setQuery('')
	}

	return {
		page,
		setPage,
		query,
		setQuery,
		resetSearchParams
	}
}
