'use client'

const FAVORITIES_KEY = 'favorities'

interface FavoritiesRepository {
	save: (id: number) => void
	remove: (id: number) => void
	get: (id: number) => string
	getAll: () => number[]
	isFavorite: (id: number) => boolean
}

export function favoritiesRepository(): FavoritiesRepository {
	return { save, remove, get, getAll, isFavorite }
}

function save(id: number) {
	const favorities = getAll()
	if (favorities?.includes(id)) return
	favorities?.push(id)
	localStorage?.setItem(FAVORITIES_KEY, JSON.stringify(favorities))
}

function remove(id: number) {
	const favorities = getAll()
	const index = favorities.indexOf(id)
	if (index === -1) return
	favorities.splice(index, 1)
	localStorage?.setItem(FAVORITIES_KEY, JSON.stringify(favorities))
}

function get(id: number) {
	return getAll().includes(id)
}

function getAll() {
	return JSON.parse(localStorage?.getItem(FAVORITIES_KEY) || '[]')
}

function isFavorite(id: number) {
	return Boolean(get(id))
}
