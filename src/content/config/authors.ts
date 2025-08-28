import * as m from '$lib/paraglide/messages.js'
import { derived } from 'svelte/store'
import { language } from '$lib/i18n'

export type Author = {
  readonly id: string
  display_name: string
  first_name: string | null
  last_name: string | null
  bio: string | null
  avatar: string | null
  github_handler: string | null
  telegram_handler: string | null
  x_handler: string | null
}

export const authorsStore = derived(language, ($lang) => {
  const authors: Author[] = [
    {
      id: 'atareversei',
      display_name: m.atareversei_display_name(),
      first_name: m.atareversei_first_name(),
      last_name: m.atareversei_last_name(),
      bio: m.atareversei_bio(),
      avatar: 'https://github.com/atareversei.png',
      github_handler: 'atareversei',
      telegram_handler: 'atareversei',
      x_handler: 'atareversei'
    }
  ]

  return authors
})
