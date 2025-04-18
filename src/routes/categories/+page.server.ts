import { getLanguage, i18n } from '$lib/i18n.js'
import { type PaginatedData } from '$lib/utils/pagination.js'
import type { Category } from 'content/config/categories.js'

export async function load({ fetch, url }) {
  const response = await fetch(`/api/${getLanguage(url)}/categories/list/1`)
  const categories: PaginatedData<Category> = await response.json()
  return { categories }
}
