import { json } from '@sveltejs/kit'
import { getPosts } from '$lib/api/post'

export async function GET(req) {
  const posts = await getPosts({ language: req.params.lang })
  return json(posts)
}
