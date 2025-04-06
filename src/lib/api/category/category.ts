import { getDirectories } from '$lib/utils/directory'
import { getPaginatedList } from '$lib/utils/pagination'
import type { Category } from 'content/config/categories'
import { readCategoryConfig } from './read-config'

export const CategoryListPageSize = 1
const targetDirectory = './src/content/posts'

export async function getCategories(lang: string, page: number): Promise<Category[]> {
	const allPaths = await getDirectories(targetDirectory)
	const filteredPaths = getPaginatedList(allPaths, page, CategoryListPageSize)
	const promisedPaths: Promise<Category | null>[] = []
	filteredPaths.forEach((category) => {
		promisedPaths.push(readCategoryConfig(targetDirectory, category, lang))
	})
	const categories = await Promise.all(promisedPaths)
	const filteredCategories = categories.filter((item) => item !== null) as Category[]
	return filteredCategories
}

// TODO - see if this operation can be cached to prevent unnecessary os file reads
export async function getCategoryCount(): Promise<number> {
	const allPaths = await getDirectories(targetDirectory)
	return allPaths.length
}
