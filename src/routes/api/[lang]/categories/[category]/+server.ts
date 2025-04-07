import {json} from "@sveltejs/kit";
import {readCategoryConfig} from "$lib/api/category/read-config";
import {CategoryTargetDirectory} from "$lib/api/category/category";
import {getPosts} from "$lib/api/post";

export async function GET(req) {
  const info = readCategoryConfig(CategoryTargetDirectory, req.params.category, req.params.lang)
  const posts = await getPosts({language: req.params.lang, categories: [req.params.category]})
  return json({info, posts})
}
