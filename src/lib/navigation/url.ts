import type { Post } from '../../../content/config/posts'

export function getURL(post: Post) {
	const url = `/categories/${post.category}/${post.slug}`
	return url
}
