<script lang="ts">
  import { type Category } from '../../../content/config/categories'
  import Anchor from '../anchor/Anchor.svelte'
  import * as m from '$lib/paraglide/messages'

  type Props = {
    category: Category | undefined
  }

  let { category }: Props = $props()
</script>

{#if category}
  <Anchor className="subtle" href={`/categories/network`}>
    <div class="category-container">
      {#if category.cover_image}
        <div
          class="category-image-container"
          style="background-image: url({category.cover_image})"
        ></div>
      {/if}
      <div class="category-text-content">
        <p class="category-text">{m.category()}</p>
        <p class="category-title">{category.display_title}</p>
      </div>
    </div>
  </Anchor>
{/if}

<style>
  .category-container {
    display: flex;
    flex-direction: row;
    gap: var(--ws-4);
  }

  .category-image-container {
    inline-size: 35px;
    block-size: 35px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .category-text-content {
    display: flex;
    flex-direction: column;
    gap: var(--ws-2);
    line-height: 1;
  }

  .category-text {
    font-size: var(--font-size-3);
    color: var(--t-color-text-muted);
  }

  .category-title {
    font-size: var(--font-size-5);
  }
</style>
