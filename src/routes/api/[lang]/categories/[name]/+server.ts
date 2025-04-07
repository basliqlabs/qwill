import {json} from "@sveltejs/kit";
import {readCategoryConfig} from "$lib/api/category/read-config";
import {CategoryTargetDirectory} from "$lib/api/category/category";
import {getPosts} from "$lib/api/post";

async function getConfigData(categoryId: string, language: string) {
  const configData = readCategoryConfig(CategoryTargetDirectory, categoryId, language)
  return configData
}

async function getCategoryPosts(categoryId: string, language: string) {
  const posts = await getPosts()
  return posts
}

export async function GET(req) {
  const configData = await getConfigData(req.params.name, req.params.lang)
  const posts = await getCategoryPosts(req.params.name, req.params.lang)
  return json({info: configData, posts})
}
