<script lang="ts">
  import * as m from '$lib/paraglide/messages'
  import Pagination from '$lib/components/pagination/Pagination.svelte'
  import CategoryCard from '$lib/components/category-card/CategoryCard.svelte'

  let { data } = $props()
  const categories = $derived(data.categories.data)
  const totalPages = $derived(data.categories.totalPages)
</script>

<div class="header">
  <h1>{m.header_categories()}</h1>
</div>

<div class="category-list">
  {#each categories as category}
    <CategoryCard {category} />
  {/each}
</div>

<Pagination {totalPages} currentPage={1} baseLink="/categories/list" />

<style>
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
