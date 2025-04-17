import { getLanguage, i18n } from '$lib/i18n.js'
import { type PaginatedData } from '$lib/utils/pagination.js'
import type { Category } from 'content/config/categories.js'
import type { Post } from 'content/config/posts'

export async function load({ fetch, url, params }) {
  const response = await fetch(
    `/api/${getLanguage(url)}/categories/${params.category}/list/${params.page}`
  )
  const category: { info: Category; posts: PaginatedData<Post> } = await response.json()
  return { category }
}
