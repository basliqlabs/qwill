export type ShortMonth =
  | 'Feb'
  | 'Jan'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec'
export type DateString = `${number}-${number}-${number}`
export type Image = { src: string; alt: string | null }
export type PaginationLinkStructure = `${string}/${number}`
