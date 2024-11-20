export type PaginationData<T> = {
	totalPages: number
	data: T[]
	page: number
	perPage: number
}

export function getPaginatedData<T>(data: T[], page: number, perPage: number): PaginationData<T> {
	const totalPages = Math.ceil(data.length / perPage)
	const slicedData = data.slice((page - 1) * perPage, page * perPage)
	return {
		totalPages,
		data: slicedData,
		page,
		perPage
	}
}
