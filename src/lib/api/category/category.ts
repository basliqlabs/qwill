import { getDirectories } from '$lib/utils/directory'
import { getPaginatedList } from '$lib/utils/pagination'
import type { Category } from 'content/config/categories'
import { readCategoryConfig } from './read-config'

export const CategoryListPageSize = 10
export const CategoryTargetDirectory = process.cwd() + '/src/content/posts'

type Config = {
  language: string
  page?: number
  pageSize?: number
}

export async function getCategories(config: Config): Promise<Category[]> {
  const allPaths = await getDirectories(CategoryTargetDirectory)
  const categories: Category[] = []
  for (const path of allPaths) {
    const categoryConfig = await readCategoryConfig(CategoryTargetDirectory, path, config.language)
    if (categoryConfig && !categoryConfig.archive) {
      categories.push(categoryConfig)
    }
  }
  return categories
}

// TODO - see if this operation can be cached to prevent unnecessary os file reads
export async function getCategoryCount(): Promise<number> {
  const allPaths = await getDirectories(CategoryTargetDirectory)
  return allPaths.length
}
