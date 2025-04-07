<script lang="ts">
  import { page } from '$app/state'

  let { data } = $props()
  console.log(data)
  let id = $derived(page.params.id)
</script>

<h1>{id}</h1>

<p>{data.category.info.display_title}</p>

{#each data.category.posts as post}
    <a href="/categories/{post.category}/{post.slug}">{post.title}</a><br><br>
{/each}
