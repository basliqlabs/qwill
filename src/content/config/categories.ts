import type { Image } from '$lib/types/global-types'

export type Category = {
  id: string
  display_title: string
  description: string | null
  cover_image: Image | null
  archive?: boolean
}
