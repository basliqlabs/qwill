import { i18n } from '$lib/i18n.js'
import { getPageFromUrl, type PaginatedData } from '$lib/utils/pagination.js'

export async function load({ fetch, url }) {
	const response = await fetch(
		`/api/${i18n.getLanguageFromUrl(new URL(url))}/categories/page/${getPageFromUrl(url, 'categories')}`
	)
	const categories: PaginatedData<string> = await response.json()
	return { categories }
}
