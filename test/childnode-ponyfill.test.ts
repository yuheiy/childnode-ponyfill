import * as assert from 'assert'
import Window = require('window')
import * as ChildNode from '../src/childnode-ponyfill'

declare global {
  namespace NodeJS {
    interface Global {
      window: any
      document: any
      Node: any
      Element: any
      DocumentType: any
      CharacterData: any
    }
  }
}

const window: any = new Window()
const {document, Node, Element, DocumentType, CharacterData} = window
global.window = window
global.document = document
global.Node = Node
global.Element = Element
global.DocumentType = DocumentType
global.CharacterData = CharacterData
Element.prototype.before = undefined
Element.prototype.after = undefined
Element.prototype.replaceWith = undefined
Element.prototype.remove = undefined

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('before', () => {
  it('should insert nodes before childNode', () => {
    document.body.innerHTML = 'text'
    const el = document.createElement('div')
    document.body.appendChild(el)
    ChildNode.before(el, '<span></span>', 'before')
    assert.strictEqual(document.body.innerHTML, 'text&lt;span&gt;&lt;/span&gt;before<div></div>')
  })

  it('should throw an error if first argument is not childNode', () => {
    const block = () => ChildNode.before({} as Element)
    assert.throws(block, /^TypeError: childNode must be an instance of Element, DocumentType or CharacterData$/)
  })

  it('should do nothing if its parent does not exist', () => {
    const el = document.createElement('div')
    const snapshot = el.outerHTML
    ChildNode.before(el)
    assert.strictEqual(snapshot, el.outerHTML)
  })
})

describe('after', () => {
  it('should insert nodes after childNode', () => {
    document.body.innerHTML = 'text'
    const el = document.createElement('div')
    document.body.insertBefore(el, document.body.firstChild)
    ChildNode.after(el, '<span></span>', 'after')
    assert.strictEqual(document.body.innerHTML, '<div></div>&lt;span&gt;&lt;/span&gt;aftertext')
  })

  it('should do nothing if its parent does not exist', () => {
    const el = document.createElement('div')
    const snapshot = el.outerHTML
    ChildNode.after(el)
    assert.strictEqual(snapshot, el.outerHTML)
  })
})

describe('replaceWith', () => {
  it('should replace childNode with nodes', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    ChildNode.replaceWith(el, 'r', 'eplaced')
    assert.strictEqual(document.body.innerHTML, 'replaced')
  })

  it('should do nothing if its parent does not exist', () => {
    const el = document.createElement('div')
    const snapshot = el.outerHTML
    ChildNode.replaceWith(el)
    assert.strictEqual(snapshot, el.outerHTML)
  })
})

describe('remove', () => {
  it('should remove childNode', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    ChildNode.remove(el)
    assert.strictEqual(document.body.innerHTML, '')
  })

  it('should do nothing if its parent does not exist', () => {
    const el = document.createElement('div')
    const snapshot = el.outerHTML
    ChildNode.remove(el)
    assert.strictEqual(snapshot, el.outerHTML)
  })
})
