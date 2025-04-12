<script lang="ts">
  import { page } from '$app/state'
  import BlogPostCard from '$lib/components/blog-post-card/BlogPostCard.svelte'

  let { data } = $props()
  const info = $derived(data.category.info)
  const posts = $derived(data.category.posts)

  let id = $derived(page.params.id)
</script>

<section class="container">
  <div class="header">
    <h1>{info.display_title}</h1>
    <p class="description">{info.description}</p>
  </div>

  <div class="post-list">
    {#each posts as post}
      <BlogPostCard {post} />
    {/each}
  </div>
</section>

<style>
  .container {
    max-inline-size: var(--t-container-inline-size);
    margin-inline: auto;
    margin-block: var(--ws-8);

    display: flex;
    flex-direction: column;
    gap: var(--ws-8);
  }

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
