type ImplementsOfChildNode = Element | DocumentType | CharacterData
type ChildNodeMethodName = 'before' | 'after' | 'replaceWith' | 'remove'
type Nodes = Array<string | Node>

const find = <T>(arr: Array<T>, predicate: (item: T, idx: number, arr: Array<T>) => boolean): T | void => {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i]
    }
  }
}

const getNativeMethod = (childNode: ImplementsOfChildNode, methodName: ChildNodeMethodName): (() => void) | void => {
  const Implement = find<typeof Element | typeof DocumentType | typeof CharacterData>(
    [Element, DocumentType, CharacterData],
    (Impl) => childNode instanceof Impl,
  )
  if (!Implement) {
    throw new TypeError('childNode must be an instance of Element, DocumentType or CharacterData')
  }
  if (typeof (Implement as any).prototype[methodName] === 'function') {
    return (childNode as any)[methodName]
  }
}

const createDocumentFragmentFromNodes = (...nodes: /*Nodes*/Array<any>): DocumentFragment => {
  return nodes.reduce((frag, nodeOrDomString) => {
    const isNode = nodeOrDomString instanceof Node
    const node = isNode ? nodeOrDomString : document.createTextNode(String(nodeOrDomString))
    frag.appendChild(node)
    return frag
  }, document.createDocumentFragment())
}

export const before = (childNode: ImplementsOfChildNode, ...nodes: Nodes) => {
  const nativeBefore = getNativeMethod(childNode, 'before')
  if (nativeBefore) {
    return nativeBefore(...nodes)
  }

  if (childNode.parentNode) {
    const frag = createDocumentFragmentFromNodes(...nodes)
    ;(childNode as any).parentNode.insertBefore(frag, childNode)  
  }
}

export const after = (childNode: ImplementsOfChildNode, ...nodes: Nodes) => {
  const nativeAfter = getNativeMethod(childNode, 'after')
  if (nativeAfter) {
    return nativeAfter(...nodes)
  }

  if (childNode.parentNode) {
    const frag = createDocumentFragmentFromNodes(...nodes)
    ;(childNode as any).parentNode.insertBefore(frag, childNode.nextSibling)  
  }
}

export const replaceWith = (childNode: ImplementsOfChildNode, ...nodes: Nodes) => {
  const nativeReplaceWith = getNativeMethod(childNode, 'replaceWith')
  if (nativeReplaceWith) {
    return nativeReplaceWith(...nodes)
  }

  if (childNode.parentNode) {
    const frag = createDocumentFragmentFromNodes(...nodes)
    childNode.parentNode.replaceChild(frag, childNode)
  }
}

export const remove = (childNode: ImplementsOfChildNode) => {
  const nativeRemove = getNativeMethod(childNode, 'remove')
  if (nativeRemove) {
    return nativeRemove()
  }

  if (childNode.parentNode) {
    childNode.parentNode.removeChild(childNode)
  }
}
