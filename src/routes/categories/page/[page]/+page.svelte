<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte'
	import { page } from '$app/state'

	let { data } = $props()
	const categories = $derived(data.categories.data)
	const totalPages = $derived(data.categories.totalPages)
	const pageNumber = page.data
	console.log(pageNumber)
</script>

{#each categories as category}
	<a href="/categories/{category}">{category.display_title}</a><br>
{/each}

<Pagination {totalPages} currentPage={1} baseLink="/categories/page" />
