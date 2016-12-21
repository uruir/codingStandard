## 起步
### 双向绑定

```
<div id="app">
  <div>{{message}}</div>
  <input type="text" v-model="message">
</div>
<script>
  new Vue({
    el: '#app',
    data: {
      message: 'hello vue.js.'
    }
  });
</script>
```

#### v-model

```
<div id="app">
  <select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
<script>
  new Vue({
    el: '#app',
    data: {
      selected: 'B'
    }
  });
</script>
```

### 渲染列表

`v-for`指令用于显示数组元素。

```
<div id="app">
  <ul v-for="book in books ">
    <li>{{book.id}}</li>
    <li>{{book.name}}</li>
    <li>{{book.author}}</li>
    <li>{{book.price}}</li>
  </ul>
</div>
<script>
  new Vue({
    el: '#app',
    data: {
      books: [{
        id: 1,
        author: '曹雪芹',
        name: '红楼梦',
        price: 32.0
      }, {
        id: 2,
        author: '施耐庵',
        name: '水浒传',
        price: 30.0
      }, {
        id: '3',
        author: '罗贯中',
        name: '三国演义',
        price: 24.0
      }, {
        id: 4,
        author: '吴承恩',
        name: '西游记',
        price: 20.0
      }]
    }
  })
</script>
```

完整例子：

```
<!DOCTYPE html>
<html lang="zh-CN" xmlns:v-on="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>简单示例</title>
  <script src="./dist/vue.min.js"></script>
  <script src="./dist/vue-strap.min.js"></script>
  <link rel="stylesheet" href="./dist/bootstrap.min.css">
</head>
<body>
<div id="app">
  <legend>现有书籍</legend>
  <table class="table table-bordered">
    <tr v-for="book in books ">
      <td>{{book.id}}</td>
      <td>{{book.name}}</td>
      <td>{{book.author}}</td>
      <td>{{book.price}}</td>
      <td><button type="button" class="btn btn-danger" @click="delBook(book)">删除</button></td>
    </tr>
  </table>

  <div id="add-book">
    <legend>添加书籍</legend>
    <div class="form-group">
      <label for="">书名</label>
      <input type="text" class="form-control" v-model="book.name">
    </div>
    <div class="form-group">
      <label for="">作者</label>
      <input type="text" class="form-control" v-model="book.author">
    </div>
    <div class="form-group">
      <label for="">价格</label>
      <input type="text" class="form-control" v-model="book.price">
    </div>
    <button class="btn btn-primary btn-block" v-on:click="addBook()">添加</button>
  </div>
</div>
<script>
  new Vue({
    el: '#app',
    data: {
      books: [{
        id: 1,
        author: '曹雪芹',
        name: '红楼梦',
        price: 32.0
      }, {
        id: 2,
        author: '施耐庵',
        name: '水浒传',
        price: 30.0
      }, {
        id: '3',
        author: '罗贯中',
        name: '三国演义',
        price: 24.0
      }, {
        id: 4,
        author: '吴承恩',
        name: '西游记',
        price: 20.0
      }]
    },
    methods: {
      addBook: function() {
        //计算书的id
        this.book.id = this.books.length + 1;
        this.books.push(this.book);
        //将input中的数据重置
        this.book = '';
      },
      delBook:function(book){
        this.books.$remove(book);
      }
    }
  });
</script>
</body>
</html>
```

### 处理用户输入

```
<script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>

<div id="app">
    {{ message }}
    <button v-on:click="reverseMessage">字符串逆转</button>
</div>

new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('');
        }
    }
})
```

### 综合

```
<script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>

<div id="app">
  <input v-model="newTodo" v-on:keyup.enter="addTodo">
  <ul>
    <li v-for="todo in todos">
      <span>{{ todo.text }}</span>
      <button v-on:click="removeTodo($index)">X</button>
    </li>
  </ul>
</div>

new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [
      { text: 'hello uRuier'}
    ]
  },
  methods: {
    addTodo: function() {
      var text = this.newTodo.trim();
      if (text) {
        this.todos.push({text: text});
        this.newTodo = '';
      }
    },
    removeTodo: function(index) {
      this.todos.splice(index, 1);
    }
  }
});
```

## 概述

### 响应的数据绑定

Vue.js 读作 view，是一个构建数据驱动的 web 界面的库。

![响应的数据绑定](http://cn.vuejs.org/images/mvvm.png)

```
<script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>

<div id="app">
  <div v-if="greeting">hello uRuier</div>
  <button v-on:click="boolean">点我</button>
</div>

new Vue({
  el: '#app',
  data: {
    greeting: true
  },
  methods: {
    boolean: function() {
      this.greeting = !this.greeting;
    }
  }
});
```

当点击“点我”按钮时，显示或隐藏欢迎语。这里的`v-if`特性被称为指令，指令带有`v-`前缀，以指示它们是 Vue.js 提供的特性。这个例子演示了绑定 DOM 结构到数据，而之前的`{{ }}`是绑定文本到数据。`v-bind`指令用于绑定 HTML 特性。

### 组件系统

它提供一种抽象，让我们可以用独立可复用的小组件来构建大型应用。

![组件系统](http://cn.vuejs.org/images/components.png)

实际上一个典型的用 Vue.js 构建的大型应用将形成一个组件树，下面是组件模板：

```
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

组件类似于自定义元素 -- 它是 web 组件规范的一部分，Vue.js 组件实现了 [Slot API](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) 特性。

组件系统是用 Vue.js 构建大型应用的基础。

## Vue.js 实例

### 构造器

每个 Vue.js 应用的起步都是通过构造函数`Vue`创建一个 Vue 根实例。

```
var vm = new Vue({
  el: '#myApp',
  data: {
    msg: 'hello Vue.js'
  }
});
```

一个 Vue.js 实例是 MVVM 模式中描述的 ViewModel。即`vm`是 viewmodel，`vm.$el`是 view，`vm.$data`是 model。可以通过`vm.$data.msg`拿到数据，也可以直接`vm.msg`。

在实例化 Vue 时，需要传入一个选项，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。

可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器：

```
var MyComponent = Vue.extend({
  // 扩展选项
})

// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

尽管可以命令式地创建扩展实例，不过在多数情况下将组件构造器注册为一个自定义元素，然后声明式地用在模板中。我们将在后面详细说明组件系统。现在你只需知道所有的 Vue.js 组件其实都是被扩展的 Vue 实例。

### 属性与方法

每个 Vue 实例都会代理其 data 对象里所有的属性：

```
var data = { a: 1 }
var vm = new Vue({
  data: data
})

vm.a === data.a // -> true

// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2

// ... 反之亦然
data.a = 3
vm.a // -> 3
```

注意只有这些被代理的属性是响应的。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。我们将在后面详细讨论响应系统。

除了这些数据属性，Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的数据属性区分。例如：

```
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true

// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```

### 实例生命周期

Vue 实例在创建时有一系列初始化步骤——例如，它需要建立数据观察，编译模板，创建必要的数据绑定。在此过程中，它也将调用一些生命周期钩子，给自定义逻辑提供运行机会。例如 created 钩子在实例创建后调用：

```
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```

也有一些其它的钩子，在实例生命周期的不同阶段调用，如 compiled、 ready 、destroyed。钩子的 this 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分割在这些钩子中。

![生命周期图示](http://cn.vuejs.org/images/lifecycle.png)

## 数据绑定语法

Vue.js 的模板是基于 DOM 实现的。这意味着所有的 Vue.js 模板都是可解析的有效的 HTML，且通过一些特殊的特性做了增强。Vue 模板因而从根本上不同于基于字符串的模板。

### 插值

#### 文本

使用 “Mustache” 语法：`<span>{{ message }}</span>`。

#### 原始的 HTML

```
{{{ raw_html }}}
```

内容以 HTML 字符串插入——数据绑定将被忽略。

#### HTML 特性

Mustache 标签也可以用在 HTML 特性 (Attributes) 内：

```
<div id="item-{{ id }}"></div>
```

注意在 Vue.js 指令和特殊特性内不能用插值。

### 绑定表达式
     
放在 Mustache 标签内的文本称为绑定表达式。在 Vue.js 中，一段绑定表达式由一个简单的 JavaScript 表达式和可选的一个或多个过滤器构成。

#### JavaScript 表达式

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```

#### 过滤器

表达式后可添加过滤器，通过管道实现。因为管道不是 JavaScript 语法，因此不能在表达式内应用过滤器。

```
{{ message | capitalize }}

{{ message | filterA | filterB }}

// 过滤器函数始终以表达式的值作为第一个参数。带引号的参数视为字符串，而不带引号的参数按表达式计算。这里，字符串 'arg1' 将传给过滤器作为第二个参数，表达式 arg2 的值在计算出来之后作为第三个参数。
{{ message | filterA 'arg1' arg2 }}
```

定义过滤器：

```
Vue.filter('wrap', function (value, begin, end) {
  return begin + value + end;
})
```

### 指令 -- Directives

带有前缀`v-`的特性。指令的值限定为绑定表达式，指令的职责是当表达式的值改变时把某些特殊的行为应用到 DOM 上。

#### 参数

```
<a v-bind:href="url"></a>
```

这里的`href`是参数，作用是将元素的`href`特性与表达式`url`的值绑定。效果与`href="{{url}}"`一致。

#### 修饰符

```
<a v-bind:href.literal="/a/b/c"></a>
```

### 缩写

#### v-bind 缩写

```
<!-- 完整语法 -->
<a v-bind:href="url"></a>

<!-- 缩写 -->
<a :href="url"></a>

<!-- 完整语法 -->
<button v-bind:disabled="someDynamicCondition">Button</button>

<!-- 缩写 -->
<button :disabled="someDynamicCondition">Button</button>
```

#### v-on 缩写

```
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>

<!-- 缩写 -->
<a @click="doSomething"></a>
```

## 计算属性

### 基础例子

在模板中表达式非常便利，但是它们实际上只用于简单的操作。模板是为了描述视图的结构。在模板中放入太多的逻辑会让模板过重且难以维护。这就是为什么 Vue.js 将绑定表达式限制为一个表达式。如果需要多于一个表达式的逻辑，应当使用计算属性。

```
<div id="app">
  a = {{ a }}, b = {{ b }}
</div>

var vm = new Vue({
  el: '#app',
  data: {
    a: 1
  },
  computed: {
    b: function() {
      return this.a + 1;
    }
  }
})
```

这里`vm.b`的值为 2，如果`vm.a = 2`，则`vm.b`的值为 3。

### 计算属性 -- vm.$watch

Vue.js 提供了一个方法`$watch`用于观察 Vue 实例上的数据变动。与计算属性功能上类似：

```
<div id="app">
  firstname: <input v-model="firstname">
  lastname: <input v-model="lastname">
  fullname: {{ firstname + lastname }}
</div>

var vm = new Vue({
  el: '#app',
  data: {
    firstname: 'tu',
    lastname: 'rui',
    fullname: 'tu rui'
  }
})

vm.$watch('firstname', function(val) {
  fullname = val + this.lastname;
})

vm.$watch('lastname', function(val) {
  fullname = this.firstname + val;
})
```

若是用`computed`写：

```
var vm = new Vue({
  el: '#app',
  data: {
    firstname: 'tu',
    lastname: 'rui'
  },
  computed: {
    fullname: function() {
      return this.firstname + this.lastname;
    }
  }
})
```

### 计算 setter

计算属性默认是`getter`，当需要时也提供`setter`。

```
<div id="app">
  firstName: <input v-model="firstName">
  lastName: <input v-model="lastName">
  fullame: <input v-model="fullName">
</div>

var vm = new Vue({
  el: '#app',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
}
})
```

这样当`fullName`改变时，`firstName` & `lastName`也会跟着改变。

## Class & Style 绑定

### 绑定 HTML Class

#### 对象语法

```
<div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>

data: {
  isA: true,
  isB: false
}
```

或者：

```
<div v-bind:class="classObject"></div>

data: {
  classObject: {
    'class-a': true,
    'class-b': false
  }
}
```

#### 数组语法

```
<div v-bind:class="[classA, classB]">
data: {
  classA: 'class-a',
  classB: 'class-b'
}
```

渲染为：

```
<div class="class-a class-b"></div>
```

如果你也想根据条件切换列表中的 class，可以用三元表达式：

```
<div v-bind:class="[classA, isB ? classB : '']">
```

此例始终添加 classA，但是只有在 isB 是 true 时添加 classB 。

### 绑定内联样式

#### 对象语法

```
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

#### 数组语法

```
<div v-bind:style="[styleObjectA, styleObjectB]">
```

#### 自动添加前缀

当 v-bind:style 使用需要厂商前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

## 条件渲染

### v-if

```
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
```

### template v-if

```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-show

```
<h1 v-show="ok">Hello!</h1>
```

不同的是有 v-show 的元素会始终渲染并保持在 DOM 中。v-show 是简单的切换元素的 CSS 属性 display。

注意 v-show 不支持 <template> 语法，可以用 v-else，v-else 元素必须紧跟在 v-if 元素后面。v-if 是惰性的，条件真时才编译，而 v-show 则页面加载时就编译，只是简单的 CSS 切换。一般来说，v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换 v-show 较好，如果在运行时条件不大可能改变 v-if 较好。

## 列表渲染

### v-for

基于一个数组渲染一个列表。

```
<ul id="example-2">
  <li v-for="item in items">
    {{ parentMessage }} - {{ $index }} - {{ item.message }}
  </li>
</ul>
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

索引与可以写在`(index, item)`里。

```
<div id="app">
  <div v-for="(index, item) in items">
    {{ index }} {{ item.message }}
  </div>
</div>

var vm = new Vue({
  el: '#app',
  data: {
    items: [
      { message: 'hello uRuier.'},
      { message: 'hello Vue.js'}
    ]
  }
})
```

### template v-for

```
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

### 数组变动检测

#### 变异方法

Vue.js 包装了被观察数组的变异方法，故它们能触发视图更新。被包装的方法有：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 替换数组

变异方法，如名字所示，修改了原始数组。相比之下，也有非变异方法，如 filter(), concat() 和 slice()，不会修改原始数组而是返回一个新数组。在使用非变异方法时，可以直接用新数组替换旧数组：

```
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

可能你觉得这将导致 Vue.js 弃用已有 DOM 并重新渲染整个列表——幸运的是并非如此。 Vue.js 实现了一些启发算法，以最大化复用 DOM 元素，因而用另一个数组替换数组是一个非常高效的操作。

#### track-by

有时需要用全新对象（例如通过 API 调用创建的对象）替换数组。因为 v-for 默认通过数据对象的特征来决定对已有作用域和 DOM 元素的复用程度，这可能导致重新渲染整个列表。但是，如果每个对象都有一个唯一 ID 的属性，便可以使用 track-by 特性给 Vue.js 一个提示，Vue.js 因而能尽可能地复用已有实例。

例如，假定数据为：

```
{
  items: [
    { _uid: '88f869d', ... },
    { _uid: '7496c10', ... }
  ]
}
```

然后可以这样给出提示：

```
<div v-for="item in items" track-by="_uid">
  <!-- content -->
</div>
```

然后在替换数组 items 时，如果 Vue.js 遇到一个包含 \_uid: '88f869d' 的新对象，它知道它可以复用这个已有对象的作用域与 DOM 元素。

#### track-by $index

如果没有唯一的键供追踪，可以使用 track-by="$index"，它强制让 v-for 进入原位更新模式：片断不会被移动，而是简单地以对应索引的新值刷新。这种模式也能处理数据数组中重复的值。

这让数据替换非常高效，但是也会付出一定的代价。因为这时 DOM 节点不再映射数组元素顺序的改变，不能同步临时状态（比如 <input> 元素的值）以及组件的私有状态。因此，如果 v-for 块包含 <input> 元素或子组件，要小心使用 track-by="$index"

#### 问题

因为 JavaScript 的限制，Vue.js 不能检测到下面数组变化：

直接用索引设置元素，如 vm.items[0] = {}；
修改数据的长度，如 vm.items.length = 0。
为了解决问题 (1)，Vue.js 扩展了观察数组，为它添加了一个 $set() 方法：

```
// 与 `example1.items[0] = ...` 相同，但是能触发视图更新
example1.items.$set(0, { childMsg: 'Changed!'})
```

至于问题 (2)，只需用一个空数组替换 items。

除了 $set()， Vue.js 也为观察数组添加了 $remove() 方法，用于从目标数组中查找并删除元素，在内部它调用 splice() 。因此，不必这样：

```
var index = this.items.indexOf(item)
if (index !== -1) {
  this.items.splice(index, 1)
}
```

只用这样：

```
this.items.$remove(item)
```

### 对象 v-for

也可以使用 v-for 遍历对象。除了 $index 之外，作用域内还可以访问另外一个特殊变量 $key。

```
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ $key }} : {{ value }}
  </li>
</ul>
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      FirstName: 'John',
      LastName: 'Doe',
      Age: 30
    }
  }
})
```

### 值域 v-for

v-for 也可以接收一个整数，此时它将重复模板数次。

```
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

### 显示过滤/排序的结果

有时我们想显示过滤/排序过的数组，同时不实际修改或重置原始数据。有两个办法：

- 创建一个计算属性，返回过滤/排序过的数组；
- 使用内置的过滤器 filterBy 和 orderBy。

## 方法与事件处理器

### 方法处理器

监听 DOM 事件。

```
<div id="example">
  <button v-on:click="greet">Greet</button>
</div>

var vm = new Vue({
  el: '#example',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // 方法内 `this` 指向 vm
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      alert(event.target.tagName)
    }
  }
})

// 也可以在 JavaScript 代码中调用方法
vm.greet() // -> 'Hello Vue.js!'
```

有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法：

```
<button v-on:click="say('hello!', $event)">Submit</button>

methods: {
  say: function (msg, event) {
    // 现在我们可以访问原生事件对象
    event.preventDefault()
  }
}
```

### 事件修饰符

```
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat">

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
```

### 按键修饰符

```
<input v-on:keyup.enter="submit">

<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

全部的按键别名：

- enter
- tab
- delete
- esc
- space
- up
- down
- left
- right

## 表单按键绑定

### 基础语法

#### Text

```
<span>Message is: {{ message }}</span>
<br>
<input type="text" v-model="message" placeholder="edit me">
```

#### Checkbox

```
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

多个勾选框绑定到同一个数组：

```
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames | json }}</span>
```

#### Radio

```
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>
```

#### Select

```
<select v-model="selected">
  <option selected>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>Selected: {{ selected }}</span>
```

多选（绑定到一个数组）：

```
<select v-model="selected" multiple>
  <option selected>A</option>
  <option>B</option>
  <option>C</option>
</select>
<br>
<span>Selected: {{ selected | json }}</span>
```

动态选项，用 v-for 渲染：

```
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

### 值绑定

对于单选按钮，勾选框及选择框选项，v-model 绑定的值通常是静态字符串（对于勾选框是逻辑值）：

```
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

但是有时我们想绑定值到 Vue 实例一个动态属性上。可以用 v-bind 做到。 而且 v-bind 允许绑定输入框的值到非字符串值。

#### Checkbox

```
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b">
// 选中
vm.toggle === vm.a
// 取消选中
vm.toggle === vm.b
```

#### Radio

```
<input type="radio" v-model="pick" v-bind:value="a">
// 选中
vm.pick === vm.a
Select Options

<select v-model="selected">
  <!-- 对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
// 选中
typeof vm.selected // -> 'object'
vm.selected.number // -> 123
```

### 参数特性

#### lazy

在默认情况下，v-model 在input 事件中同步输入框值与数据，可以添加一个特性 lazy，从而改到在 change 事件中同步：

```
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model="msg" lazy>
```

#### number

如果想自动将用户的输入保持为数字，可以添加一个特性 number：

```
<input v-model="age" number>
```

#### debounce

debounce 设置一个最小的延时，在每次敲击之后延时同步输入框的值与数据。如果每次更新都要进行高耗操作（例如在输入提示中 Ajax 请求），它较为有用。

```
<input v-model="msg" debounce="500">
```

注意 debounce 参数不会延迟 input 事件：它延迟“写入”底层数据。因此在使用 debounce 时应当用 vm.$watch() 响应数据的变化。若想延迟 DOM 事件，应当使用 debounce 过滤器。

## 过渡

通过 Vue.js 的过渡系统，可以在元素从 DOM 中插入或移除时自动应用过渡效果。Vue.js 会在适当的时机为你触发 CSS 过渡或动画，你也可以提供相应的 JavaScript 钩子函数在过渡过程中执行自定义的 DOM 操作。

为了应用过渡效果，需要在目标元素上使用 transition 特性：

```
<div v-if="show" transition="my-transition"></div>
```

transition 特性可以与下面资源一起用：

- v-if
- v-show
- v-for （只为插入和删除触发）
- 动态组件
- 在组件的根节点上，并且被 Vue 实例 DOM 方法（如 vm.$appendTo(el)）触发。

当插入或删除带有过渡的元素时，Vue 将：

- 尝试以 ID "my-transition" 查找 JavaScript 过渡钩子对象——通过 Vue.transition(id, hooks) 或 transitions 选项注册。如果找到了，将在过渡的不同阶段调用相应的钩子。
- 自动嗅探目标元素是否有 CSS 过渡或动画，并在合适时添加/删除 CSS 类名。
- 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作（插入/删除）在下一帧中立即执行。

### CSS 过渡

#### 示例

典型的 CSS 过渡像这样：

```
<div v-if="show" transition="expand">hello</div>
```

然后为 .expand-transition, .expand-enter 和 .expand-leave 添加 CSS 规则:

```
/* 必需 */
.expand-transition {
  transition: all .3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
```

另外，可以提供 JavaScript 钩子:

```
Vue.transition('expand', {

  beforeEnter: function (el) {
    el.textContent = 'beforeEnter'
  },
  enter: function (el) {
    el.textContent = 'enter'
  },
  afterEnter: function (el) {
    el.textContent = 'afterEnter'
  },
  enterCancelled: function (el) {
    // handle cancellation
  },

  beforeLeave: function (el) {
    el.textContent = 'beforeLeave'
  },
  leave: function (el) {
    el.textContent = 'leave'
  },
  afterLeave: function (el) {
    el.textContent = 'afterLeave'
  },
  leaveCancelled: function (el) {
    // handle cancellation
  }
})
```

#### 过渡的 CSS 类名

类名的添加和切换取决于 transition 特性的值。比如 transition="fade"，会有三个 CSS 类名：

- .fade-transition 始终保留在元素上。
- .fade-enter 定义进入过渡的开始状态。只应用一帧然后立即删除。
- .fade-leave 定义离开过渡的结束状态。在离开过渡开始时生效，在它结束后删除。

如果 transition 特性没有值，类名默认是 .v-transition, .v-enter 和 .v-leave。

#### 过渡流程详解

当 show 属性改变时，Vue.js 将相应地插入或删除 <div> 元素，按照如下规则改变过渡的 CSS 类名：

如果 show 变为 false，Vue.js 将：

- 调用 beforeLeave 钩子；
- 添加 v-leave 类名到元素上以触发过渡；
- 调用 leave 钩子；
- 等待过渡结束（监听 transitionend 事件）；
- 从 DOM 中删除元素并删除 v-leave 类名；
- 调用 afterLeave 钩子。

如果 show 变为 true，Vue.js 将：

- 调用 beforeEnter 钩子；
- 添加 v-enter 类名到元素上；
- 把它插入 DOM；
- 调用 enter 钩子；
- 强制一次 CSS 布局，让 v-enter 确实生效。然后删除 v-enter 类名，以触发过渡，回到元素的原始状态；
- 等待过渡结束；
- 调用 afterEnter 钩子。

另外，如果在它的进入过渡还在进行中时删除元素，将调用 enterCancelled 钩子，以清理变动或 enter 创建的计时器。反过来对于离开过渡亦如是。

上面所有的钩子函数在调用时，它们的 this 均指向所属的 Vue 实例。如果元素是 Vue 实例的根节点，则这个实例是上下文。否则，上下文是过渡指令所属的实例。

最后，enter 和 leave 可以有第二个可选的回调参数，用于显式控制过渡如何结束。因此不必等待 CSS transitionend 事件， Vue.js 将等待你手工调用这个回调，以结束过渡。例如：

```
enter: function (el) {
  // 没有第二个参数
  // 由 CSS transitionend 事件决定过渡何时结束
}
```

vs.

```
enter: function (el, done) {
  // 有第二个参数
  // 过渡只有在调用 `done` 时结束
}
```

当多个元素一起过渡时，Vue.js 会批量处理，只强制一次布局。

#### CSS 动画

CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。

示例： (省略了兼容性前缀)

```
<span v-show="show" transition="bounce">Look at me!</span>

.bounce-enter {
  animation: bounce-in .5s;
}
.bounce-leave {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
```

### JavaScript 过渡

也可以只使用 JavaScript 钩子，不用定义任何 CSS 规则。当只使用 JavaScript 过渡时，enter 和 leave 钩子需要调用 done 回调，否则它们将被同步调用，过渡将立即结束。

为 JavaScript 过渡显式声明 css: false 是个好主意，Vue.js 将跳过 CSS 检测。这样也会阻止无意间让 CSS 规则干扰过渡。

在下例中我们使用 jQuery 注册一个自定义的 JavaScript 过渡：

```
Vue.transition('fade', {
  css: false,
  enter: function (el, done) {
    // 元素已被插入 DOM
    // 在动画结束后调用 done
    $(el)
      .css('opacity', 0)
      .animate({ opacity: 1 }, 1000, done)
  },
  enterCancelled: function (el) {
    $(el).stop()
  },
  leave: function (el, done) {
    // 与 enter 相同
    $(el).animate({ opacity: 0 }, 1000, done)
  },
  leaveCancelled: function (el) {
    $(el).stop()
  }
})
```

然后用 transition 特性中：

```
<p transition="fade"></p>
```

### 渐近过渡

transition 与 v-for 一起用时可以创建渐近过渡。给过渡元素添加一个特性 stagger, enter-stagger 或 leave-stagger：

```
<div v-for="list" transition stagger="100"></div>
```

或者，提供一个钩子 stagger, enter-stagger 或 leave-stagger，以更好的控制：

```
Vue.transition('stagger', {
  stagger: function (index) {
    // 每个过渡项目增加 50ms 延时
    // 但是最大延时限制为 300ms
    return Math.min(300, index * 50)
  }
})
```

[示例](http://jsfiddle.net/yyx990803/mvo99bse/light/)

## 组件

### 使用组件

#### 注册

之前说过，我们可以用 Vue.extend() 创建一个组件构造器：

```
var MyComponent = Vue.extend({
  // 选项...
})
```

要把这个构造器用作组件，需要用 Vue.component(tag, constructor) 注册 ：

```
// 全局注册组件，tag 为 my-component
Vue.component('my-component', MyComponent)
```

对于自定义标签名字，Vue.js 不强制要求遵循 W3C 规则（小写，并且包含一个短杠），尽管遵循这个规则比较好。

在注册之后，组件便可以用在父实例的模块中，以自定义元素 <my-component> 的形式使用。要确保在初始化根实例之前注册了组件：

```
<div id="example">
  <my-component></my-component>
</div>

// 定义
var MyComponent = Vue.extend({
  template: '<div>A custom component!</div>'
})

// 注册
Vue.component('my-component', MyComponent)

// 创建根实例
new Vue({
  el: '#example'
})
```

渲染为：

```
<div id="example">
  <div>A custom component!</div>
</div>
```

注意组件的模板替换了自定义元素，自定义元素的作用只是作为一个挂载点。这可以用实例选项 replace 改变。

```
<div id="box">
  <tree></tree>
</div>

// 定义
var Tree = Vue.extend({
  template: '<div>This is a tree!</div>'
});
// 注册
Vue.component('tree', Tree);
// 开始渲染
new Vue({
  el: '#box'
});
```

还可以进行局部注册：

```
var Child = Vue.extend({ /* ... */ })

var Parent = Vue.extend({
  template: '...',
  components: {
    'my-component': Child
  }
})
```


#### 局部注册

不需要全局注册每个组件。可以让组件只能用在其它组件内，用实例选项 components 注册：

```
var Child = Vue.extend({ /* ... */ })

var Parent = Vue.extend({
  template: '...',
  components: {
    // <my-component> 只能用在父组件模板内
    'my-component': Child
  }
})
```

这种封装也适用于其它资源，如指令、过滤器和过渡。

通过`$mount`实现`Vue.extend`：

```
<div id="mount-point"></div>
<script>
  // 创建可复用的构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>'
  })
  // 创建一个 Profile 实例
  var profile = new Profile({
    data: {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  })
  // 挂载到元素上
  profile.$mount('#mount-point')
</script>
```

`Vue.extend`中的`data`的值必须是函数：

```
<div id="myApp">
  <mp></mp>
</div>
<script>
  // 创建可复用的构造器
  var profile = Vue.extend({
    // 必须是函数
    data: function() {
      return {
        firstName: 'Walter', 
        lastName: 'White',
        alias: 'Heisenberg'
      }
    },
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>'
  })
  Vue.component('mp', profile);
  var vm = new Vue({
    el: '#myApp'
  })
</script>
```

#### 注册语法糖

为了让事件更简单，可以直接传入选项对象而不是构造器给 Vue.component() 和 component 选项。Vue.js 在背后自动调用 Vue.extend()：

```
// 在一个步骤中扩展与注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 局部注册也可以这么做
var Parent = Vue.extend({
  components: {
    'my-component': {
      template: '<div>A custom component!</div>'
    }
  }
})
```

#### 组件选项问题

传入 Vue 构造器的多数选项也可以用在 Vue.extend() 中，不过有两个特例： data and el。试想如果我们简单地把一个对象作为 data 选项传给 Vue.extend()：

```
var data = { a: 1 }
var MyComponent = Vue.extend({
  data: data
})
```

这么做的问题是 MyComponent 所有的实例将共享同一个 data 对象！这基本不是我们想要的，因此我们应当使用一个函数作为 data 选项，函数返回一个新对象：

```
var MyComponent = Vue.extend({
  data: function () {
    return { a: 1 }
  }
})
```

同理，el 选项用在 Vue.extend() 中时也须是一个函数。

#### is 特性

一些 HTML 元素，如 <table>，限制什么元素可以放在它里面。自定义元素不在白名单上，将被放在元素的外面，因而渲染不正确。这时应当使用 is 特性，指示它是一个自定义元素：

```
<table>
  <tr is="my-component"></tr>
</table>
```

### Props

#### 使用 Props 传递数据

组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。

“prop” 是组件数据的一个字段，期望从父组件传下来。子组件需要显式地用 props 选项 声明 props：

```
Vue.component('child', {
  props: ['childMsg'],
  // prop 可以用在模板内
  // 可以用 `this.msg` 设置
  template: '<span>{{ childMsg }}</span>'
});

<input v-model="parentMsg" />
<child v-bind:child-msg="parentMsg"></child>
```

#### camelCase vs. kebab-case

HTML 特性不区分大小写。名字形式为 camelCase 的 prop 用作特性时，需要转为 kebab-case（短横线隔开）：

```
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```

#### 动态 Props

类似于绑定一个普通的特性到一个表达式，也可以用 v-bind 绑定动态 Props 到父组件的数据。每当父组件的数据变化时，也会传导给子组件：

```
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```

使用 v-bind 的缩写语法通常更简单：

```
<child :my-message="parentMsg"></child>
```

#### 字面量语法 vs. 动态语法

初学者常犯的一个错误是使用字面量语法传递数值：

```
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
```

因为它是一个字面 prop，它的值以字符串 "1" 而不是以实际的数字传下去。如果想传递一个实际的 JavaScript 数字，需要使用动态语法，从而让它的值被当作 JavaScript 表达式计算：

```
<!-- 传递实际的数字  -->
<comp :some-prop="1"></comp>
```

#### Prop 绑定类型

prop 默认是单向绑定：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。不过，也可以使用 .sync 或 .once 绑定修饰符显式地强制双向或单次绑定：

比较语法：

```
<!-- 默认为单向绑定 -->
<child :msg="parentMsg"></child>

<!-- 双向绑定 -->
<child :msg.sync="parentMsg"></child>

<!-- 单次绑定 -->
<child :msg.once="parentMsg"></child>
```

双向绑定会把子组件的 msg 属性同步回父组件的 parentMsg 属性。单次绑定在建立之后不会同步之后的变化。

注意如果 prop 是一个对象或数组，是按引用传递。在子组件内修改它会影响父组件的状态，不管是使用哪种绑定类型。

#### Prop 验证

组件可以为 props 指定验证要求。当组件给其他人使用时这很有用，因为这些验证要求构成了组件的 API，确保其他人正确地使用组件。此时 props 的值是一个对象，包含验证要求：

```
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 必需且是字符串
    propB: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propC: {
      type: Number,
      default: 100
    },
    // 对象/数组的默认值应当由一个函数返回
    propD: {
      type: Object,
      default: function () {
        return { msg: 'hello' }
      }
    },
    // 指定这个 prop 为双向绑定
    // 如果绑定类型不对将抛出一条警告
    propE: {
      twoWay: true
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    },
    // 转换函数（1.0.12 新增）
    // 在设置值之前转换值
    propG: {
      coerce: function (val) {
        return val + '' // 将值转换为字符串
      }
    }
  }
})
```

type 可以是下面原生构造器：

- String
- Number
- Boolean
- Function
- Object
- Array

type 也可以是一个自定义构造器，使用 instanceof 检测。

当 prop 验证失败了，Vue 将拒绝在子组件上设置此值，如果使用的是开发版本会抛出一条警告。

### 父子组件通信

#### 父链

子组件可以用 this.$parent 访问它的父组件。根实例的后代可以用 this.$root 访问它。父组件有一个数组 this.$children，包含它所有的子元素。

尽管可以访问父链上任意的实例，不过子组件应当避免直接依赖父组件的数据，应当显式地使用 props 传递数据。另外，在子组件中修改父组件的状态是非常糟糕的做法，因为：

- 这让父组件与子组件紧密地耦合；
- 只看父组件，很难理解父组件的状态。因为它可能被任意子组件修改！理想情况下，只有组件自己能修改它的状态。

当父组件数据变化时，可以通过props来通知子组件，子组件状态变化时，可以利用事件的冒泡来通知父组件。

子组件可以用 this.$parent 访问它的父组件。父组件有一个数组 this.$children ，包含它所有的子元素。

```
<!-- 子组件模板 -->
<template id="child-template">
  <input v-model="msg">
  <button v-on:click="notify">Dispatch Event</button>
</template>

<!-- 父组件模板 -->
<div id="events-example">
  <p>Messages: {{ messages | json }}</p>
  <child></child>
</div>
// 注册子组件
// 将当前消息派发出去
Vue.component('child', {
  template: '#child-template',
  data: function () {
    return { msg: 'hello' }
  },
  methods: {
    notify: function () {
      if (this.msg.trim()) {
        this.$dispatch('child-msg', this.msg)  // 触发child-msg事件
        this.msg = ''
      }
    }
  }
})

// 启动父组件
// 将收到消息时将事件推入一个数组
var parent = new Vue({
  el: '#events-example',
  data: {
    messages: []
  },
  // 在创建实例时 `events` 选项简单地调用 `$on`
  events: {
    'child-msg': function (msg) {  // 监听到 child-msg事件
      // 事件回调内的 `this` 自动绑定到注册它的实例上
      this.messages.push(msg)  // messages改变自动修改html内容
    }
  }
})
```

上面这种写法child-msg事件触发后，的执行方法不直观。 所以可以采用v-on绑定事件。

```
<!-- 当child-msg触发时， 执行父组件的handleIt方法。 -->
<child v-on:child-msg="handleIt"></child>
```

![](http://kunkun12.com/vue-demo/slides/assets/player/KeynoteDHTMLPlayer.html#31)

#### 自定义事件

Vue 实例实现了一个自定义事件接口，用于在组件树中通信。这个事件系统独立于原生 DOM 事件，做法也不同。

每个 Vue 实例都是一个事件触发器：

- 使用 $on() 监听事件；
- 使用 $emit() 在它上面触发事件；
- 使用 $dispatch() 派发事件，事件沿着父链冒泡；
- 使用 $broadcast() 广播事件，事件向下传导给所有的后代。

不同于 DOM 事件，Vue 事件在冒泡过程中第一次触发回调之后自动停止冒泡，除非回调明确返回 true。

简单例子：

```
<!-- 子组件模板 -->
<template id="child-template">
  <input v-model="msg">
  <button v-on:click="notify">Dispatch Event</button>
</template>

<!-- 父组件模板 -->
<div id="events-example">
  <p>Messages: {{ messages | json }}</p>
  <child></child>
</div>
// 注册子组件
// 将当前消息派发出去
Vue.component('child', {
  template: '#child-template',
  data: function () {
    return { msg: 'hello' }
  },
  methods: {
    notify: function () {
      if (this.msg.trim()) {
        this.$dispatch('child-msg', this.msg)
        this.msg = ''
      }
    }
  }
})

// 启动父组件
// 将收到消息时将事件推入一个数组
var parent = new Vue({
  el: '#events-example',
  data: {
    messages: []
  },
  // 在创建实例时 `events` 选项简单地调用 `$on`
  events: {
    'child-msg': function (msg) {
      // 事件回调内的 `this` 自动绑定到注册它的实例上
      this.messages.push(msg)
    }
  }
})
```

#### 使用 v-on 绑定自定义事件

上例非常好，不过看着父组件的代码， "child-msg" 事件来自哪里不直观。如果我们在模板中子组件用到的地方声明事件处理器会更好。为了做到这点，子组件可以用 v-on 监听自定义事件：

```
<child v-on:child-msg="handleIt"></child>
```

这让事情非常清晰：当子组件触发了 "child-msg" 事件，父组件的 handleIt 方法将被调用。所有影响父组件状态的代码放到父组件的 handleIt 方法中；子组件只关注触发事件。

#### 子组件索引

尽管有 props 和 events，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 v-ref 为子组件指定一个索引 ID。例如：

```
<div id="parent">
  <user-profile v-ref:profile></user-profile>
</div>
var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile
```

v-ref 和 v-for 一起用时，ref 是一个数组或对象，包含相应的子组件。

### 使用 Slot 分发内容

在使用组件时，常常要像这样组合它们：

```
<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>
```

注意两点：

- <app> 组件不知道它的挂载点会有什么内容，挂载点的内容是由 <app> 的父组件决定的。
- <app> 组件很可能有它自己的模板。

为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个处理称为内容分发（或 “transclusion”，如果你熟悉 Angular）。Vue.js 实现了一个内容分发 API，参照了当前 Web 组件规范草稿，使用特殊的 <slot> 元素作为原始内容的插槽。

#### 编译作用域

在深入内容分发 API 之前，我们先明确内容的编译作用域。假定模板为：

```
<child>
  {{ msg }}
</child>
```

msg 应该绑定到父组件的数据，还是绑定到子组件的数据？答案是父组件。组件作用域简单地说是：父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

一个常见错误是试图在父组件模板内将一个指令绑定到子组件属性/方法：

```
<!-- 无效 -->
<child v-show="someChildProperty"></child>
```

假定 someChildProperty 是子组件的属性，上例不能如预期工作。父组件模板不知道子组件的状态。

如果要绑定子组件内的指令到一个组件的根节点，应当在它的模板内这么做：

```
Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})
```

类似地，分发内容是在父组件作用域内编译。

#### 单个 Slot

父组件的内容将被抛弃，除非子组件模板包含 <slot>。如果只有一个没有特性的 slot，整个内容将被插到它所在的地方，替换 slot。

<slot> 标签的内容视为回退内容。回退内容在子组件的作用域内编译，只有当宿主元素为空并且没有内容供插入时显示。

假定 my-component 组件有下面模板：

```
<div>
  <h1>This is my component!</h1>
  <slot>
    This will only be displayed if there is no content
    to be distributed.
  </slot>
</div>
```

父组件模板：

```
<my-component>
  <p>This is some original content</p>
  <p>This is some more original content</p>
</my-component>
```

渲染结果：

```
<div>
  <h1>This is my component!</h1>
  <p>This is some original content</p>
  <p>This is some more original content</p>
</div>
```

#### 命名 Slot

<slot> 元素有一个特殊特性 name，用于配置如何分发内容。多个 slot 可以有不同的名字。命名 slot 将匹配有对应 slot 特性的内容片断。

也可以有一个未命名 slot，它是默认 slot，作为找不到匹配内容的回退插槽。如果没有默认的 slot，不匹配内容将被抛弃。

例如，假定我们有一个 multi-insertion 组件，它的模板为：

```
<div>
  <slot name="one"></slot>
  <slot></slot>
  <slot name="two"></slot>
</div>
```

父组件模板：

```
<multi-insertion>
  <p slot="one">One</p>
  <p slot="two">Two</p>
  <p>Default A</p>
</multi-insertion>
```

渲染结果为：

```
<div>
  <p slot="one">One</p>
  <p>Default A</p>
  <p slot="two">Two</p>
</div>
```

在组合组件时，内容分发 API 是非常有用的机制。

### 动态组件

多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 <component> 元素，动态地绑定到它的 is 特性：

```
new Vue({
  el: 'body',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
<component :is="currentView">
  <!-- 组件在 vm.currentview 变化时改变 -->
</component>
```

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：

```
<component :is="currentView" keep-alive>
  <!-- 非活动组件将被缓存 -->
</component>
```

#### activate 钩子

在切换组件时，切入组件在切入前可能需要进行一些异步操作。为了控制组件切换时长，给切入组件添加 activate 钩子：

```
Vue.component('activate-example', {
  activate: function (done) {
    var self = this
    loadDataAsync(function (data) {
      self.someData = data
      done()
    })
  }
})
```

注意 activate 钩子只作用于动态组件切换或静态组件初始化渲染的过程中，不作用于使用实例方法手工插入的过程中。

#### transition-mode

transition-mode 特性用于指定两个动态组件之间如何过渡。

在默认情况下，进入与离开平滑地过渡。这个特性可以指定另外两种模式：

- in-out：新组件先过渡进入，等它的过渡完成之后当前组件过渡出去。
- out-in：当前组件先过渡出去，等它的过渡完成之后新组件过渡进入。

示例：

```
<!-- 先淡出再淡入 -->
<component
  :is="view"
  transition="fade"
  transition-mode="out-in">
</component>
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
```

### 杂项

#### 组件和 v-for

自定义组件可以像普通元素一样直接使用 v-for：

```
<my-component v-for="item in items"></my-component>
```

但是，不能传递数据给组件，因为组件的作用域是孤立的。为了传递数据给组件，应当使用 props：

```
<my-component
  v-for="item in items"
  :item="item"
  :index="$index">
</my-component>
```

不自动把 item 注入组件的原因是这会导致组件跟当前 v-for 紧密耦合。显式声明数据来自哪里可以让组件复用在其它地方。

#### 编写可复用组件

在编写组件时，记住是否要复用组件有好处。一次性组件跟其它组件紧密耦合没关系，但是可复用组件应当定义一个清晰的公开接口。

Vue.js 组件 API 来自三部分——prop，事件和 slot：

- prop 允许外部环境传递数据给组件；
- 事件 允许组件触发外部环境的 action；
- slot 允许外部环境插入内容到组件的视图结构内。

使用 v-bind 和 v-on 的简写语法，模板的缩进清楚且简洁：

```
<my-component
  :foo="baz"
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat">
  <!-- content -->
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```

#### 异步组件

在大型应用中，我们可能需要将应用拆分为小块，只在需要时才从服务器下载。为了让事情更简单，Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如：

```
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

工厂函数接收一个 resolve 回调，在收到从服务器下载的组件定义时调用。也可以调用 reject(reason) 指示加载失败。这里 setTimeout 只是为了演示。怎么获取组件完全由你决定。推荐配合使用 Webpack 的代码分割功能：

```
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})
```

#### 资源命名约定

一些资源，如组件和指令，是以 HTML 特性或 HTML 自定义元素的形式出现在模板中。因为 HTML 特性的名字和标签的名字不区分大小写，所以资源的名字通常需使用 kebab-case 而不是 camelCase 的形式，这不大方便。

Vue.js 支持资源的名字使用 camelCase 或 PascalCase 的形式，并且在模板中自动将它们转为 kebab-case（类似于 prop 的命名约定）：

```
// 在组件定义中
components: {
  // 使用 camelCase 形式注册
  myComponent: { /*... */ }
}
<!-- 在模板中使用 kebab-case 形式 -->
<my-component></my-component>
```

ES6 对象字面量缩写也没问题：

```
// PascalCase
import TextBox from './components/text-box';
import DropdownMenu from './components/dropdown-menu';

export default {
  components: {
    // 在模板中写作 <text-box> 和 <dropdown-menu>
    TextBox,
    DropdownMenu
  }
}
```

#### 递归组件

组件在它的模板内可以递归地调用自己，不过，只有当它有 name 选项时才可以：

```
var StackOverflow = Vue.extend({
  name: 'stack-overflow',
  template:
    '<div>' +
      // 递归地调用它自己
      '<stack-overflow></stack-overflow>' +
    '</div>'
})
```

上面组件会导致一个错误 “max stack size exceeded”，所以要确保递归调用有终止条件。当使用 Vue.component() 全局注册一个组件时，组件 ID 自动设置为组件的 name 选项。

#### 片断实例

在使用 template 选项时，模板的内容将替换实例的挂载元素。因而推荐模板的顶级元素始终是单个元素。

不这么写模板：

```
<div>root node 1</div>
<div>root node 2</div>
```

推荐这么写：

```
<div>
  I have a single root node!
  <div>node 1</div>
  <div>node 2</div>
</div>
```

下面几种情况会让实例变成一个片断实例：

- 模板包含多个顶级元素。
- 模板只包含普通文本。
- 模板只包含其它组件（其它组件可能是一个片段实例）。
- 模板只包含一个元素指令，如 <partial> 或 vue-router 的 <router-view>。
- 模板根节点有一个流程控制指令，如 v-if 或 v-for。

这些情况让实例有未知数量的顶级元素，它将把它的 DOM 内容当作片断。片断实例仍然会正确地渲染内容。不过，它没有一个根节点，它的 $el 指向一个锚节点，即一个空的文本节点（在开发模式下是一个注释节点）。

但是更重要的是，组件元素上的非流程控制指令，非 prop 特性和过渡将被忽略，因为没有根元素供绑定：

```
<!-- 不可以，因为没有根元素 -->
<example v-show="ok" transition="fade"></example>

<!-- props 可以 -->
<example :prop="someData"></example>

<!-- 流程控制可以，但是不能有过渡 -->
<example v-if="ok"></example>
```

当然片断实例有它的用处，不过通常给组件一个根节点比较好。它会保证组件元素上的指令和特性能正确地转换，同时性能也稍微好些。

#### 内联模板

如果子组件有 inline-template 特性，组件将把它的内容当作它的模板，而不是把它当作分发内容。这让模板更灵活。

```
<my-component inline-template>
  <p>These are compiled as the component's own template</p>
  <p>Not parent's transclusion content.</p>
</my-component>
```

但是 inline-template 让模板的作用域难以理解，并且不能缓存模板编译结果。最佳实践是使用 template 选项在组件内定义模板。

### 组件封装

在创建自定义的指令、过滤器和组件的时候，我们并不总是希望把它们注册在 Vue.js 的全局作用域上，这样可能会产生命名冲突，不利于这些功能的复用。这种时候，我们可以把它们作为私有属性封装在一个组件内部：

```
var MyComponent = Vue.extend({
    directives: {
        // 这里的指令只能在 MyComponent 的实例和其子VM中使用！
        'private-directive': function () {
            // ...
        }
    },
    filters: {
        // ...
    },
    components: {
        // ...
    },
    transitions: {
        // ...
    },
    partials: {
        // ...
    }
})
```

## 深入响应式原理

大部分的基础内容我们已经讲到了，现在讲点底层内容。Vue.js 最显著的一个功能是响应系统 —— 模型只是普通对象，修改它则更新视图。这让状态管理非常简单且直观，不过理解它的原理也很重要，可以避免一些常见问题。下面我们开始深挖 Vue.js 响应系统的底层细节。

### 如何追踪变化

把一个普通对象传给 Vue 实例作为它的 data 选项，Vue.js 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。这是 ES5 特性，不能打补丁实现，这便是为什么 Vue.js 不支持 IE8 及更低版本。

用户看不到 getter/setters，但是在内部它们让 Vue.js 追踪依赖，在属性被访问和修改时通知变化。一个问题是在浏览器控制台打印数据对象时 getter/setter 的格式化不同，使用 vm.$log() 实例方法可以得到更友好的输出。

模板中每个指令/数据绑定都有一个对应的 watcher 对象，在计算过程中它把属性记录为依赖。之后当依赖的 setter 被调用时，会触发 watcher 重新计算 ，也就会导致它的关联指令更新 DOM。

[](http://cn.vuejs.org/images/data.png)

### 变化检测问题

受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。例如：

```
var data = { a: 1 }
var vm = new Vue({
  data: data
})
// `vm.a` 和 `data.a` 现在是响应的

vm.b = 2
// `vm.b` 不是响应的

data.b = 2
// `data.b` 不是响应的
```

不过，有办法在实例创建之后添加属性并且让它是响应的。

对于 Vue 实例，可以使用 $set(key, value) 实例方法：

```
vm.$set('b', 2)
// `vm.b` 和 `data.b` 现在是响应的
```

对于普通数据对象，可以使用全局方法 Vue.set(object, key, value)：

```
Vue.set(data, 'c', 3)
// `vm.c` 和 `data.c` 现在是响应的
```

有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 添加属性。但是，添加到对象上的新属性不会触发更新。这时可以创建一个新的对象，包含原对象的属性和新的属性：

```
// 不使用 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

也有一些数组相关的问题，之前已经在列表渲染中讲过。

### 初始化数据

尽管 Vue.js 提供了 API 动态地添加响应属性，还是推荐在 data 对象上声明所有的响应属性。

不这么做：

```
var vm = new Vue({
  template: '<div>{{msg}}</div>'
})
// 然后添加 `msg`
vm.$set('msg', 'Hello!')
```

这么做：

```
var vm = new Vue({
  data: {
    // 以一个空值声明 `msg`
    msg: ''
  },
  template: '<div>{{msg}}</div>'
})
// 然后设置 `msg`
vm.msg = 'Hello!'
```

这么做有两个原因：

- data 对象就像组件状态的模式（schema）。在它上面声明所有的属性让组件代码更易于理解。
- 添加一个顶级响应属性会强制所有的 watcher 重新计算，因为它之前不存在，没有 watcher 追踪它。这么做性能通常是可以接受的（特别是对比 Angular 的脏检查），但是可以在初始化时避免。

### 异步更新队列

Vue.js 默认异步更新 DOM。每当观察到数据变化时，Vue 就开始一个队列，将同一事件循环内所有的数据变化缓存起来。如果一个 watcher 被多次触发，只会推入一次到队列中。等到下一次事件循环，Vue 将清空队列，只进行必要的 DOM 更新。在内部异步队列优先使用 MutationObserver，如果不支持则使用 setTimeout(fn, 0)。

例如，设置了 vm.someData = 'new value'，DOM 不会立即更新，而是在下一次事件循环清空队列时更新。我们基本不用关心这个过程，但是如果想在 DOM 状态更新后做点什么，这会有帮助。尽管 Vue.js 鼓励开发者沿着数据驱动的思路，避免直接修改 DOM，但是有时确实要这么做。为了在数据变化之后等待 Vue.js 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback) 。回调在 DOM 更新完成后调用。例如：

```
<div id="example">{{msg}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    msg: '123'
  }
})
vm.msg = 'new message' // 修改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

vm.$nextTick() 这个实例方法比较方便，因为它不需要全局 Vue，它的回调的 this 自动绑定到当前 Vue 实例：

```
Vue.component('example', {
  template: '<span>{{msg}}</span>',
  data: function () {
    return {
      msg: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.msg = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => 'updated'
      })
    }
  }
})
```

### 计算属性的秘密

应注意到 Vue.js 的计算属性不是简单的 getter。计算属性持续追踪它的响应依赖。在计算一个计算属性时，Vue.js 更新它的依赖列表并缓存结果，只有当其中一个依赖发生了变化，缓存的结果才无效。因此，只要依赖不发生变化，访问计算属性会直接返回缓存的结果，而不是调用 getter。

为什么要缓存呢？假设我们有一个高耗计算属性 A，它要遍历一个巨型数组并做大量的计算。然后，可能有其它的计算属性依赖 A。如果没有缓存，我们将调用 A 的 getter 许多次，超过必要次数。

由于计算属性被缓存了，在访问它时 getter 不总是被调用。考虑下例：

```
var vm = new Vue({
  data: {
    msg: 'hi'
  },
  computed: {
    example: function () {
      return Date.now() + this.msg
    }
  }
})
```

计算属性 example 只有一个依赖：vm.msg。Date.now() 不是 响应依赖，因为它跟 Vue 的数据观察系统无关。因而，在访问 vm.example 时将发现时间戳不变，除非 vm.msg 变了。

有时希望 getter 不改变原有的行为，每次访问 vm.example 时都调用 getter。这时可以为指定的计算属性关闭缓存：

```
computed: {
  example: {
    cache: false,
    get: function () {
      return Date.now() + this.msg
    }
  }
}
```

现在每次访问 vm.example 时，时间戳都是新的。但是，只是在 JavaScript 中访问是这样的；数据绑定仍是依赖驱动的。如果在模块中这样绑定计算属性 {{example}}，只有响应依赖发生变化时才更新 DOM。































































































































































































