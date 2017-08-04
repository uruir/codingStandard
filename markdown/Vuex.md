是专门为 Vue.js 设计的集中式管理架构。

对于简单 SPA 应用，状态储存在组件的内部，整个应用的状态分散在各个角落。

大型应用中状态的共享问题：

- 组件本地状态
- 应用层级状态

Vuex 分三部分：

- store 存储应用的状态
- mutation 改变应用的状态
- action 是一种专门用来被 component 调用的函数。action 函数能够通过分发相应的 mutation 函数，来触发对 store 的更新。action 也可以先从 HTTP 后端或 store 中读取其他数据之后再分发更新事件

```
import Vuex from 'vuex'
const state = {
  count: 0
}
const mutations = {
  INCREMENT (state) {
    state.count++
  }
}
export default new Vuex.Store({
  state,
  mutations
})

store.dispatch('INCREMENT')
```

![image_1as48tqkqv3tm6q1dok8s1h7j9.png-287.9kB][1]

Vuex 使用 单一状态树 —— 是的，用一个对象就包含了全部的应用层级状态。

  [1]: http://static.zybuluo.com/uruir/qm8aj1499nwfvrw3kn4zn7ae/image_1as48tqkqv3tm6q1dok8s1h7j9.png
