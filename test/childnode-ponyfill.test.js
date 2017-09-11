import test from 'ava'
import {before, after, replaceWith, remove} from '../lib/childnode-ponyfill'

test.beforeEach(t => {
	document.body.innerHTML = ''
})

test('before', t => {
	document.body.innerHTML = 'preset'
	const target = document.createElement('div')
	target.id = 'target'
	document.body.appendChild(target)
	before(target, 'prepend1', '<span>prepend2</span>', document.createElement('p'))
	t.is(document.body.innerHTML, 'presetprepend1<span>prepend2</span><p></p><div id="target"></div>')
})

test('after', t => {
	document.body.innerHTML = 'preset'
	const target = document.createElement('div')
	target.id = 'target'
	document.body.insertBefore(target, document.body.firstChild)
	after(target, '<span>after</span>')
	t.is(document.body.innerHTML, '<div id="target"></div><span>after</span>preset')
})

test('replaceWith', t => {
	const div = document.createElement('div')
	document.body.appendChild(div)
	replaceWith(div, 'header', '<span>body</span>', 'footer')
	t.is(document.body.innerHTML, 'header<span>body</span>footer')
})

test('remove', t => {
	const div = document.createElement('div')
	document.body.appendChild(div)
	remove(div)
	t.is(document.body.innerHTML, '')
})
