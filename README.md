# ChildNode ponyfill

[`ChildNode`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode) ponyfill.

## Install

```bash
npm i @yuheiy/childnode-ponyfill
```

## Usage

```javascript
import {replaceWith} from '@yuheiy/childnode-ponyfill'
const oldElement = document.querySelector('#old')
const newElement = document.createElement('div')
replaceWith(oldElement, newElement)
```

## API

### before(childNode, ...nodes)

```typescript
export declare const before: (childNode: Element | CharacterData | DocumentType, ...nodes: (string | Node)[]) => void;
```

Same API with [`ChildNode.before()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before).

### after(childNode, ...nodes)

```typescript
export declare const after: (childNode: Element | CharacterData | DocumentType, ...nodes: (string | Node)[]) => void;
```

Same API with [`ChildNode.after()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after).

### replaceWith(childNode, ...nodes)

```typescript
export declare const replaceWith: (childNode: Element | CharacterData | DocumentType, ...nodes: (string | Node)[]) => void;
```

Same API with [`ChildNode.replaceWith()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith).

### remove(childNode)

```typescript
export declare const remove: (childNode: Element | CharacterData | DocumentType, ...nodes: (string | Node)[]) => void;
```

Same API with [`ChildNode.remove()`](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove).

## License

MIT
