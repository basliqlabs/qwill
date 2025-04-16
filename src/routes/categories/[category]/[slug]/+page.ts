import { i18n } from '$lib/i18n'
import type { Post } from 'content/config/posts'

export async function load({ url, params }) {
  const mdFiles = import.meta.glob(`/src/content/posts/**/*.md`, {
    eager: true,
    query: {
      viteFrontmatter: true
    }
  })

  const mdKey = `/src/content/posts/${params.category}/${params.slug}`

  const md = mdFiles[`${mdKey}/${i18n.getLanguageFromUrl(new URL(url))}.md`] as {
    metadata: Post
    default: () => void
  }

  if (!md) {
    const entries = Object.entries(mdFiles)
    for (let i = 0; i < entries.length; i++) {
      const [k, v] = entries[i]
      if (k.startsWith(mdKey)) {
        return { post: { meta: (v as { metadata: Post }).metadata, content: null } }
      }
    }
  }

  return { post: { meta: md.metadata, content: md.default } }
}
