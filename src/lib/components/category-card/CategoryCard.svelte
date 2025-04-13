<script lang="ts">
  import { i18n } from '$lib/i18n'
  import type { Category } from 'content/config/categories'

  type Props = {
    category: Category
  }

  let { category }: Props = $props()
  const link = $derived(i18n.route(`/categories/${category.id}`))
</script>

<article>
  <section class="content">
    <h1><a href={link}>{category.display_title}</a></h1>
    <p>{category.description}</p>
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
