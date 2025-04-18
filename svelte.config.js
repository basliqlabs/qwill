import { mdsvex, escapeSvelte } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sectionize from 'remark-sectionize'
import rehypeSlug from 'rehype-slug'
import { createHighlighter } from 'shiki'
import toc from '@jsdevtools/rehype-toc'
import rehypeHighlightLines from 'rehype-highlight-code-lines'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'

const highlightTheme = 'night-owl'
const highlightedLanguages = [
  'javascript',
  'typescript',
  'tsx',
  'go',
  'java',
  'html',
  'css',
  'python',
  'json',
  'yaml'
]
const highlighter = await createHighlighter({
  themes: [highlightTheme],
  langs: highlightedLanguages
})
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  rehypePlugins: [
    rehypeSlug,
    [toc, { headings: ['h2'] }],
    rehypeHighlightLines,
    [rehypeAutolinkHeadings, { behavior: 'append' }]
  ],
  remarkPlugins: [sectionize],
  highlight: {
    highlighter: async (code, lang = 'text', metastring) => {
      const html = setupHighlighter(code, lang, metastring)
      return `{@html \`${html}\` }`
    }
  }
}

function getProcess() {
  return process.argv.includes('dev') ? '/experiences' : '/experiences'
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
      base: getProcess()
    },
    prerender: {
      handleHttpError: 'ignore'
    }
  },
  extensions: ['.svelte', '.md']
}

export default config

function setupHighlighter(code, lang, metastring) {
  const fileNameKey = 'fileName'
  const terminalKey = 'terminal'
  const extIcon = {
    c: '/icons/icons8-c.svg',
    cpp: '/icons/icons8-cpp.svg',
    cs: '/icons/icons8-cs.svg',
    lua: '/icons/icons8-lua.svg',
    rs: '/icons/icons8-rust.svg',
    rb: '/icons/icons8-ruby.svg',
    sh: '/icons/icons8-bash.svg',
    svelte: '/icons/svelte.svg',
    php: '/icons/php.svg',
    dart: '/icons/icons8-dart.svg',
    kt: '/icons/icons8-kotlin.svg',
    sql: '/icons/icons8-postgresql.svg',
    swift: '/icons/icons8-swift.svg',
    js: '/icons/icons8-javascript.svg',
    ts: '/icons/icons8-typescript.svg',
    tsx: '/icons/icons8-react.svg',
    go: '/icons/icons8-golang.svg',
    java: '/icons/icons8-java.svg',
    py: '/icons/icons8-python.svg',
    file: '/icons/icons8-doc-edited.svg'
  }

  const meta = getMeta(metastring)
  const lineNumbers = getLines(code, meta)
  let html = getHtml(highlighter, code, lang, highlightTheme)
  html = addLineNumbersToHtml(html, lineNumbers)
  html = addFileNameToHtml(html, meta)
  html = addTerminalHeader(html, meta)
  html = highlightTerminal(html, code, meta)
  html = addCopyButton(html, code)
  return escapeSvelte(html)

  function getMeta(meta) {
    let fileName = ''
    let icon = ''
    let terminal = false

    if (meta) {
      const metaParts = meta.split(' ')
      for (const m of metaParts) {
        if (!m) continue

        if (m === terminalKey) terminal = true

        if (m.startsWith(fileNameKey)) {
          fileName = m.substring(10, m.length - 1)
          const ext = fileName.split('.').at(-1)
          icon = extIcon[ext] || extIcon['file']
        }
      }
    }

    return { fileName, icon, terminal }
  }

  function getHtml(highlighter, code, lang, theme) {
    return escapeSvelte(
      highlighter.codeToHtml(code, {
        lang,
        theme,
        transformers: [
          transformerNotationHighlight({ matchAlgorithm: 'v3' }),
          transformerNotationErrorLevel({ matchAlgorithm: 'v3' }),
          transformerNotationDiff({ matchAlgorithm: 'v3' }),
          transformerNotationWordHighlight({ matchAlgorithm: 'v3' }),
          transformerColorizedBrackets()
        ]
      })
    )
  }

  function getLines(code, meta) {
    const lines = code.split('\n')
    return lines
      .map((line, i) => {
        if (meta.terminal) return `<span class="line-number bash-dollar-sign">$</span>`
        if (line.includes('[!code --]')) return '<span class="line-number diff remove">-</span>'
        if (line.includes('[!code ++]')) return '<span class="line-number diff add">+</span>'
        return `<span class="line-number">${i + 1}</span>`
      })
      .join('\n')
  }

  function addLineNumbersToHtml(html, lineNumbers) {
    return html
      .replace('<pre class="shiki', `<pre class="shiki line-numbers`)
      .replace(
        '<code>',
        `<div class="content"><span class="line-numbers-rows">${lineNumbers}</span><code>`
      )
      .replace('</code>', '</code></div>')
  }

  function addFileNameToHtml(html, meta) {
    if (meta.terminal) return html
    if (meta.fileName) {
      return html.replace('<pre class="shiki', '<pre class="shiki file-name').replace(
        '<div class="content"',
        `<div class='code-block-file-name'>
                        <img class="file-name-icon" alt="Downloaded from Icons8" src="${getProcess()}${meta.icon}" />
                        <span class="file-name-text">${meta.fileName}</span>
                </div><div class="content"`
      )
    }
    return html
  }

  function addTerminalHeader(html, meta) {
    if (meta.terminal) {
      return html.replace('<pre class="shiki', '<pre class="shiki terminal').replace(
        '<div class="content"',
        `<div class='code-block-terminal'>
                        <div class="terminal-ui"><div class="terminal-ui-btn-1"></div><div class="terminal-ui-btn-2"></div><div class="terminal-ui-btn-3"></div></div>
                        <div class="terminal-name">
                        <img class="terminal-icon" alt="Downloaded from Icons8" src="${getProcess()}/icons/icons8-bash.svg"     />
                        <span class="terminal-text">terminal</span></div>
                </div><div class="content"`
      )
    }
    return html
  }

  function highlightTerminal(html, code, meta) {
    if (meta && meta.terminal) {
      const lines = code.split('\n')
      const newCode = []
      for (const line of lines) {
        const tokens = line.split(' ')
        let newLine = []
        tokens.forEach((token, i) => {
          if (i === 0) {
            newLine.push(`<span style="color:#C792EA">${token}</span>`)
          } else if (i !== 0 && token.startsWith('-')) {
            newLine.push(`<span style="color:#637777">${token}</span>`)
          } else {
            newLine.push(token)
          }
        })
        newCode.push(newLine.join(' '))
      }

      const start = html.indexOf('<span class="line"')
      const end = html.indexOf('</code>')

      html = html.substring(0, start) + html.substring(end, html.length)

      const newHtml = newCode.join(`<span class="line">${code}</span>\n`)
      html = html.replace('<code>', `<code>${newHtml}`)
      return html
    }

    return html
  }

  function escapeHtml(html) {
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  function addCopyButton(html, code) {
    html = html.replace(
      '</pre>',
      `<button data-code="${escapeHtml(code)}" class="copy-code">copy</button>`
    )
    return html
  }
}
