import { i18n } from '$lib/i18n.js'
import { type PaginatedData } from '$lib/utils/pagination.js'
import type { Category } from 'content/config/categories.js'
import type {Post} from "content/config/posts";

export async function load({ fetch, url, params }) {
	const response = await fetch(`/api/${i18n.getLanguageFromUrl(new URL(url))}/categories/${params.category}`)
	const category: {posts: Post[]} = await response.json()
	return { category }
}
