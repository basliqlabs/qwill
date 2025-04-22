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

    const article = document.querySelector('article')

    document.querySelectorAll('button.copy-code').forEach((btn) => {
      btn.addEventListener('click', handler)
    })

    document.querySelectorAll('img').forEach((img) => {
      if (img.src.includes('/src')) {
        img.src = img.src.replace('/src', `${base}/src`)
      }
    })

    document.querySelectorAll('span.icon.icon-link').forEach((elm) => {
      elm.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M11 17H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z"/></svg>`
    })

    let touchStartX = 0
    let touchEndX = 0

    article?.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        touchStartX = e.changedTouches[0].screenX
      },
      false
    )

    article?.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      false
    )

    const threshold = 50

    function handleSwipe() {
      if (touchEndX < touchStartX - threshold) {
        showSidebarOnMobile = true
      }

      if (touchEndX > touchStartX + threshold) {
        showSidebarOnMobile = false
      }
    }
  })
</script>

<svelte:head>
  <title>{post.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
</svelte:head>

<article data-show-sidebar={showSidebarOnMobile}>
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
