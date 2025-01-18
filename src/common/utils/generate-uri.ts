import { BaseSearchParams, genURLSearchParams } from './generate-search-params'

export function generateUri(url: string, searchParams?: BaseSearchParams) {
	if (searchParams) {
		return url + '?' + genURLSearchParams(searchParams)
	}

	return url
}
