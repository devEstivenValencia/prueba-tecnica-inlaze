import { createLoader, parseAsString } from 'nuqs/server'

const searchParams = {
	page: parseAsString.withDefault('1')
}

export const loadHomeSearchParams = createLoader(searchParams)
