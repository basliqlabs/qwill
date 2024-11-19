import { error } from '@sveltejs/kit'
import type { Post } from '../../../content/config/posts.js'

export async function load({ params }) {
	try {
		const post = await import(`../../../content/posts/software/${params.slug}/en.md`)

		return {
			content: post.default,
			meta: post.metadata as Post
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
