import { dev } from '$app/environment'

export const description = dev ? 'http://localhost' : 'url'

export const backendConfig = {
	defaultPage: 1,
	defaultPerPage: 9
}
