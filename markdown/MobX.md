# 概述

启用装饰器需要给 bable 添加相应 plugin / preset

```
yarn add mobx mobx-react
```

## 数据

定义 state 并观察它。

```
import {observable, computed, autorun} from 'mobx'

// 直接观察一个值并将之赋于一个 key
var todoStore = observable({
    /* some observable state */
    todos: [],

    /*
     * a derived value
     */
    get completedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }
});

/* a function that observes the state */
autorun(function() {
    console.log("Completed %d of %d items",
        todoStore.completedCount,
        todoStore.todos.length
    );
});

/* ..and some actions that modify the state */
todoStore.todos[0] = {
    title: "Take a walk",
    completed: false
};
// -> synchronously prints 'Completed 0 of 1 items'

todoStore.todos[0].completed = true;
// -> synchronously prints 'Completed 1 of 1 items'

class TodoList {
    // 观察一个被赋值的 key
    @observable todos = [];
    /*
     * 根据现有状态创建数据使用 computed
     * 只能用于实例属性的 get 函数上
     */
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```

## 组件

创建视图，使用 `@observer` 或 `observer` 方法观察组件。

```
// observer 由 mobx-react 提供
import {observer} from "mobx-react";

// 和其它装饰器组合时，在最内层
@observer class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}/>
            {todo.title}
    </li>
)
```

## 修改状态

一个 action 就是一段改变 state 的代码。如用户事件、后端数据、回调事件等。

```
appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);
```

