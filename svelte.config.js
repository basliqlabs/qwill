import {mdsvex, escapeSvelte} from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import sectionize from 'remark-sectionize'
import rehypeSlug from 'rehype-slug'
import {createHighlighter} from 'shiki'
import toc from '@jsdevtools/rehype-toc'
import rehypeHighlightLines from "rehype-highlight-code-lines";
import {
    transformerCompactLineOptions,
    transformerNotationErrorLevel,
    transformerNotationHighlight
} from "@shikijs/transformers";
import {transformerColorizedBrackets} from "@shikijs/colorized-brackets";

const highlightTheme = 'night-owl'
const highlightedLanguages = ['javascript', 'typescript', 'go', 'html', 'css', 'python', 'json', 'yaml']
const highlighter = await createHighlighter({
    themes: [highlightTheme],
    langs: highlightedLanguages,
})

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
    extensions: ['.md'],
    rehypePlugins: [rehypeSlug, [toc, {headings: ['h2']}], rehypeHighlightLines],
    remarkPlugins: [sectionize],
    highlight: {
        highlighter: async (code, lang = 'text') => {


            const html = escapeSvelte(highlighter.codeToHtml(code, {
                    lang,
                    theme: highlightTheme,
                    lineNumbers: true,
                    transformers: [
                        transformerNotationHighlight(),
                        transformerColorizedBrackets(),
                        transformerNotationErrorLevel(),
                    ],
                }
            ))

            const lines = code.split('\n')
            const lineNumbers = lines.map((_, i) => `<span class="line-number">${i + 1}</span>`).join('\n')

            const lineHtml = html.replace('<pre class="shiki', `<pre class="shiki line-numbers`)
                .replace('<code>', `<span class="line-numbers-rows">${lineNumbers}</span><code>`)

            return `{@html \`${lineHtml}\` }`
        }
    },
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

    kit: {
        adapter: adapter({
            fallback: '404.html'
        }),
        alias: {
            'content/*': 'src/content/*'
        },
        paths: {
            base: process.argv.includes('dev') ? '' : ''
        },
        prerender: {
            handleHttpError: 'ignore'
        }
    },

    extensions: ['.svelte', '.md']
}

export default config
