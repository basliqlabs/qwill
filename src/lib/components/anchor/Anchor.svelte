<script lang="ts">
  import { base } from '$app/paths'
  import type { Snippet } from 'svelte'
  import { i18n } from '$lib/i18n'

  type Props = {
    href: string
    noBase?: boolean
    children: Snippet
  }

  let { href, noBase, children }: Props = $props()
  const link = $derived.by(() => {
    let h = href
    return (noBase ? '' : base) + h
  })
</script>

<a href={link} data-sveltekit-reload>{@render children()}</a>
