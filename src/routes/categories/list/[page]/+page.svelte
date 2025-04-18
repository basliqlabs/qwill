<script lang="ts">
  import CategoriesListView from '../../_components/categories-list-view/CategoriesListView.svelte'

  let { data } = $props()
</script>

<CategoriesListView categories={data.categories} />
