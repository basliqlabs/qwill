<script lang="ts">
	import { availableLanguageTags, type AvailableLanguageTag } from '$lib/paraglide/runtime'
	import { i18n } from '$lib/i18n'
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import * as m from '$lib/paraglide/messages.js'

	function switchToLanguage() {
		const currentLanguage = i18n.getLanguageFromUrl(page.url)
		const currentLanguageIndex = availableLanguageTags.findIndex((lang) => currentLanguage === lang)
		const nextLanguageIndex =
			currentLanguageIndex === availableLanguageTags.length - 1 ? 0 : currentLanguageIndex + 1
		const nextLanguage = availableLanguageTags[nextLanguageIndex]
		const canonicalPath = i18n.route(page.url.pathname)
		const localizedPath = i18n.resolveRoute(canonicalPath, nextLanguage)
		goto(localizedPath)
	}
</script>

<div>
	<button onclick={() => switchToLanguage()}>en</button>
</div>
