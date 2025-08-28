import type { DateString, Image } from '$lib/types/global-types'
import type { Series } from './series'

export type AmbientColors = 'purple'

export type FeaturedOn = {
	firstFold?: boolean
	category?: boolean
}

export type Post = {
	title: string
	description: string
	slug: string
	language: string
	publishDate: DateString
	updatedDate: DateString
	coverImage: Image
	series: Series | null
	category: string
	collections: string[]
	authors: string[]
	archived: boolean;
	draft: boolean
	outdated: boolean
	external: boolean
	ambientColor: AmbientColors | null
	featuredOn: FeaturedOn | null
}
