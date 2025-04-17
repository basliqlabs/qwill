<script lang="ts">
  import * as m from '$lib/paraglide/messages'
  import { page } from '$app/state'
  import BlogPostCard from '$lib/components/blog-post-card/BlogPostCard.svelte'

  let { data } = $props()
  const posts = $derived(data.posts.data)

  let id = $derived(page.params.id)
</script>

<section class="container">
  <div class="header">
    <h1>{m.site_name()}</h1>
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
    padding-inline: var(--ws-5);

    display: flex;
    flex-direction: column;
    gap: var(--ws-5);
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: var(--ws-3);
  }

  .post-list {
    display: flex;
    flex-direction: column;
    gap: var(--ws-6);
  }
</style>
