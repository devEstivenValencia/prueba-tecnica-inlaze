'use client'

import { MoveLeft } from 'lucide-react'

export function BackLink() {
	return (
		<button
			onClick={() => {
				window.history.back()
			}}
			className='flex flex-row items-center gap-2 transition-colors hover:text-blue-200'
		>
			<MoveLeft />
			<span>Atras</span>
		</button>
	)
}
