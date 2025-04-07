import { error } from '@sveltejs/kit'
import {i18n} from "$lib/i18n";

export async function load({ url, params }) {
  try {
    const post = await import(`/src/content/posts/${params.category}/${params.slug}/${i18n.getLanguageFromUrl(new URL(url))}.md`)

    return {
      content: post.default,
      meta: post.metadata
    }
  } catch (e) {
    error(404, `Could not find ${params.slug}`)
  }
}
