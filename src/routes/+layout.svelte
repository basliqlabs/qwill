<script lang="ts">
	import '$lib/styles/global.css'

	import Header from '$lib/components/header/Header.svelte'
	import { i18n } from '$lib/i18n'
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	let { children } = $props()
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<!-- TODO - research subset=latin's effectiveness -->
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Sans:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap&subset=latin"
		rel="stylesheet"
	/>
</svelte:head>

<ParaglideJS {i18n}>
	<Header />
	<main>
		{@render children()}
	</main>
</ParaglideJS>
