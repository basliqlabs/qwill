import { i18n } from '$lib/i18n'
import type { PaginatedData } from '$lib/utils/pagination'
import type { Post } from 'content/config/posts'

export async function load({ fetch, url }) {
  const response = await fetch(`/api/${i18n.getLanguageFromUrl(new URL(url))}/blog/list/1`)
  const posts: PaginatedData<Post> = await response.json()
  return { posts }
}
