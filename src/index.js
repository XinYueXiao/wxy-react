import React from './wxyReact'
import ReactDOM from './wxyReact/reactDom'

import './index.css'
//class处理
class ClassCom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    changeCouter = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    render() {
        return (
            <div>
                {/* <button onClick={this.changeCouter}>{this.state.counter}</button> */}
                {this.props.name}
            </div>
        );
    }
}
//函数处理
function FuncCom(props) {
    return <div >{props.name}</div>
}
const jsx = (<div className="dom">
    <div className='dd'>我是div组件</div>
    <FuncCom name='function组件' />
    <ClassCom name='class组件' />

</div>)

ReactDOM.render(jsx, document.getElementById('root'));

