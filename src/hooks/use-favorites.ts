'use client'

const FAVORITES_LOCAL_STORAGE_KEY = 'favorites'
const isBrowser = typeof window !== 'undefined'

export function useFavorites() {
	function save(id: number) {
		const favorities = getAll()
		if (favorities?.includes(id)) return
		favorities?.push(id)
		localStorage?.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(favorities))
	}

	function remove(id: number) {
		const favorities = getAll()
		const index = favorities.indexOf(id)
		if (index === -1) return
		favorities.splice(index, 1)
		localStorage?.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(favorities))
	}

	function get(id: number) {
		return getAll().includes(id)
	}

	function getAll() {
		if (!isBrowser) return []
		return JSON.parse(localStorage?.getItem(FAVORITES_LOCAL_STORAGE_KEY) || '[]')
	}

	function isFavorite(id: number) {
		return Boolean(get(id))
	}

	return {
		save,
		remove,
		get,
		getAll,
		isFavorite
	}
}
