import { Children } from "react";

//虚拟dom处理成真实dom
export function initVnode(vnode, container) {
    let node = null;
    const { vtype } = vnode
    if (!vtype) {
        //文本
        node = initTexNode(vnode, container);
    }
    if (vtype === 1) {
        //原生标签
        node = initHtmlNode(vnode, container);
    }
    if (vtype === 2) {
        //类组件
        node = initClassNode(vnode, container)
    }
    if (vtype === 3) {
        //函数组件
        node = initFunctionNode(vnode, container)
    }
    return node
}
function initTexNode(vnode, container) {
    console.log("TCL: initTexNode -> vnode", vnode)
    const node = document.createTextNode(vnode)
    return node
}
function initHtmlNode(vnode, container) {
    const { type, props } = vnode
    const { children, ...rest } = props
    const node = document.createElement(type)
    props.children.map(item => {
        node.appendChild(initVnode(item, node))
    })
    //添加标签属性
    Object.keys(rest).map(key => {
        if (key === 'className') {
            node.setAttribute('class', rest[key])
        } else if (key.slice(0, 2) === 'on') {
            //假设是点击事件
            node.addEventListener('click', rest[key])
        }
    })
    return node
}
function initFunctionNode(vnode, container) {
    const { type, props } = vnode
    //函数的虚拟dom,执行函数后返回node
    const vfnode = type(props)
    /* 真实node，此处为什么没有直接返回vfnode，
     * 而是再次调用了initVnode呢?由于函数内存在文本，
     * 原生标签、嵌套等，需要进行递归处理
     */
    return initVnode(vfnode, container)
}
//把class变成node
function initClassNode(vnode, container) {
    const { type, props } = vnode
    const cmp = new type(props)
    const vcnode = cmp.render()
    /* 真实node，此处为什么没有直接返回vcnode，
     * 而是再次调用了initVnode呢?由于函数内存在文本，
     * 原生标签、嵌套等，需要进行递归处理
     */
    const node = initVnode(vcnode, container)
    let cache = {
        vnode: vcnode,//当前的虚拟dom节点，用于diff
        node,//真实dom的节点，用于最后的替换
        parentNode: container
    }
    cmp.$cache = cache
    return node
}