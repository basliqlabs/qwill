import { i18n } from '$lib/i18n'
import type { Post } from '../../../content/config/posts'

export async function load({ fetch, params, url }) {
	const response = await fetch(
		`/api/${i18n.getLanguageFromUrl(new URL(url))}/categories/${params.category}`
	)
	const posts: Post[] = await response.json()
	return { posts }
}
