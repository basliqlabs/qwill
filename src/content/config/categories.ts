import type { Image } from '$lib/types/generic-types'

export type Category = {
	id: string
	display_title: string
	description: string | null
	cover_image: Image | null
}
