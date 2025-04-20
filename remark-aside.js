import { visit } from 'unist-util-visit'
import { u } from 'unist-builder'

export function remarkAside(options) {
  return function transformer(tree) {
    visit(
      tree,
      (node) => node.type === 'paragraph',
      function visitor(node, index, parent) {
        if (
          node.children.length === 1 &&
          node.children[0] &&
          node.children[0].value &&
          typeof node.children[0].value === 'string' &&
          node.children[0].value.trim().startsWith(':::')
        ) {
          if (
            node.children[0].value.trim().length > 6 &&
            node.children[0].value.trim().startsWith(':::') &&
            node.children[0].value.trim().endsWith(':::')
          ) {
            parent.children[index] = u('aside', { class: 'side-note', data: { hName: 'aside' } }, [
              u(
                'text',
                node.children[0].value.trim().substring(3, node.children[0].value.trim().length - 3)
              )
            ])
            return
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

          if (!nextIndex) return

          const nodes = []
          for (let i = index + 1; i < nextIndex; i++) {
            nodes.push(parent.children[i])
          }

          parent.children[index] = u(
            'aside',
            { class: 'side-note', data: { hName: 'aside' } },
            nodes
          )
          for (let i = index + 1; i <= nextIndex; i++) {
            parent.children[i] = u('div', { data: { hName: 'div', class: 'display-none' } }, [])
          }
          return
        }

        if (node.children.length >= 2) {
          let counter = 0
          let index = 0

          for (let i = 0; i < node.children.length; i++) {
            const el = node.children[i]
            console.log('el', el)
            if (typeof el.value === 'string' && el.type === 'text' && el.value.includes(':::')) {
              counter++

              if (counter === 2) {
                index = i
                break
              }
            }
          }

          if (counter !== 2) return

          console.log('NODE', node)
          console.log('brrrrrrrrr')

          if (counter === 2) {
            const nodes = []
            for (let i = 1; i <= index; i++) {
              if (i === index) {
                nodes.push(
                  u('text', node.children[i].value.substring(0, node.children[i].value.length - 3))
                )
                continue
              }
              nodes.push(node.children[i])
            }
            parent.children[index] = u(
              'aside',
              { data: { hName: 'aside', class: 'side-note' } },
              nodes
            )
          }
        }
      }
    )
  }
}
