export type BaseSearchParams = Array<[string, string | number]>

export function genURLSearchParams(searchParams: BaseSearchParams) {
	return new URLSearchParams(searchParams.map(([key, value]) => [key, value.toString()]))
}
