<script lang="ts">
  import type { Post } from 'content/config/posts'
  import { i18n } from '$lib/i18n'

  type Props = {
    post: Post
  }

  let { post }: Props = $props()
  const link = i18n.route(`/categories/${post.category}/${post.slug}`)
</script>

<article>
  <section class="content">
    <h1><a href={link}>{post.title}</a></h1>
    <p>{post.description}</p>
  </section>
</article>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--ws-4);

    h1 {
      font-size: var(--font-size-7);
    }
  }
</style>
