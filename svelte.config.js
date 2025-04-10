import {mdsvex, escapeSvelte} from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import sectionize from 'remark-sectionize'
import rehypeSlug from 'rehype-slug'
import {createHighlighter} from 'shiki'
import toc from '@jsdevtools/rehype-toc'
import rehypeHighlightLines from "rehype-highlight-code-lines";
import {
    transformerCompactLineOptions, transformerMetaWordHighlight, transformerNotationDiff,
    transformerNotationErrorLevel,
    transformerNotationHighlight, transformerNotationWordHighlight
} from "@shikijs/transformers";
import {transformerColorizedBrackets} from "@shikijs/colorized-brackets";

const highlightTheme = 'night-owl'
const highlightedLanguages = ['javascript', 'typescript', 'tsx', 'go', 'html', 'css', 'python', 'json', 'yaml']
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
        highlighter: async (code, lang = 'text', metastring) => {


            let html = escapeSvelte(highlighter.codeToHtml(code, {
                    lang,
                    theme: highlightTheme,
                    lineNumbers: true,
                    transformers: [
                        transformerNotationHighlight({matchAlgorithm: 'v3'}),
                        transformerNotationErrorLevel({matchAlgorithm: 'v3'}),
                        transformerNotationDiff({matchAlgorithm: 'v3'}),
                        transformerNotationWordHighlight({matchAlgorithm: 'v3'}),
                        transformerColorizedBrackets(),
                    ],
                }
            ))

            let fileName = ""
            let icon = ''
            if (metastring) {
                const meta = metastring.split(" ")
                for (const m of meta) {
                    if (m.startsWith("fileName")) {
                        fileName = m.substring(10, m.length - 1)
                        const ext = fileName.split(".").at(-1)
                        if (ext === "js") icon = '<img class="file-name-icon" src="/icons/icons8-javascript.svg" alt=""/>'
                        if (ext === "ts") icon = '<img class="file-name-icon" src="/icons/icons8-typescript.svg" alt=""/>'
                        if (ext === "tsx") icon = '<img class="file-name-icon" src="/icons/icons8-react.svg" alt=""/>'
                        if (ext === "go") icon = '<img class="file-name-icon" src="/icons/icons8-golang.svg" alt=""/>'
                        if (ext === "java") icon = '<img class="file-name-icon" src="/icons/icons8-java.svg" alt=""/>'
                        if (ext === "py") icon = '<img class="file-name-icon" src="/icons/icons8-python.svg" alt=""/>'
                    }
                }
            }


            const lines = code.split('\n')
            const lineNumbers = lines.map((line, i) => {
                if (line.includes("[!code --]")) return '<span class="line-number diff remove">-</span>'
                if (line.includes("[!code ++]")) return '<span class="line-number diff add">+</span>'

                return `<span class="line-number">${i + 1}</span>`
            }).join('\n')

            html = html.replace('<pre class="shiki', `<pre class="shiki line-numbers`)
                .replace('<code>', `<div class="content"><span class="line-numbers-rows">${lineNumbers}</span><code>`)
                .replace('</code></div>')

            if (fileName) {
                html = html.replace('<pre class="shiki', '<pre class="shiki file-name')
                    .replace('<div class="content"', `<div class='code-block-file-name'>${icon}<span class="file-name-text">${fileName}</span></div><div class="content"`)
            }

            return `{@html \`${html}\` }`
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
