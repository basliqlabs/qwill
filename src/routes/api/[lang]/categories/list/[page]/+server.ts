import { CategoryListPageSize, getCategories } from '$lib/api/category/category'
import { getPaginatedResponse } from '$lib/utils/pagination'
import { json } from '@sveltejs/kit'

export async function GET(req) {
  const lang = req.params.lang
  const page = Number(req.params.page)
  const data = await getCategories({ language: lang })
  return json(getPaginatedResponse(data, page, CategoryListPageSize))
}
