import { dev } from '$app/environment'

export const BASE = 'experiences'
export const title = 'Experiences'
export const description = dev ? 'http://localhost' : 'url'

export const backendConfig = {
	defaultPage: 1,
	defaultPerPage: 9
}
