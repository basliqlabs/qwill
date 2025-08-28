<script lang="ts">
  import { availableLanguageTags } from '$lib/paraglide/runtime'
  import { i18n } from '$lib/i18n'
  import { page } from '$app/state'
  import TabLanguage from '../icons/TABLanguage.svelte'

  function switchToLanguage() {
    const currentLanguage = i18n.getLanguageFromUrl(page.url)
    const currentLanguageIndex = availableLanguageTags.findIndex((lang) => currentLanguage === lang)
    const nextLanguageIndex =
      currentLanguageIndex === availableLanguageTags.length - 1 ? 0 : currentLanguageIndex + 1
    const nextLanguage = availableLanguageTags[nextLanguageIndex]
    const canonicalPath = i18n.route(page.url.pathname)
    let localizedPath = i18n.resolveRoute(canonicalPath, nextLanguage)
    if (localizedPath.endsWith('/') && localizedPath.length != 1) {
      localizedPath = localizedPath.substring(0, localizedPath.length - 1)
    }
    // @ts-expect-error: TODO: find a solution for the mismatch of types
    window.location = localizedPath
  }
</script>

<div>
  <button class="subtle" onclick={() => switchToLanguage()}><div class="icon-container"><TabLanguage /></div></button>
</div>

<style>
  .icon-container {
    display: grid;
    place-items: center;
    aspect-ratio: 1;
  }
</style>