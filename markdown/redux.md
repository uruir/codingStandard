## 安装

```
npm i -g react-native-cli
react-native init ReduxDemo
cd ReduxDemo
npm install
npm i -S redux react-redux
npm i -D redux-devtools
react-native run-android
```

## Redux 三大原则

### 单一数据源

整个应用的 state 被存储于一棵对象树中，即 store。

`let store = createStore(combinedReduer, stateFromServer)`

### state 只读

惟一改变 state 的方法是触发 action，action 是一个对象，用于描述发生了什么。比如点击事件或是处理服务器返回的数据。

一般来说，通过 store.dispatch(actionObject) 将 action 传到 store。

### 使用纯函数进行修改

`reducer = (state, action) => state`

## Reducer

```
import {combineReducers} from 'redux'

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {text: action.text, complete: false}]
        case 'COMPLETE_TODO':
            return state.map((todo, index) => index === action.index ? {...todo, complete: true} : todo)
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos,
    bReducer,
})

export default todoApp
```

## Store

### 创建 Store

```
import {createStore} from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)
```

### Store 方法

- `store.getState()`
- `store.dispatch(action)`
- `let unsubscribe = store.subscribe(listener)`
- `unsubscribe()`

## 数据流

1. 调用 `store.dispatch(action)`
2. `(preState, action) => nextState`
3. 根 reducer 把多个子 reducer 的结果合并成单一的 state 树
4. store 上的订阅器被调用

## 容器组件与展示组件

|-|容器组件|展示组件|
|:---:|:---:|:---:|
|作用|展示数据|数据获取、状态更新|
