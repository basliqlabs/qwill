<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PaginationLinkStructure } from '$lib/types/global-types'

	type Props = {
		totalPages: number
		currentPage: number
		baseLink: string
		boundaries?: number
		withControls?: boolean
		withEdges?: boolean
		/**
		 * You can pass your own pagination function into the component.
		 * Runs before the default goto() function.
		 */
		paginationFn?: ((pageNumber: number) => void) | null
		/**
		 * Enables SSG adapter to crawl through all links at once.
		 */
		ssgLinkDiscovery?: boolean
	}

	let {
		totalPages,
		currentPage,
		baseLink,
		boundaries = 3,
		withControls = true,
		withEdges = true,
		paginationFn = null,
		ssgLinkDiscovery = true
	}: Props = $props()

	const beginningEdgeIsInBoundaries = $derived(currentPage - boundaries <= 1)
	const endEdgeIsInBoundaries = $derived(totalPages <= currentPage + boundaries)
	const isOnFirstPage = $derived(currentPage === 1)
	const isOnLastPage = $derived(currentPage === totalPages)
	const visiblePages = $derived.by(() => {
		const pages: number[] = []
		const boundaryStart = currentPage - boundaries < 1 ? 1 : currentPage - boundaries
		const boundaryEnd =
			currentPage + boundaries > totalPages ? totalPages : currentPage + boundaries
		for (let i = boundaryStart; i <= boundaryEnd; i++) {
			pages.push(i)
		}
		return pages
	})
	const allDiscoverablePageNumbers = $derived(Array.from({ length: totalPages }, (_, i) => i + 1))

	function handlePagination(page: number) {
		if (paginationFn !== null) {
			paginationFn(page)
		} else {
			const link: PaginationLinkStructure = `${baseLink}/${page}`
			goto(link)
		}
	}
</script>

<nav>
	{#if withControls}
		<button disabled={isOnFirstPage} onclick={() => handlePagination(currentPage - 1)}>
			prev
		</button>
	{/if}

	{#if withEdges && !beginningEdgeIsInBoundaries}
		<button onclick={() => handlePagination(1)}> 1 </button>
	{/if}

	{#each visiblePages as visiblePage}
		<button onclick={() => handlePagination(visiblePage)} disabled={currentPage === visiblePage}>{visiblePage}</button>
	{/each}

	{#if withEdges && !endEdgeIsInBoundaries}
		<button onclick={() => handlePagination(totalPages)}> {totalPages} </button>
	{/if}

	{#if withControls}
		<button disabled={isOnLastPage} onclick={() => handlePagination(currentPage + 1)}>
			next
		</button>
	{/if}

	{#if ssgLinkDiscovery}
		{#each allDiscoverablePageNumbers as pageNumber}
			<a href="{baseLink}/{pageNumber}" class="ssg-discoverable-link">{pageNumber}</a>
		{/each}
	{/if}
</nav>

<style>
	.ssg-discoverable-link {
		display: none;
	}
</style>
