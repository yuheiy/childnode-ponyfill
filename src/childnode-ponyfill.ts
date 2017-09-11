type ImplementsOfChildNode = Element | DocumentType | CharacterData
type nodes = Array<string | Node>

const find = <T>(arr: Array<T>, predicate: (item: T, idx: number, arr: Array<T>) => boolean): T | void => {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i]
    }
  }
}

const makePonyfill = (methodName: string, method: (childNode: ImplementsOfChildNode, ...nodes: nodes) => void) => {
  return (childNode: ImplementsOfChildNode, ...nodes: nodes): void => {
    const Implement = find([Element, DocumentType, CharacterData], (Impl) => childNode instanceof Impl)
    if (!Implement) {
      throw new TypeError('childNode must be Element, DocumentType or CharacterData')
    }
    if (typeof (Implement as any).prototype[methodName] === 'function') {
      return (childNode as any)[methodName](...nodes)
    }
    return method(childNode, ...nodes)
  }
}

const createDocumentFragmentFromNodes = (...nodes: /*nodes*/Array<any>): DocumentFragment => {
  return nodes.reduce((frag, node) => {
    if (typeof node === 'string') {
      const parser = document.createElement('div')
      parser.innerHTML = node
      while (parser.firstChild) {
        frag.appendChild(parser.firstChild)
      }
    } else {
      frag.appendChild(node)
    }
    return frag
  }, document.createDocumentFragment())
}

export const before = makePonyfill('before', (childNode: ImplementsOfChildNode, ...nodes: nodes) => {
  const frag = createDocumentFragmentFromNodes(...nodes)
  ;(childNode as any).parentNode.insertBefore(frag, childNode)
})

export const after = makePonyfill('after', (childNode: ImplementsOfChildNode, ...nodes: nodes) => {
  const frag = createDocumentFragmentFromNodes(...nodes)
  ;(childNode as any).parentNode.insertBefore(frag, childNode.nextSibling)
})

export const replaceWith = makePonyfill('replaceWith', (childNode: ImplementsOfChildNode, ...nodes: nodes) => {
  if (childNode.parentNode) {
    const frag = createDocumentFragmentFromNodes(...nodes)
    childNode.parentNode.replaceChild(frag, childNode)
  }
})

export const remove = makePonyfill('remove', (childNode: ImplementsOfChildNode) => {
  if (childNode.parentNode) {
    childNode.parentNode.removeChild(childNode)
  }
})
