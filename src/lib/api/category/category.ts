import { getDirectories } from '$lib/utils/directory'
import { getPaginatedList } from '$lib/utils/pagination'
import type { Category } from 'content/config/categories'
import { readCategoryConfig } from './read-config'

export const CategoryListPageSize = 10
export const CategoryTargetDirectory = './src/content/posts'

export async function getCategories(lang: string, page: number): Promise<Category[]> {
	const allPaths = await getDirectories(CategoryTargetDirectory)
	const filteredPaths = getPaginatedList(allPaths, page, CategoryListPageSize)
	const promisedPaths: Promise<Category | null>[] = []
	filteredPaths.forEach((category) => {
		promisedPaths.push(readCategoryConfig(CategoryTargetDirectory, category, lang))
	})
	const categories = await Promise.all(promisedPaths)
	return categories.filter((item) => item !== null) as Category[]
}

// TODO - see if this operation can be cached to prevent unnecessary os file reads
export async function getCategoryCount(): Promise<number> {
	const allPaths = await getDirectories(CategoryTargetDirectory)
	return allPaths.length
}
