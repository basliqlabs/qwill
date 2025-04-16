<script lang="ts">
  import { base } from '$app/paths'
  import type { Snippet } from 'svelte'

  type Props = {
    href: string
    noBase?: boolean
    children: Snippet
  }

  let { href, noBase, children }: Props = $props()
  const link = $derived((noBase ? '' : base) + href)
</script>

<a href={link} data-sveltekit-reload>{@render children()}</a>
