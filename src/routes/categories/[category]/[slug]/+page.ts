import { i18n } from '$lib/i18n'
import type { Post } from 'content/config/posts'

export async function load({ url, params }) {
  const mdFiles = import.meta.glob(`/src/content/posts/**/*.md`, {
    eager: true,
    query: {
      viteFrontmatter: true
    }
  })

  const md = mdFiles[
    `/src/content/posts/${params.category}/${params.slug}/${i18n.getLanguageFromUrl(new URL(url))}.md`
  ] as { metadata: Post; default: () => void }

  const post = { meta: md.metadata, content: md.default }
  return { post }
}
