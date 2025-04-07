import type {Post} from "content/config/posts";

export function getURL(post: Post) {
	return `/categories/${post.category}/${post.slug}`
}
