import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

export function rehypeFigure(option) {
  const className = (option && option.className) || 'rehype-figure'

  function buildFigure({ properties }) {
    const figure = h('figure', { class: className }, [
      h('img', { ...properties }),
      properties.alt && properties.alt.trim().length > 0 ? h('figcaption', properties.alt) : ''
    ])
    return figure
  }

  return function (tree) {
    visit(tree, { tagName: 'p' }, (node, index, parent) => {
      const images = node.children.filter((n) => n.tagName === 'img').map((img) => buildFigure(img))

      if (images.length === 0) return

      parent.children[index] =
        images.length === 1
          ? images[0]
          : (parent.children[index] = h('div', { class: `${className}-container` }, images))
    })
  }
}
