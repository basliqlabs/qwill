<script lang="ts">
	type Props = {
		totalPages: number
		currentPage: number
		boundaries?: number
		withControls?: boolean
		withEdges?: boolean
		handlePagination: (pageNumber: number) => void
	}

	let {
		totalPages,
		currentPage,
		boundaries = 3,
		withControls = true,
		withEdges = true,
		handlePagination
	}: Props = $props()

	let beginningEdgeIsInBoundaries = $derived(currentPage - boundaries <= 1)
	let endEdgeIsInBoundaries = $derived(totalPages <= currentPage + boundaries)
	let isOnFirstPage = $derived(currentPage === 1)
	let isOnLastPage = $derived(currentPage === totalPages)
	let visiblePages = $derived.by(() => {
		const pages: number[] = []
		const boundaryStart = currentPage - boundaries < 1 ? 1 : currentPage - boundaries
		const boundaryEnd =
			currentPage + boundaries > totalPages ? totalPages : currentPage + boundaries
		for (let i = boundaryStart; i <= boundaryEnd; i++) {
			pages.push(i)
		}
		return pages
	})
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
		<button onclick={() => handlePagination(visiblePage)}>{visiblePage}</button>
	{/each}

	{#if withEdges && !endEdgeIsInBoundaries}
		<button onclick={() => handlePagination(totalPages)}> {totalPages} </button>
	{/if}

	{#if withControls}
		<button disabled={isOnLastPage} onclick={() => handlePagination(currentPage + 1)}>
			next
		</button>
	{/if}
</nav>
