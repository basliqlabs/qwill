import { getDirectories } from '$lib/utils/folder'
import { json } from '@sveltejs/kit'

export async function GET() {
	const paths = await getDirectories('./src/content/posts')
	return json(paths)
}
