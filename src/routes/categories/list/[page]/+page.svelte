<script lang="ts">
  import CenteredLayout from '$lib/components/centered-layout/CenteredLayout.svelte'
  import CategoriesListView from '../../_components/categories-list-view/CategoriesListView.svelte'

  let { data } = $props()
</script>

<CenteredLayout>
  <CategoriesListView categories={data.categories} />
</CenteredLayout>
