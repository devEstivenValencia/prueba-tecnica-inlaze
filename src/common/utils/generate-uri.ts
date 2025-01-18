import { BaseSearchParams, genURLSearchParams } from './generate-search-params'

export function generateUri(url: string, searchParams?: BaseSearchParams) {
	if (searchParams && searchParams?.length > 0) {
		return url + '?' + genURLSearchParams(searchParams)
	}

	return url
}
