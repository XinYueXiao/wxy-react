import { initVnode } from './virtual-dom'
function render(vnode, container) {
    console.log("TCL: render -> vnode", vnode)
    const node = initVnode(vnode, container)
    //把真实的dom节点放到container里面去
    container.appendChild(node)


}
const ReactDOM = { render }
export default {
    ReactDOM,
    render
}