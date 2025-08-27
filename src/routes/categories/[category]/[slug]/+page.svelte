<script lang="ts">
  import './page.css'
  import * as m from '$lib/paraglide/messages'
  import BlogAuthor from '$lib/components/blog-author/blog-author.svelte'
  import Date from '$lib/components/date/date.svelte'
  import { page } from '$app/state'
  import { i18n } from '$lib/i18n'
  import BlogCategoryCard from '$lib/components/blog-category-card/BlogCategoryCard.svelte'

  const { data } = $props()
  const post = $derived(data.post.meta)
  const content = $derived(data.post.content)
  const category = $derived(data.post.category)
  const currentLanguage = i18n.getLanguageFromUrl(page.url)
  const currentCalendar = currentLanguage === 'en' ? 'gregory' : 'persian'

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
    <div>
      <BlogCategoryCard {category} />
    </div>
    <div class="header-heading-container">
      <h1 class="blog-title">{post.title}</h1>
      <p>{post.description}</p>
    </div>
    <div class="header-sub-container">
      {#if post.publishDate || post.updatedDate}
        <div class="header-date-container">
          {#if post.publishDate}
            <Date
              dateString={post.publishDate}
              title={m.date_published()}
              dimTitle={true}
              calendar={currentCalendar}
            />
          {/if}

          {#if post.updatedDate}
            <Date
              dateString={post.updatedDate}
              title={m.date_updated()}
              dimTitle={true}
              calendar={currentCalendar}
            />
          {/if}
        </div>
      {/if}
      <div class="header-authors-container">
        {#each post.authors as author}
          <BlogAuthor {author} />
        {/each}
      </div>
    </div>
  </header>
  <main>
    {#if content}
      <div class="content">
        <svelte:component this={content} />
      </div>
    {/if}
  </main>
</article>
