<script lang="ts">
  import { page } from '$app/state'
  import BlogPostCard from '$lib/components/blog-post-card/BlogPostCard.svelte'
  import Pagination from '$lib/components/pagination/Pagination.svelte'
  import type { PaginatedData } from '$lib/utils/pagination'
  import type { Post } from 'content/config/posts'
  import type { Category } from 'content/config/categories'

  type Props = {
    category: {
      info: Category
      posts: PaginatedData<Post>
    }
  }

  let { category }: Props = $props()
  const info = $derived(category.info)
  const posts = $derived(category.posts.data)
  const totalPages = $derived(category.posts.totalPages)
  const pageNumber = $derived(category.posts.page)
  const categoryId = $derived(page.params.category)
</script>

<div class="header">
  <h1>{info.display_title}</h1>
  <p class="description">{info.description}</p>
</div>

<div class="post-list">
  {#each posts as post}
    <BlogPostCard {post} />
  {/each}
</div>

<Pagination {totalPages} currentPage={pageNumber} baseLink={`/categories/${categoryId}/list`} />

<style>
  .header {
    display: flex;
    flex-direction: column;
    gap: var(--ws-3);

    .description {
      color: var(--t-color-text-muted);
    }
  }

  .post-list {
    display: flex;
    flex-direction: column;
    gap: var(--ws-6);
  }
</style>
