'use client'

import { useFavorites } from '@/hooks/use-favorites'
import clsx from 'clsx'
import { Heart } from 'lucide-react'
import { useMemo, useState } from 'react'

interface AddToFavoritesProps extends React.HTMLAttributes<HTMLButtonElement> {
	movieId: number
}

export function AddToFavorites({ movieId, className, ...props }: AddToFavoritesProps) {
	const { isFavorite: verifyIsFavorite, remove, save } = useFavorites()
	const memoizedIsFavorite = useMemo(() => verifyIsFavorite(movieId), [movieId, verifyIsFavorite])
	const [isFavorite, setIsFavorite] = useState<boolean>(memoizedIsFavorite)

	function toggleFavorite() {
		if (isFavorite) {
			remove(movieId)
			setIsFavorite(false)
		} else {
			save(movieId)
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
				color={isFavorite ? 'red' : 'currentColor'}
				fill={isFavorite ? 'red' : 'rgba(0, 0, 0, 0.5)'}
				className='transition-colors'
			/>
		</button>
	)
}
