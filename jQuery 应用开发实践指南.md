> Ralph Steyer 著，机械工业出版社出版 @ 2014年04月第1版

## 序

JS框架，为解决浏览器兼容问题，提供在多平台开发Web应用一致体验而生。

从核心的 DOM 操作开始，结合 CSS 选择器，为 JS 提供大量方法。同时提供[jQuery UI](http://jqueryui.com) & jQuery Mobile。

## 第 1 章 -- 导言

富互联网应用（Rich Internet Application），有个人时间表、办公室软件、游戏、行程安排和通信软件等。

- 框架：提供某些功能的编程框架，本身不是完成的程序，但程序员可以用它提供的骨架创建应用程序。框架本身不是一个完成的程序，但是可以用它所提供的骨架创建应用程序。通常包含一个带有预定义代码结构的程序库，而且规定了对使用这些程序库的行为模式的一些控制（如某种语法）
- 工具包：一组程序，这些程序可以基于特定的程序库或某个语法概念。

框架和工具包一般都提供窗口小部件或组件（GUI）。

jQuery 最初由 John Resig 开发，于 2006 年 1 月的 BarCamp（NYC） 会议上发布。

jQuery UI 建立在 jQuery 之上，用 UI 专用组件扩展了 jQuery 框架。同样，jQuery Mobile 也构建于 jQuery 之上，用移动设备专用的组件扩展了 jQuery 框架。

Web编程中合适的集成开发环境：免费的[Aptana](http://aptana.com)，它基于[Eclipse](http://www.eclipse.org)，内含小型Web服务器（Jetty）。因此可以通过它测试AJAX应用而无须安装独立的Web服务器。

## 第 2 章 -- jQuery 的第一批示例

### 元素访问和 DOM 保护

修改文本内容：

```
$('#id').on('click', function(){
  $('#output').html('sth');
});
```

`document`的`ready()`是在网页主体中以HTML或者对应DOM对象的JS中编写的`onload`事件处理器的一个替代品。

### 用 jQuery 风格的 DHTML 编辑网页

增加，删除，切换类：

```
$('#id').addClass('myClass'); // removeClass() | toggleClass()
```

若网页中`id`名相同的有多个元素，jQuery只选中第一个；但是CSS中设置的样式，都能应用。

### 以动画方式缩小和扩大一个元素

动画效果显示，隐藏元素：

```
$('#id').slideToggle('slow | normal | fast'); // 参数速度以毫秒为单位不需要使用引号
```

多次触发同一事件，这些事件会累积起来，只有前一个事件执行完后下一个事件才会开始。

### 动态改变特性（Attribute）

```
$('#id').attr({
  key: value
});
```

## 第 3 章 -- 基本知识

### 互联网上的 Web、Web 2.0 和客户/服务器准则

Web的核心基于超文本传输协议（HTTP），文档描述语言（HTML），加上 Web 服务器和 Web 浏览器程序。

其它的客户端技术，如微软的`Silverlight`，但支持率相当低。

因为Google，大约从2005年起，Web 2.0 时代到来。

### JavaScript 及其与 jQuery 的关系

脚本语言是对HTML最重要的扩展，它实现了 Web 应用的客户端逻辑，这些脚本语言是解释型语言，在宿主环境（浏览器）中于运行时翻译执行。新的浏览器含 JS 的即时编译器，翻译后的代码可重复执行。

JS的容器是`<script>`标签，如：`<script type="text/javascript">...</script>`，其中`text`是主类型，类型必须小写。

当使用引用时，标签的内容不能有，如：`<script type="text/javascript" src="x.js"></script>`。

### AJAX 和 XMLHttpRequest

AJAX 描述了确保 Web 应用在 Web 服务器请求新数据的情况下也能实时反应的一种方法。异步请求附加数据集成到页面的技术理论上在 1998 年已经出现，只有 2005 年出现的 AJAX 这一术语以及流行词 Web2.0 相对新颖。

AJAX 在推出是是作为 JavaScript 对象模型的扩展，为了支持这种异步通信，现代浏览器提供了一个内建接口，控制来自独立于浏览器“常规”数据请求运行的客户端编程语言 HTTP 事务。这个接口采用 XMLHttpRequest 对象的形式，作为 JavaScript 对象模型的一个扩展。这些 XHR 直接面向 HTTP 内部结构，形成每个 AJAX 请求的骨架。


为了在浏览器和 Web 服务器之间进行异步通信，XHR 对象使用函数引用，允许注册回调函数，这些函数在每次事务状态变化时解释运行。可以使用 XHR 对象访问 AJAX 请求或响应的所有 HTTP 头标字段。

XML 描述了一种基于 Unicode 的平台无关纯文本标准，用于创建机器与人类可理解的文档，交换任何类型的信息。XML 文档采用树型结构，允许浏览树的单个分支。

XML 文档的组成部分称为组件（Component），基本结构由元素组成。区分大小写，以序言（Prolog）开始。最简单的序言：`<?xml url="www.rjs.de"></rjs>`，紧跟后面的是根元素。

任何 XML 文件都可以看作 DOM。

JSON对象定义以`{`开始。

### DOM 和对象

因为缺乏某些真正面向对象语言所需要的特性，JS 被认为是基于对象的语言，而不是面向对象的语言。

### 样式表和 DHTML

选择器：

- 元素选择器
- 特性选择器
- 代选择器
- 全局选择器
- 伪类

## 第 4 章 -- jQuery 工作原理

### jQuery 命名空间和 jQuery 对象

命名空间指明了一个范围，其中特定的标识符都是唯一的，目录也可以看作命名空间，但是 JS 不支持命名空间的概念。

jQuery 引入命名空间。在框架中，所有全局对象被指定在一个命名空间内，该命名空间用以jQuery标志开始、分隔符（句点）之后带上真正名称的标识符定义。以后，被标识的元素--从框架的角度--被指定到 jQuery 命名空间。

### jQuery 中的特殊数据类型和结构

选项的 key 使用引号括起来。

### jQuery 函数和`$()`别名

`$()`第二个参数（可选）指定上下文，指元素可见的环境。若不指定，则上下文为整个 HTML 文档。否则可以指定一个 DOM 元素、文档或 jQuery 对象作为上下文，然后，元素仅在这个上下文中可见。如：

```
$('input:radio', document.forms[0]);
```

仅在网页的第一个表单中寻找所有类型特性为Radio的输入元素（即单选按钮）。

再如：`$('h1', 'div').css({background: 'red', color: 'white'});`。

### 在 DOM 构建之后执行函数

```
$(function(){
  $('#id').html($('.class').attr('title'));
});
```

可以使用多个`$(document).ready(function(){...});`。

### 用 jQuery() 创建一个元素并将其插入网页

```
$(function(){  
  var block = $('<div>sth</div>');
  $('<div>first</div>').appendTo('body');
  block.appendTo('body');
});
```

在 DOM 创建之后，第二行创建了一个类型为 DIV 的 jQuery 元素，第三行创建 DIV 后插入 BODY 元素内。

这里的jQuery元素也可以有第二个参数。如：

```
$(function(){  
var block = $('<div/>', {
  css: {
    background: 'red',
    color: 'white'
  },
  html: 'A block with parameters<br />',
  click: function(){
    $(this).fadeOut('slow');
  }
});
var p = $('<p />', {
  title: 'I am a p.',
  text: 'I am a p.'
});
$('<h1 />', {
  text: 'Dynamically Creating Elements'
}).appendTo('body');
block.appendTo('body');
p.appendTo(block);
});
```

### 用 jQuery() 包装现有元素

```
'document' in window; //true
window.hasOwnProperty('document'); //true
```

### 使用 jQuery 和其他框架结合

`jQuery.noConflict()`函数必须在 jQuery 程序库集成之后，集成和使用导致冲突的其他程序库之前调用。它返回 jQuery 对象，所以可以将其赋予一个单独的变量。如：

```
var $j = jQuery.noConflict();
$j(function(){
  alert($j('img').get().length);
});
```

可以将所有 jQuery 代码打包到`ready()`方法中。在这个区域中，有一个单独的命名空间，可以在其中使用`$`。在这个方法之外，`$`将代表 Protype 功能。如：

```
jQuery.noConflict();
jQuery(document).ready(function($){
  //$ here stands for jQuery
});
//Here $ stands for the other variation
```

### 关于上下文的更多知识

`this`总是引用当前上下文（当前所有的对象）。在基本设置中，`this`引用浏览器窗口（DOM 中的 window 对象）。

```
$('img').context.nodeName; //#document
$('div', document.body).context.nodeName; //BODY
$('img', document.getElementsByTagName('div')[0]).context.nodeName; //DIV
$('img', document.getElementsByTagName('div')[0]).selector; //img
```

### 链接 jQuery 对象

```
$(function(){  
  $('body').append('first this').css({
    background: 'red'
  }).append('<hr />').append('second.');
}); //此时的背景是body的
```

## 第 5 章 选择器和过滤器

### 基础知识

XML 路径语言（XML Path Language, XPath）是 W3C 为访问 XML 文档（或者树形结构）组件开发的一种查询语言。XPath 对 XML 的作用往往被比作数据库中 SQL 的作用。在 jQuery 中，选择器和过滤器由经典的 CSS 选择器和 XPath 组合而成。

### 过滤选择器

基本过滤器：

- `:header` 所有标题组成的一个数组
- `:animated` 所有当前正在动画的元素组成的数组
- `:focus` 选择当前处于焦点上的元素

内容过滤器：

- `:contents`
- `:empty`
- `:has(元素)` 
- `:parent`

可见性过滤器：

- `:hidden` 选中所有隐藏的元素

表单元素过滤器：

- `:button` 所有按钮和类型为按钮的元素组成的数组
- `:checkbox`
- `:text`

表单过滤器：

- `:checked`
- `:disabled`

## 第 6 章 -- 访问网页的元素

如果通过 jQuery 对象访问网页中的元素，不能直接访问常规的 DOM 属性和方法。可以用`get`获得原生 DOM 节点，但是这样就明确放弃了 jQuery 命名空间及其相关的语法以及对浏览器错误的保护。

节点内容：`html()` & `text()`。

表单字段的内容：`val()`。可以使用`attr()`或`prop()`替代`val()`。

### 插入节点

- `append()` & `prepend()` 子元素的最后和最前插入元素
- `appendTo()` & `prependTo()` 

### 日期组件

nice 啊！这个插件已经开发了 7 成，手动测试日期显示正常，基本够用了，剩下的以后做。

```
// 使用方法
// HTML
<div id="trDate"></div>
// JavaScript
$('#trDate').trDate();
```

## 第 7 章 -- 在 jQuery 中使用样式表格式化

### `css()`方法

```
// 获取属性值
var color = $(this).css('backgroundColor'); // 虽然可以使用驼峰大小写，但为了统一，还是使用 background-color 这种形式
// 设置一个属性值
$(this).css('color', 'red');
// 设置多个属性值
$(this).css({
  'color': 'yellow',
  'font-size': '14px'
});
```

### 修改元素的类

#### 添加类、删除类、切换类

```
$('#id').addClass('myClass1 myClass2'); // 多个类使用空格分隔
$('#id').removeClass('myClass3');
$('#id').toggleClass('myClass4');
```

#### 测试类

```
$('#id').hasClass('myClass5'); // 布尔值，是否含有 .myClass5
```

### 定位方法

`position`确定位置：

```
var pos = $('img:first').position();
var l = pos.left;
var t = pos.top;
```

用`offset`相对定位文档：

```
```

### 滚动方法

使用`scrollTop` & `scrollLeft`可以获取元素从顶部或者从左侧已经滚动的值。向该方法传递一个整数值（与外围的偏移父元素相关）作为参数，可以将该元素移动指定的像素数。

```
$('#id').scrollTop(222);
```

### 宽高

```
$('#id').width(); // 内容宽，带参则设置宽度
```

### 内部和外部尺寸

```
$('#id').innerWidth(); // width + padding
$('#id').outerWidth(); // innerWidth + border
$('#id').outerWidth(true); // outerWidth + margin
```

## 第 8 章 jQuery 下的事件处理

JavaScript 事件处理器：

```
// HTML
<form name="myForm">
  <input type="button" name="myButton" value="OK" />
</form>
// JavaScript
<script language="JavaScript">
  document.myForm.myButton.onclick = myfunction; // name 的使用方法。函数引用不允许使用括号，确切地说这不是一次调用，这里也可以使用匿名函数代替
</script>
```

### jQuery 中的事件与对象

#### jQuery.Event 构造程序

```
var e = jQuery.Event('click'); // or var a = new jQuery.Event('click');
```

#### jQuery.Event 事件对象的属性

- `event.type` 事件类型。如鼠标单击或键盘输入等事件
- `event.target` 获得触发事件的 DOM 元素，这个元素可能是注册该事件的元素或其子元素
- `event.data` 重要！如果将 event.data 传递给`bind`且当前执行处理器被绑定，它能提供可选的数据
- `event.relatedTarget` 在鼠标移动的情况下，如在 innerDiv 上绑定了 mouseout 事件，则当鼠标移到 outerDiv 时，其 nodeName 为 outerDiv，这是一个有关联的节点
- `event.currentTarget` 获取冒泡阶段中当前的 DOM 元素，该特性通常等价于函数中的`this`
- `event.pageX / event.pageY` 鼠标事件发生的 X 和 Y 坐标，相对于文档的坐标
- `event.screenX / event.screenY` 屏幕坐标
- `event.result` 事件处理器返回的最后值
- `event.timeStamp` 事件创建的时间戳，单位为毫秒

#### jQuery.Event 类型对象的方法

和事件对象相关的还有一些方法，主要用于阻止浏览器的某些默认响应：

- `event.preventDefault()` & `event.isDefaultPrevented()` 
- `event.stopPropagation()` & `event.isPropagationStopped()` 阻止事件对象在树中的冒泡过程
- `event.stopImmediatePropagation()` & `event.isImmediatePropagationStopped()`

### `$(document).ready()`

**jQuery 事件助手**

|名称|描述|
|:---:|:---:|
|`blur`|不使用参数，调用该方法意味着触发匹配元素的`blur`事件；使用参数，该事件助手为每个匹配元素绑定一个函数|
|`change`|无参表示为每个匹配元素触发`change`事件；有参表示为元素绑定函数|
|`dblclick`|触发元素的`dblclick`事件；有参表示将函数绑定到元素的双击事件|
|`keydown`|对应按下，此时对应的字符还没有在键盘缓冲内，无法处理|
|`keyup`|对应释放，通过键盘码可以得到该字符；有参表示将函数绑定到匹配元素的`keyup`事件|

### 事件的扩展方法

`bind`方法使用两个或三个参数，并返回一个 jQuery 类型的对象。`one`与`bind`类似，只是只执行一次。

```
// 触发当前点击的图像的单击事件
$('img').click(function(){
  $(this).css({
    width: '400px'
  });
});
$('img').dblclick(function(){
  $(this).css({
    width: '80px'
  });
});
// 触发了所有图像上的单击事件
$('button:first').click(function(){
  $('img').trigger('click');
});
```

```
$('img').hover(function(){
  $('#output').text(this.alt);
}, function(){
  $('#output').text('');
});
```

## 第 9 章 -- 特效与动画

```
$('img:first').fadeIn('slow', function(){
  alert('Done');
});
// 停止动画
$('button:first').on('click', function(){
  $('img').fadeOut('slow');
});
$('button:eq(1)').on('click', function(){
  $('img').stop();
});
// 永不停止的动画
function ani(){
  $('img').slideToggle(3000, ani);
}
```

`jQuery.fx.off`是一个全局设置，值为`true`表示禁用所有动画，元素立即设置成其最终状态。

**动画类型：**

- `easeInBack`
- `easeInBounce`
- `easeInCirc`
- `easeInOutBounce`
- `easeInOutCirc`
- `easeInOutQuint`
- `easeInOutSine`
- `easeInSine`
- `easeOutBounce`
- `easeOutCirc`
- `easeOutQuint`
- `easeOutSine`
- `linear`
- `swing` 默认操作

### 显示`show()`和隐藏`hide()`

### 滑动特效：`slideDown()`、`slideUp()`、`slideToggle()`

### 透明度：`fadeIn()`、`fadeOut()`、`fadeTo()`

`fadeIn()`使元素可见。

```
$('button:first').click(function(){
  $('img:eq(1)').fadeTo('slow', 0.2, function(){
    alert('Done');
  });
});
```

### `animate()`实现单独动画

```
animate(style object with properties[, time factor][, easing][, callback]);

$('#id').animate({
  width: '50%',
  opacity: 0.1,
  top: '100px'
}, 3000, 'swing');
```

## 第 10 章 -- AJAX

## 第 11 章 -- [jQuery UI](http://jqueryui.com)

jQuery 框架提供的视觉控制元素。

### 什么是 jQuery UI

窗口小部件（Widget）：

- Accordion
- Autocomplete
- Button
- Datepicker
- Dialog
- Progressbar
- Slider
- Tabs
- Tooltip

没有目录树！

jQuery UI 不包含在常规的 jQuery 程序库中。

jQuery UI 版本总是和一个特定的 jQuery 版本搭配。

## 第 12 章 -- 插件

整个 jQuery 框架由 jQuery 核心和 jQuery UI 组成。但是，该框架可以按自己的喜欢进行扩展，即插件（Plug-in）。它们是纯粹的 JavaScript 和 CSS 库，可以在[官网](http://plugins.jquery.com)上免费下载。

使用关键字“Treeview”搜索扩展库里的目录树。

### 创建自定义插件

编写打算提供的方法和函数，把这些功能分配给特定的命名空间：用于方法的 jQuery.fn 和用于函数的 jQuery，该插件命名为：jquery.[插件名称].js。

```
// 将方法赋予 jQuery.fn 对象
jQuery.fn.dragWithStatusLight = function() {
  return this.each(function() {
    $(this).css({
      border: '5px solid yellow',
      cursor: 'move'
    });
    $(this).draggable({
      start: function(event, ui) {
        $(this).css({
          opacity: 0.5
        });
      },
      stop: function(event, ui) {
        status = '';
        $(this).css({
          opacity: 1
        });
      },
      drag: function(event, ui) {
        status = 'X/Y-Coordinates: ' + event.pageX + ' / ' + event.pageY;
      }
    });
  });
};
```

上例功能与`draggable()`方法提供的一样。

使用方法：`$('img').dragWithStatusLight();`。

用于设置默认值的 jQuery.extend 或 jQuery.fn.extends 选项。

```
// 为上面示例定义默认值
jQuery.fn.dragWithStatusLight = function(options) {
    default = jQuery.extend({
      border: '3px solid red',
      cursor: 'move',
      opacity: 0.6
    }, options);
    return this.each(function() {
      $(this).css({
        border: default.border,
        cursor: default.cursor
      });
      // 此处省略剩余代码
    });
};

// 使用
$('img').dragWithStatusLight({border: '8px', opacity: 0.3}); // 这样自定义参数整合到默认参数里
```

## 第 13 章 -- [jQuery Mobile](http://jquerymobile.com)

[jQTouch](http://jqtouch.com)是个好东西。

## 附录

JavaScript 在变量、关键字、函数标识符和方法标识符中区分大小写。

字面量是一种清晰定义和不能修改的值，例如数字或者文本；变量是可以临时存储值的内存命名位置。字面量和变量都需要数据类型，它规定了变量或字面量在主存中的大小、信息的类型以及操作如何进行。






























































































































































































































