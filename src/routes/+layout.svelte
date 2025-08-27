<script lang="ts">
  import '$lib/styles/global.css'

  import Header from '$lib/components/header/Header.svelte'
  import { i18n } from '$lib/i18n'
  import { ParaglideJS } from '@inlang/paraglide-sveltekit'
  import { language } from '$lib/i18n.js';

  let { data, children } = $props()
  
  $language = data.language;
</script>

<svelte:head>
  <!-- TODO: Research 'subset="latin"' property's effectiveness -->
  {#if data.direction === 'ltr'}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  {/if}

  {#if data.direction === 'rtl'}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap"
      rel="stylesheet"
    />
  {/if}

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<ParaglideJS {i18n}>
  <Header />
  <main>
    {@render children()}
  </main>
</ParaglideJS>
