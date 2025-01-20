export type PaginatedData<T> = {
	totalPages: number
	data: T[]
	page: number
	perPage: number
}

export function getPaginatedData<T>(data: T[], page: number, perPage: number): PaginatedData<T> {
	const totalPages = Math.ceil(data.length / perPage)
	const slicedData = data.slice((page - 1) * perPage, page * perPage)
	return {
		totalPages,
		data: slicedData,
		page,
		perPage
	}
}

export function getPageFromUrl(url: string | URL, key: string): number {
	const path = typeof url === 'string' ? url : url.pathname
	const keyIndex = path.indexOf(key)
	const length = key.length + '/page/'.length
	const slashIndex = path.indexOf('/', keyIndex + length)
	const page = path.substring(keyIndex + length, slashIndex === -1 ? undefined : slashIndex)
	return Number(page)
}
