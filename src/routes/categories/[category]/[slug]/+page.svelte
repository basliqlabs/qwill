<script lang="ts">
  import './page.css'
  import { base } from '$app/paths'

  const { data } = $props()
  const post = $derived(data.post.meta)
  const content = $derived(data.post.content)
  let showSidebarOnMobile = $state(false)

  $effect(() => {
    const handler = (event) => {
      const elm = event.currentTarget
      const prevText = elm.innerText
      elm.innerText = 'copied!'
      elm.classList.add('copied')
      const code = elm.dataset.code
      navigator.clipboard.writeText(code)

      setTimeout(() => {
        elm.innerText = prevText
        elm.classList.remove('copied')
      }, 2_000)
    }

    document.querySelectorAll('button.copy-code').forEach((btn) => {
      btn.addEventListener('click', handler)
    })
  })
</script>

<svelte:head>
  <title>{post.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
</svelte:head>

<article>
  <header>
    <hgroup>
      <h1 class="blog-title">{post.title}</h1>
    </hgroup>
  </header>
  <main>
    {#if content}
      <div class="content">
        <svelte:component this={content} />
      </div>
    {/if}
  </main>
</article>
