import { i18n } from '$lib/i18n.js'
import type { PaginationData } from '$lib/utils/pagination.js'
import { extractSearchParams } from '$lib/utils/search-params.js'

export async function load({ fetch, url }) {
	const { page, perPage } = extractSearchParams(url.searchParams)
	const response = await fetch(
		`/api/${i18n.getLanguageFromUrl(new URL(url))}/categories?page=${page}&per_page=${1}`
	)
	const categories: PaginationData<string> = await response.json()
	return { categories }
}
