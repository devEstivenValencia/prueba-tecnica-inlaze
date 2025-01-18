'use client'

import { SearchMovie } from './search-movie'
import { APP_ROUTES } from '@/config/routes/app.routes'
import Link from 'next/link'
import { Suspense } from 'react'

export function Header() {
	return (
		<header className='flex w-full flex-row items-center gap-4 py-6'>
			<Link href={APP_ROUTES.HOME}>Inicio</Link>
			<Link href={APP_ROUTES.FAVORITES}>Mis favoritos</Link>
			<Suspense fallback={null}>
				<SearchMovie />
			</Suspense>
		</header>
	)
}
