<script lang="ts">
  import CategoryView from './_components/category-view/CategoryView.svelte'

  let { data } = $props()
</script>

<CategoryView category={data.category} />
