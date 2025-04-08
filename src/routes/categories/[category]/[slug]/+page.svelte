<script lang="ts">
  import type {Post} from "content/config/posts";

  export let data
  const post = data.meta as Post
</script>

<svelte:head>
    <title>{post.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={post.title} />
</svelte:head>

<article>
    <hgroup>
        <h1>{post.title}</h1>
        <p>Published at {post.publishDate}</p>
    </hgroup>

    <div class="collections">
        {#each post.collections as collection}
            <span class="surface-4">&num;{collection}</span>
        {/each}
    </div>

    <div class="prose">
        <svelte:component this={data.content} />
    </div>
</article>
