<script lang="ts">
  import type {Post} from "content/config/posts";

  export let data
  const post = data.meta as Post
</script>

<svelte:head>
    <title>{post.title}</title>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content={post.title}/>
</svelte:head>

<article>
    <main>
    <header>
        <hgroup>
            <h1>{post.title}</h1>
            <p>Published at {post.publishDate}</p>
        </hgroup>

        <div class="collections">
            {#each post.collections as collection}
                <span class="surface-4">&num;{collection}</span>
            {/each}
        </div>
    </header>
        <div class="content">
            <svelte:component this={data.content}/>
        </div>
    </main>
    <aside>
        aside
    </aside>
</article>

<style>
  article {
    max-inline-size: var(--t-post-article-inline-size);
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr var(--t-blog-post-sidebar-size);
  }

  main {
    display: grid;
    grid-template-columns: [extended-start] var(--t-blog-post-gutter-size) [content-start] var(--t-blog-post-gutter-size) [indented-start] var(--t-blog-post-gutter-size) [indented2-start] 1fr [indented2-end] var(--t-blog-post-gutter-size) [indented-end] var(--t-blog-post-gutter-size) [content-end] var(--t-blog-post-gutter-size) [extended-end];
  }

  header, .content {
    grid-column: content;
  }

  header {
    display: flex;
    flex-direction: column;
    gap: var(--ws-5);

    padding-block-end: var(--ws-10);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--ws-10);

    :global(section) {
      display: grid;
      grid-template-columns: [extended-start] var(--t-blog-post-gutter-size) [content-start] var(--t-blog-post-gutter-size) [indented-start] 1fr [indented-end] var(--t-blog-post-gutter-size) [content-end] var(--t-blog-post-gutter-size) [extended-end];

      border-inline-start: 2px solid var(--t-color-border-divider-dim);
      padding-inline-start: var(--ws-2);

      :global(section) {
        padding-block-start: var(--ws-6);
        grid-column: indented;
      }

      :global(h2, h3, p, ul) {
        grid-column: content;
      }

      :global(figure, pre) {
        grid-column: extended;
      }

      :global(h2, h3) {
        margin-block-end: var(--ws-4);
      }

      :global(ul) {
        display: flex;
        flex-direction: column;
        gap: var(--ws-4);
        margin-block-end: var(--ws-6);
      }

      :global(p) {
        line-height: var(--line-height-5);
        margin-block-end: var(--ws-4);
      }

      :global(figure) {
        margin-block: var(--ws-8);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ws-4);

        :global(img) {
          border-radius: var(--radius-sm);
        }

        :global(figcaption) {
          font-size: var(--font-size-4);
          text-align: center;
        }
      }

      :global(pre) {
        padding: var(--ws-4);
        margin-block: var(--ws-8);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-4);
        overflow-x: auto;
      }
    }
  }
</style>
