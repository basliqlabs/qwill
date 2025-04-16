<script lang="ts">
  import { base } from '$app/paths'
  import type { Snippet } from 'svelte'

  type Props = {
    href: string
    children: Snippet
  }

  let { href, children }: Props = $props()
</script>

<a href={base + href} data-sveltekit-reload>{@render children()}</a>
