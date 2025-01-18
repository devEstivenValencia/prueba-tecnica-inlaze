import localFont from 'next/font/local'

const quickSand = localFont({
	src: './Quicksand-Variable.woff2',
	style: 'variable',
	variable: '--font-heading'
})

const splineSans = localFont({
	src: './SplineSans-Variable.woff2',
	style: 'variable',
	variable: '--font-body'
})

export { quickSand, splineSans }
