import { i18n } from '$lib/i18n.js'
import type { PaginationData } from '$lib/utils/pagination.js'

export async function load({ fetch, url }) {
	const response = await fetch(
		`/api/${i18n.getLanguageFromUrl(new URL(url))}/categories`
	)
	const categories: PaginationData<string> = await response.json()
	return { categories }
}
