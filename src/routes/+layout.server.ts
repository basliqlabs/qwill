import {i18n} from "$lib/i18n";

export const load = async ({url}) => {
  return {
    language: i18n.getLanguageFromUrl(url),
    direction: i18n.config.textDirection[i18n.getLanguageFromUrl(url)]
  };
};
