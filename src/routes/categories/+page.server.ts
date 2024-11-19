import { i18n } from '$lib/i18n.js'

export async function load({ fetch, url }) {
	const response = await fetch(`/api/${i18n.getLanguageFromUrl(new URL(url))}/categories`)
	const categories: string[] = await response.json()
	return { categories }
}
