import type { Post } from '../../content/config/posts'

export function getURL(post: Post) {
	return `/${post.lang === 'en' ? '' : post.lang}/blog/${post.category}/${post.slug}`
}
