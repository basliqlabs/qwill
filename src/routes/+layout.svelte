<script lang="ts">
	import Header from '$lib/components/header/Header.svelte'
	import { i18n } from '$lib/i18n'
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	let { children } = $props()
</script>

<ParaglideJS {i18n}>
	<Header />
	<main>
		{@render children()}
	</main>
</ParaglideJS>
