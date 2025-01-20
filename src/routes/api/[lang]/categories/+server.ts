import { getDirectories } from '$lib/utils/directory'
import { json } from '@sveltejs/kit'
import type { Category } from 'content/config/categories.js'

// export async function getAllCategories(language: string) {
// 	const categories: Category[] = []
// 	const allPaths = await getDirectories('./content/posts')
// 	allPaths
// }

export async function GET(req) {
	return json('')
}
