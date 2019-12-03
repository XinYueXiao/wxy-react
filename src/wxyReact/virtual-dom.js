import { Children } from "react";

//把vnode变成node
export function initVnode(vnode, container) {
    //查看vode解构区分节点渲染方式
    let node = null;
    const { vtype } = vnode
    if (!vtype) {
        node = initTexNode(vnode, container);
    }
    if (vtype === 1) {
        //原生标签
        node = initHtmlNode(vnode, container);
    }
    if (vtype === 2) {
        node = initClassNode(vnode, container)
    }
    if (vtype === 3) {
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
    //函数的虚拟dom
    const vfnode = type(props)
    //真实node
    return initVnode(vfnode, container)
}
//把class变成node
function initClassNode(vnode, container) {
    const { type, props } = vnode
    const cmp = new type(props)
    const vcnode = cmp.render()
    const node = initVnode(vcnode, container)
    let cache = {
        vnode: vcnode,//当前的虚拟dom节点，用于diff
        node,//真实dom的节点，用于最后的替换
        parentNode: container
    }
    cmp.$cache = cache
    return node
}