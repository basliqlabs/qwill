<script lang="ts">
	import * as config from '$lib/config'
	import { getURL } from '$lib/navigation/url'

	let { data } = $props()
</script>

{#each data.categories as category}
	<a href="/categories/{category}">{category}</a>
{/each}
