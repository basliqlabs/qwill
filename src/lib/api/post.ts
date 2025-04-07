import type {Post} from "content/config/posts";

export async function getPosts() {
  let posts: Post[] = []

  const paths = import.meta.glob('/src/content/posts/**/*.md', {
    eager: true
  })

  for (const path in paths) {
    const file = paths[path]
    const category = path.split('/').at(-3)
    const slug = path.split('/').at(-2)
    const lang = path.split('/').at(-1)?.replace('.md', '')

    if (file && typeof file === 'object' && 'metadata' in file && slug && category && lang) {
      const metadata = file.metadata as Omit<Post, 'slug'>
      const post = { ...metadata, category, slug, lang } satisfies Post
      if (!post.draft) posts.push(post)
    }
  }

  posts = posts.sort(
    (first, second) =>
      new Date(second.updatedDate).getTime() - new Date(first.updatedDate).getTime()
  )

  return posts
}
