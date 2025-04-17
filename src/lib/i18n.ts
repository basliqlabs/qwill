import * as runtime from '$lib/paraglide/runtime'
import { createI18n } from '@inlang/paraglide-sveltekit'
export const i18n = createI18n(runtime)

export function getLanguage(url: URL) {
  return i18n.getLanguageFromUrl(new URL(url))
}
