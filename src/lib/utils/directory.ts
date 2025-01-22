import fs from 'fs/promises'

export const getDirectories = async (source: string) =>
	(await fs.readdir(source, { withFileTypes: true }))
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
