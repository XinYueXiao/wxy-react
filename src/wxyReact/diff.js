
import { initVnode } from './virtual-dom'
//假的diff,2019/12/05/更新
export function diff(cache, newVnode) {
    const { vnode, parentNode, node } = cache
    const newNode = initVnode(newVnode, parentNode)
    parentNode.replaceChild(newNode, node)
    return newNode
}