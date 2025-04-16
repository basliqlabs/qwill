import type { Category } from 'content/config/categories'
import type { Post } from 'content/config/posts'

export async function readCategoryConfig(categoryId: string, lang: string): Promise<Category> {
  const configFiles = import.meta.glob(`/src/content/posts/*/*.json`, {
    eager: true,
    query: {
      viteFrontmatter: true
    }
  })

  const configKey = `/src/content/posts/${categoryId}`

  const json = configFiles[`${configKey}/${lang}.json`] as {
    metadata: Post
    default: () => void
  }

  if (!json) {
    const entries = Object.entries(configFiles)
    for (let i = 0; i < entries.length; i++) {
      const [k, v] = entries[i]
      const langCode = k.match(/([^/]+)\.json$/)?.[1]
      if (k.startsWith(configKey)) {
        return {
          ...(v as { default: Exclude<Category, 'id'> }).default,
          id: categoryId,
          lang: langCode || null
        } satisfies Category
      }
    }
  }

  return {
    // @ts-expect-error: TODO: sveltkit is inferring the wrong type
    ...(json as { default: Exclude<Category, 'id'> }).default,
    id: categoryId,
    lang
  } satisfies Category
}
