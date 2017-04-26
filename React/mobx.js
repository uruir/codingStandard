/*
 * 数据层框架，当应用状态更新时，所有依赖于这些应用状态的监听者都应该自动更新
 * Observalbe - 需要被监听的应用状态
 * Reactions - 应用状态的监听者。reaction / autorun / @observer 都可以生成一个 Reactions
 */

// todoItem UI 组件，依赖于应用状态变量 completed 和 title
@observer
class TodoItem extends React.Component {
    render() {
        let todo = this.props.todo;
        let title = todo.title;
        let completed = todo.complete;
        return
    }
}


class TodoItemModel {
    id;
    @observable title;
    @observable completed;

    // 使用 action 后，reset 函数执行完成后，才会触发一次其监听者
    @action
    reset() {
        /*
         * 分别设置 title 和 completed 值，
         * 会触发两次 todoItem UI 组件的重新渲染
         */
        this.completed = false;
        this.title = '';
        /*
         * 使用 transaction 设置 title 和 completed 值，
         * 只会在函数调用结束后触发一次 todoItem UI 组件的重新渲染
         */
        transaction(() => {
            this.completed = false;
            this.title = '';
        })
    }
}

var todoItem = new TodoItemModel();
// 调用 reset 将触发两次 TodoItem UI 组件的重新渲染
todoItem.reset();