import { visit } from 'unist-util-visit'
import { getBasePath } from './utils.js'

export function rehypeImageSrc(option) {
  return function (tree) {
    visit(tree, {}, (node) => {
      if (node.type === 'raw' && node.value && node.value.startsWith('<img ')) {
        node.value = node.value.replace(/(src=')|(src=")/, `$&${getBasePath()}`)
      }

      if (node.tagName === 'img') {
        const src = node.properties.src
        node.properties.src = src.startsWith('/') ? getBasePath() + src : src
      }
    })
  }
}
