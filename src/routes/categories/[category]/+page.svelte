<script lang="ts">
  import { page } from '$app/state'

  let { data } = $props()
  const info = $derived(data.category.info)
  const posts = $derived(data.category.posts)

  let id = $derived(page.params.id)
</script>

<h1>{id}</h1>

<p>{info.display_title}</p>

{#each posts as post}
    <a href="/categories/{post.category}/{post.slug}">{post.title}</a><br><br>
{/each}
