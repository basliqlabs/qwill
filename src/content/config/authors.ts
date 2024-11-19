import * as m from '$lib/paraglide/messages.js'

export type Author = {
	readonly display_name: string
	first_name: string | null
	last_name: string | null
	bio: string | null
	github_handler: string | null
	telegram_handler: string | null
	x_handler: string | null
}

export const authors: Author[] = [
	{
		display_name: 'atareversei',
		first_name: null,
		last_name: null,
		bio: m.atareversei_bio(),
		github_handler: 'atareversei',
		telegram_handler: 'atareversei',
		x_handler: null
	}
]
