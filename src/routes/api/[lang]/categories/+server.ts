import { getDirectories } from '$lib/utils/folder'
import { getPaginatedData } from '$lib/utils/pagination.js'
import { extractSearchParams } from '$lib/utils/search-params.js'
import { json } from '@sveltejs/kit'

export async function GET(req) {
	const { page, perPage } = extractSearchParams(req.url.searchParams)
	const allPaths = await getDirectories('./src/content/posts')
	const paths = getPaginatedData(allPaths, page, perPage)
	return json(paths)
}
