import * as assert from 'assert'
import Window = require('window')
import {before as childNodeBefore, after as childNodeAfter, replaceWith, remove} from '../src/childnode-ponyfill'

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
    const div = document.createElement('div')
    document.body.appendChild(div)
    childNodeBefore(div, '<span></span>', 'before')
    assert.strictEqual(document.body.innerHTML, 'text&lt;span&gt;&lt;/span&gt;before<div></div>')
  })
})

describe('after', () => {
  it('should insert nodes after childNode', () => {
    document.body.innerHTML = 'text'
    const div = document.createElement('div')
    document.body.insertBefore(div, document.body.firstChild)
    childNodeAfter(div, '<span></span>', 'after')
    assert.strictEqual(document.body.innerHTML, '<div></div>&lt;span&gt;&lt;/span&gt;aftertext')
  })
})

describe('replaceWith', () => {
  it('should replace childNode with nodes', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    replaceWith(div, 'r', 'eplaced')
    assert.strictEqual(document.body.innerHTML, 'replaced')
  })
})

describe('remove', () => {
  it('should remove childNode', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    remove(div)
    assert.strictEqual(document.body.innerHTML, '')
  })
})
