<script lang="ts">
  import CenteredLayout from '$lib/components/centered-layout/CenteredLayout.svelte'
  import CategoryView from './_components/category-view/CategoryView.svelte'

  let { data } = $props()
</script>

<CenteredLayout>
  <CategoryView category={data.category} />
</CenteredLayout>
