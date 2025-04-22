<script lang="ts">
  import * as m from '$lib/paraglide/messages'
  import Pagination from '$lib/components/pagination/Pagination.svelte'
  import CategoryCard from '$lib/components/category-card/CategoryCard.svelte'
  import type { PaginatedData } from '$lib/utils/pagination'
  import type { Category } from 'content/config/categories'

  type Props = {
    categories: PaginatedData<Category>
  }

  let { categories }: Props = $props()
  const categoriesList = $derived(categories.data)
  const totalPages = $derived(categories.totalPages)
</script>

<div class="container">
  <div class="header">
    <h1>{m.header_categories()}</h1>
  </div>

  <div class="category-list">
    {#each categoriesList as category}
      <CategoryCard {category} />
    {/each}
  </div>
</div>

<Pagination {totalPages} currentPage={1} baseLink="/categories/list" />

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--ws-8);

    padding-inline: var(--ws-5);
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: var(--ws-3);
  }

  .category-list {
    display: flex;
    flex-direction: column;
    gap: var(--ws-6);
  }
</style>
