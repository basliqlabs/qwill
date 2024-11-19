import { error } from '@sveltejs/kit'
import type { Post } from '../../../../content/config/posts.js'
import { i18n } from '$lib/i18n.js'

export async function load({ params }) {
	console.log(document.URL)
	console.log(i18n.getLanguageFromUrl(new URL(document.URL)))

	try {
		const post = await import(
			`../../../../content/posts/${params.category}/${params.slug}/${i18n.getLanguageFromUrl(new URL(document.URL))}.md`
		)

		return {
			content: post.default,
			meta: post.metadata as Post
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
