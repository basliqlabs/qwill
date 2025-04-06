import { i18n } from '$lib/i18n.js'
import { type PaginatedData } from '$lib/utils/pagination.js'
import type { Category } from 'content/config/categories.js'

export async function load({ fetch, url, params }) {
	const response = await fetch(`/api/${i18n.getLanguageFromUrl(new URL(url))}/categories/page/${params.page}`)
	const categories: PaginatedData<Category> = await response.json()
	return { categories }
}
