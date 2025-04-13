export type PaginatedData<T> = {
  totalPages: number
  itemCount: number
  data: T[]
  page: number
  perPage: number
}

export function getPaginatedResponse<T>(
  data: T[],
  page: number,
  perPage: number
): PaginatedData<T> {
  const itemCount = data.length
  const totalPages = Math.ceil(itemCount / perPage)

  return {
    data: getPaginatedList(data, page, perPage),
    itemCount,
    totalPages,
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

export function getPaginatedList<T>(list: T[], page: number, size: number): T[] {
  return list.slice((page - 1) * size, page * size)
}
