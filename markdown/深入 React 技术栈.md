函数式编程：

- 将 DOM 变成纯函数
- **immutability**
- 单向数据流

React 中创建的虚拟元素有两类，DOM 元素和组件元素，分别对应原生 DOM 元素和自定义元素，它们都可以用 JSON 对象表示出来。

```html
<button class="btn">
  <em>tips</em>
</button>
```

可以转换成：

```json
{
  "type": "button",
  "props": {
    "className": "btn",
    "children": {
      "type": "em",
      "props": {
        "children": "tips"
      }
    }
  }
}
```

封装上述元素构建按钮的公共方法：

```jsx
const Button => ({text}) {
  return {
      type: 'button',
      props: {
        className: 'btn',
        children: {
          type: 'em',
          props: {
            children: text
          }
        }
      }
    }
}
```

## 组件生命周期

一个组件是一个状态机，相同输入返回相同输出。

组件生命周期三部分：实例化，存在期和销毁时。

组件加载时：

- getDefaultProps（只执行一次）
- getInitialState（只执行一次）
- componentWillMount（只执行一次，允许 this.setState）
- render
- componentDidMount（只执行一次，允许 this.setState，服务端无此阶段。组件已生成 DOM，可执行 AJAX/setState/setInterval 等操作。）

组件更新时：

- componentWillReceiveProps(object nextProps)（组件接收新 prop 时执行，即父组件 render 时将触发子组件的此阶段。当前 props 为 this.props，此阶段调用 this.setState 不会增加一次新的 render）
- boolean shouldComponentUpdate(object nextProps, object nextState)（其它阶段执行 this.setState 会调用此阶段来判断是否需要重新渲染组件。返回布尔值，默认为 true，即渲染。若为 false，则以下三个阶段都不执行。）
- componentWillUpdate(object nextProps, object nextState)（该函数执行后，nextProps => this.props，此阶段不能执行 this.setState。SCU 返回 true 或 forceUpdate 之后调用此阶段）
- render（this.props）
- componentDidUpdate(object prevProps, object prevState)（组件更新后执行，包括 componentDidMount 和 render 结束之后。例如清除 notification 文字等，this.props => prevProps）

组件卸载时：

- componentWillUnmount（只执行一次，清除 componentDidMount 设置的定时器等）

允许使用 this.setState 的阶段：componentWillMount / componentDidMount / componentWillReceiveProps。

触发 render 的 4 条路径：

- 首次渲染
- 调用 this.setState
- 父组件发生更新（不管 props 有没有改变或父子组件有没有通信）
- 调用 forceUpdate
