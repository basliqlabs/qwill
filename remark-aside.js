import { visit } from 'unist-util-visit'
import { u } from 'unist-builder'

export function remarkAside(options) {
  return function transformer(tree) {
    visit(
      tree,
      (node) => node.type === 'paragraph',
      function visitor(node, index, parent) {
        if (
          node.children.length !== 1 ||
          !node.children[0] ||
          !node.children[0].value ||
          typeof node.children[0].value !== 'string' ||
          node.children[0].value.trim() !== ':::'
        ) {
          return node
        }

        let nextIndex
        parent.children.find((el, i) => {
          if (
            i > index &&
            el &&
            el.type === 'paragraph' &&
            el.children.length === 1 &&
            el.children[0] &&
            typeof el.children[0].value === 'string' &&
            el.children[0].value.trim() === ':::'
          ) {
            nextIndex = i
          }
        })

        if (!nextIndex) return node

        const nodes = []
        for (let i = index + 1; i < nextIndex; i++) {
          nodes.push(parent.children[i])
        }

        parent.children[index] = u('aside', { class: 'side-note', data: { hName: 'aside' } }, nodes)
        for (let i = index + 1; i <= nextIndex; i++) {
          parent.children[i] = u('ins', { data: { hName: 'ins' }, style: 'display: none' }, [])
        }
      }
    )
  }
}
