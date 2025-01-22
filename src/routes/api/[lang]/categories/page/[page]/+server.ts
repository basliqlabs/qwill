import { CategoryListPageSize, getCategories, getCategoryCount } from '$lib/api/category/category'
import { getPaginatedResponse } from '$lib/utils/pagination'
import { json } from '@sveltejs/kit'

export async function GET(req) {
	const lang = req.params.lang
	const page = Number(req.params.page)
	const data = await getCategories(lang, page)
	const totalCount = await getCategoryCount()
	return json(getPaginatedResponse(data, totalCount, page, CategoryListPageSize))
}
