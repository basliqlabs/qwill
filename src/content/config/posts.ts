import type { DateString, Image } from '../../lib/types/generic-types'
import type { Series } from './series'

export type AmbientColors = 'purple'

export type Post = {
	title: string
	description: string
	slug: string
	lang: string
	publishDate: DateString
	updatedDate: DateString
	coverImage: Image
	series: Series
	category: string
	collections: string[]
	authors: string[]
	draft: boolean
	outdated: boolean
	external: boolean
	fire: boolean
	ambientColor: AmbientColors | null
}
