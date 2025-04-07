import type {Post} from "content/config/posts";

type Config = {
  language?: string
  categories?: string[]
  skip?: number
  pick?: number
}

export async function getPosts(config?: Config) {
  let posts: Post[] = []

  const paths = import.meta.glob('/src/content/posts/**/*.md', {
    eager: true
  })

  for (const path in paths) {
    const file = paths[path]
    const category = path.split('/').at(-3)
    const slug = path.split('/').at(-2)
    const language = path.split('/').at(-1)?.replace('.md', '')

    if (file &&
      typeof file === 'object' &&
      'metadata' in file && slug &&
      category &&
      checkCategory(config, category) &&
      language &&
      checkLanguage(config, language)
    ) {
      const metadata = file.metadata as Omit<Post, 'slug' | 'category' | 'lang'>
      const post = {...metadata, category, slug, language} satisfies Post
      if (!post.draft) posts.push(post)
    }
  }

  posts = posts.sort(
    (first, second) =>
      new Date(second.updatedDate).getTime() - new Date(first.updatedDate).getTime()
  )

  return posts
}


function checkCategory(config: Config | undefined, category: string | undefined): boolean {
  if (!category) return false
  if (!config || !config.categories) return true
  return config.categories.includes(category)
}

function checkLanguage(config: Config | undefined, language: string | undefined): boolean {
  if (!language) return false
  if (!config || !config.language) return true
  return config.language === language
}
