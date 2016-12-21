## 事件

### 基本概念

- 事件类型（event type）：发生什么类型事件的字符串，也称事件名称
 + mouseover
 + keydown
- 事件目标（event target）：发生事件或与之相关的对象
 + window
 + document
 + element
 + XMLHttpRequest
- 事件处理程序（event handler）：处理事件的函数，也叫事件监听程序（event listener）
- 事件对象（event object）：与特定事件相关且包含有关该事件详细信息的对象。事件对象作为参数传递给事件处理程序（但是在IE8以及其之前版本中，全局变量event才是事件对象）。事件对象都有用来指定事件类型（event type）的type属性和指定事件目标（event target）的target属性（但是在IE8以及其之前版本中，用的是srcElement而非target）。当然，不同类型的事件还会为其相关事件对象定义一些其他的独有属性。例如，鼠标事件的相关对象会包含鼠标指针的坐标，而键盘事件的相关对象会包含按下的键和辅助键的详细信息

### 事件传播（event propagation）机制

- 事件捕获（event capturing）
- 事件目标
- 事件冒泡（event bubble）

![](http://ww1.sinaimg.cn/mw690/0064cTs2jw1exsjz3kx7zj30a70703yq.jpg)

### 事件处理程序的方式

1. 在标签中注册的事件（onclick等被注册的事件不区分大小写），按冒泡处理；若一个标签注册多个事件，只处理第一个注册的事件处理程序。`this`指向元素本身，比下面方式优先级高。
2. 在`<script>`里，元素的属性中定义的事件（只能小写，有on前缀），按冒泡处理；若注册多个事件，后者覆盖之前已注册的程序。`this`也指向元素本身，且若用上一种方法定义了，本方法覆盖第一种方式中定义的方法。
3. `el.addEventListener(type, handler, false)`，type是事件类型，没有`on`前缀，`handler`是事件处理函数，`false`是默认值，表明在事件冒泡过程中注册事件处理程序。删除事件用`el.removeEventListener(type, handler, false)`，参数与`addEventListener`一致。`this`也指元素本身，且不会覆盖而是往元素上添加新的事件处理程序，按注册顺序响应。
4. `el.attachEvent('on' + type, handler)`，只有两个参数，因为它只拥有事件冒泡机制；删除为`el.detachEvent`。用于IE8及以前（只有全局变量event才是事件对象）。`this`指向`window`，且也不会覆盖而是新增事件，不按注册顺序响应。

### 事件取消

- 取消事件的浏览器默认操作，如超链接会发生页面自动跳转。如果通过上述第一、二种方式注册事件，在`handler`中添加`return false;`来取消默认操作。而第三种使用`event.preventDefault()`取消。第四种使用`event.returnValue = false;`取消。
- 取消事件继续传播。第三种方式中使用`event.stopPropagation()`方法取消；第四种方式使用`event.cancelBubble = true;`。

### 事件处理函数

- HTML事件处理函数：将JavaScript代码直接写在HTML元素中，极其不推荐的方式。如：`<p onclick="func();">这是HTML事件处理函数</p>`
- DOM 0级事件处理函数：`element.onclick = function() { ...};`
- DOM 2级事件处理函数：`element.addEventListener('click', function(e) { console.log(e.type); }, false);` // 含三个参数：事件名、函数、boolean。其中`false`指冒泡阶段，可在同一个元素上添加多个监听事件。本例指在element上绑定click事件，首推这种写法！
- IE事件处理程序：`attachEvent('onclick', function(){...});`，删除用`detachEvent(...)`，因为IE默认是冒泡阶段，所以不需要使用`addEventListener()`里的第三个参数

`undefined` & `null` 相等但不全等，即`undefined == null`值为`true`，但`undefined === null`值为`false`。

DOM 2级中删除事件只能用`removeEventListener`，所以监听事件，需要先将第二个参数的函数定义，再引用，如下：

```
var p = document.getElementById('btn');
var handler = function(e) { console.log(e.type); }; // 先定义
p.addEventListener('click', handler, false); // 添加到指定元素上
p.removeEventListener('click', handler, false); // 已经用完了，可以删除绑定事件了
```

换成DOM 0级事件监听（不是很推荐，尽量用上面的DOM 2级来监听事件），如下：

```
var p = document.getElementById('btn');
var handler = function(e) { 
  switch (e.type) {
    case 'click': console.log('clicked');break;
    case 'mouseover': e.target.style.backgroundColor = 'red';console.log(e.target);break; //p
    case 'mouseout': e.target.style.backgroundColor = '';break;
  }
};
p.onclick = handler;
p.onmouseover = handler;
p.onmouseout = handler;
```

```
ul.addEventListener('click', showTarget); //只设置了一个监听事件，却监听了其下所有Li元素
function showTarget(e) {
  var t = e.target;
  if (t.tagName === 'Li') { ... }
}

images.addEventListener('load', function(e) {
  images.className += 'finished'; //进度事件
});

xhr.addEventListener('process', updateProgress, false);
xhr.open();
function updateProgress(e) {
  if (e.lengthComputable) {
    var precentComplete = e.loaded/e.total;
  } else {
    console.log('不能显示进度');
  }
}

xhr.upload.onprogress = function(e) {
  if (e.lengthComputable) {
    progressBar.value = (e.loaded/e.total) * 100;
    progressBar.textContent = progressBar.value;
  }
};
```

阻止默认事件：`link.onclick = function(e) { e.preventDefault(); };`

### 事件类型详解

- UI：用户与页面元素交互时触发。
- 焦点事件
- 鼠标事件
- 滚轮事件
- 文本事件：当输入文本时触发
- 键盘事件
- 合成事件
- 变动事件：当底层DOM结构发生变化时触发
- 变动名称事件：当元素或属性名变动时触发

焦点事件：`focus`和`blur`，不冒泡；`focusin`冒泡。

鼠标与滚轮事件：`mouseenter`和`mouseleave`不冒泡，其余冒泡。

位置信息保存在事件对象的`clientX`和`clientY`中；若页面无滚动，则与`pageX`和`pageY`相等；另有屏幕位置`screenX`和`screenY`。

鼠标位置：`mousemove`。

键盘与文本事件：`keydown`和`keyup`, `event.keyCode`。

#### 键盘事件

```
document.onkeyup = function(event) {
  event = event || window.event;
  if (event.keyCode === 13) { ... }
}
```