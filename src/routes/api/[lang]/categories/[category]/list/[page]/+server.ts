import { json } from '@sveltejs/kit'
import { readCategoryConfig } from '$lib/api/category/read-config'
import { getPosts } from '$lib/api/post'

export async function GET(req) {
  const info = await readCategoryConfig(req.params.category, req.params.lang)
  const posts = await getPosts({
    language: req.params.lang,
    categories: [req.params.category],
    page: Number.parseInt(req.params.page)
  })
  return json({ info, posts })
}
