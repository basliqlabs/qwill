<script lang="ts">
  import { page } from '$app/state'
  import BlogPostCard from '$lib/components/blog-post-card/BlogPostCard.svelte'
  import Pagination from '$lib/components/pagination/Pagination.svelte'

  let { data } = $props()
  const info = $derived(data.category.info)
  const posts = $derived(data.category.posts.data)
  const totalPages = $derived(data.category.posts.totalPages)
  const pageNumber = $derived(data.category.posts.page)
  const category = $derived(page.params.category)

  let id = $derived(page.params.id)
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

<Pagination {totalPages} currentPage={pageNumber} baseLink={`/categories/${category}/list`} />

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
