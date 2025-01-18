'use client'

import { favoritiesRepository } from '@/features/favorities/favorities.repository'
import clsx from 'clsx'
import { Heart } from 'lucide-react'
import { useMemo, useState } from 'react'

interface AddToFavoritesProps extends React.HTMLAttributes<HTMLButtonElement> {
	movieId: number
}

export function AddToFavorites({ movieId, className, ...props }: AddToFavoritesProps) {
	const memoizedIsFavorite = useMemo(() => favoritiesRepository().isFavorite(movieId), [movieId])
	const [isFavorite, setIsFavorite] = useState<boolean>(memoizedIsFavorite)

	function toggleFavorite() {
		if (isFavorite) {
			favoritiesRepository().remove(movieId)
			setIsFavorite(false)
		} else {
			favoritiesRepository().save(movieId)
			setIsFavorite(true)
		}
	}

	return (
		<button
			onClick={toggleFavorite}
			className={clsx('transform transition-transform hover:scale-105', className)}
			{...props}
		>
			<Heart
				color={isFavorite ? 'red' : undefined}
				fill={isFavorite ? 'red' : 'rgba(0, 0, 0, 0.5)'}
				className='transition-colors'
			/>
		</button>
	)
}
