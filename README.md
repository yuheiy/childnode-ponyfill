# ChildNode ponyfill

[`ChildNode`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode) ponyfill.

## Install

```bash
npm i @yuheiy/childnode-ponyfill
```

## Usage

```javascript
import {replaceWith} from '@yuheiy/childnode-ponyfill'
const oldElement = document.getElementById('#old')
const newElement = document.createElement('div')
replaceWith(oldElement, newElement)
```

## API

### before(childNode, ...nodes)

Same API with [`ChildNode.before()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before)

### after(childNode, ...nodes)

Same API with [`ChildNode.after()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after)

### replaceWith(childNode, ...nodes)

Same API with [`ChildNode.replaceWith()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith)

### remove(childNode)

Same API with [`ChildNode.remove()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)

## License

MIT
