import { initVnode } from './virtual-dom'//虚拟dom处理成真实dom
function render(vnode, container) {
    /*vnode是什么？jsx通过babel-loader编译后
    会执行src/wxyReact/index.js的createElement方法
    而此处的vnode则是返回值则包含{type, props, vtype}
    这三个参数，根据这个三个参数把虚拟dom处理成真实dom
    */
    const node = initVnode(vnode, container)
    //把真实的dom节点放到container里面去
    container.appendChild(node)
}
const ReactDOM = { render }
export default ReactDOM