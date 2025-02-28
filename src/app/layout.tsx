import { quickSand, splineSans } from './fonts/fonts'
import './globals.css'
import { Bg } from '@/components/bg'
import { Header } from '@/components/header'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
	title: 'Prueba tecnica Estiven Valencia - Inlaze',
	description: 'Encuentra peliculas y mucho mas'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='es'>
			<body className={clsx(quickSand.variable, splineSans.variable, 'min-h-screen font-sans text-white antialiased')}>
				<Bg />
				<NuqsAdapter>
					<div className='mx-auto h-full min-h-screen max-w-5xl px-4'>
						<Header />
						{children}
					</div>
				</NuqsAdapter>
			</body>
		</html>
	)
}
