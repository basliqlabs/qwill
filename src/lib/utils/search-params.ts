import { backendConfig } from '$lib/config'

export function extractSearchParams(searchParams: URLSearchParams) {
	const page = parseInt(searchParams.get('page') ?? backendConfig.defaultPage.toString(), 10)
	const perPage = parseInt(
		searchParams.get('per_page') ?? backendConfig.defaultPerPage.toString(),
		10
	)

	return {
		page,
		perPage
	}
}
