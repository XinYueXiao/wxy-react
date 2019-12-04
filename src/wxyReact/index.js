
import { diff } from './diff'
/*通过babel-loader编译把jsx处理成
createElement函数,此函数接收三个参数
*/
function createElement(type, props, ...children) {
    console.log("TCL: createElement -> props", props)
    //返回虚拟dom
    //构建一个树状图，从父元素获取子元素,添加childern属性
    props.children = children //把vnode变成node
    //根据type不同，区分处理方式
    let vtype;
    if (typeof type === 'string') {
        //原生标签<div></div><p></p>
        vtype = 1
    } else if (typeof type === 'function') {
        //class或者function组件
        vtype = type.isReactComponent ? 2 : 3
    }
    return {
        type, props, vtype
    }
}
//class组件
class Component {
    //区分是否是class组件
    static isReactComponent = {}
    constructor(props) {
        this.props = props
        this.$cache = {}//存储父节点
        this.state = {}
    }
    setState = (nextState, callback) => {
        //真实的setState是一个批量处理，异步
        //此处是暂时的同步操作,2019/12/05/更新
        this.state = {
            ...this.state,
            ...nextState
        }
        this.fouceUpdate()
    }
    //强制刷新
    fouceUpdate = () => {
        const { $cache: cache } = this
        const newVnode = this.render()
        const newNode = diff(cache, newVnode)//newnode->node,最终更新到container
        //每次更新vnode,node
        this.$cache = {
            ...cache,
            vnode: newNode,
            node: newNode
        }
    }
}

const React = { createElement, Component }

export default React