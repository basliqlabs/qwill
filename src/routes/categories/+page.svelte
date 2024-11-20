<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation'
	import Pagination from '$lib/components/pagination/Pagination.svelte'

	let { data } = $props()
	const categories = $derived(data.categories.data)
	const totalPages = $derived(data.categories.totalPages)
	const currentPage = $derived(data.categories.page)
</script>

{#each categories as category}
	<a href="/categories/{category}">{category}</a>
{/each}

<Pagination
	{totalPages}
	{currentPage}
	handlePagination={(pageNumber: number) => {
		goto(`/categories?page=${pageNumber}`)
	}}
/>
