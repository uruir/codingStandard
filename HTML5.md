HTML5新增了图像、位置、存储、多任务等功能：

- video/audio 
- localStorage，浏览器关闭后数据依然存在；而 sessionStorage 关闭后数据删除。它们都有更大的存储空间，也有更丰富易用的接口。cookie 会在 C/S 间来回传递，而 localStorage/sessionStorage 不会 
- 内容元素：header/nav/section/article/footer 
- 表单控件：calendar/date/time/email/url/search 
- 新技术：webworker/websocket/geolocation

HTML5移除的元素：frame等

iframe 会阻塞主页面的 onload 事件，它和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载；若需要使用 iframe，可通过JS动态给 iframe 添加`src`属性值，即可绕过上述问题。

### Property & Attribute区别

- Property：DOM中的属性，JavaScript中的对象
- Attribute：HTML标签中的特性，值是字符串

#### 创建时

- DOM对象初始化时会在创建默认的基本property
- 只有在HTML标签中定义的attribute才会被保存在property的 attributes 属性中，即attr是prop的子集
- attribute会初始化property中的同名属性，但自定义的attribute不会出现在property中
- attribute的值都是字符串

#### 数据绑定

- attributes的数据会同步到property上，然而property的更改不会改变attribute
- 对于value，class这样的属性/特性，数据绑定的方向是单向的，attribute->property
- 对于 id 而言，数据绑定是双向的， attribute<=>property
- 对于disabled而言，property上的disabled为false时，attribute上的disabled必定会并存在，此时数据绑定可以认为是双向的

#### 使用

- 可以使用DOM的setAttribute方法来同时更改attribute
- 直接访问attributes上的值会得到一个Attr对象，而通过getAttribute方法访问则会直接得到attribute的值
- 大多数情况（除非有浏览器兼容性问题），jQuery.attr是通过setAttribute实现，而jQuery.prop则会直接访问DOM对象的property

所以property是DOM对象自身就拥有的属性，而attribute是我们通过设置HTML标签而给之赋予的特性，attribute和property的同名属性/特性之间会产生一些特殊的数据联系，而这些联系会针对不同的属性/特性有不同的区别。

#### 总结

- attribute（特性），是我们赋予某个事物的特质或对象。\$('#id').attr()
- property（属性），是早已存在的不需要外界赋予的特质。\$('#id').prop()

## 介绍

之前版本的 HTML4.01 发布于 1999 年。HTML5 是 World Wide Web Consortium（W3C）和 Web Hypertet Application Technology Working Group（WHATWG）协作的产物，开始于 2006 年。W3C 负责 XHTML2.0，WHATWG 负责 Web 表单和应用。

### DOCTYPE

```
<!DOCTYPE html>
```

### 新特性

- 包含了2D绘图元素`<canvas>`
- 支持了多媒体标签，如，`<video>`和`<audio>`
- 支持本地存储，可以作为cookie的替代特性
- 新的元素，如，`<article>`, `<footer>`, `<header>`, `<nav>`, `<aside>`, `<section>`等
- 新的表单控制元素，日历，日期，时间，url，搜索等

### 新的符合语义及其结构化的元素

|标签|标签描述|
|:---:|:---:|
|`<summary>`|为<details>标签定义一个可被查看的标题|
|`<figcaption>`|定义figure属性的标题|
|`<ruby>`|定义一个ruby注解 (为东亚文字排版设计)|
|`<bdi>`|定义一个可能用不同方向格式来显示的文字区域|
|`<rt>`|定义一个可解释或者可朗读的字符(为东亚文字排版设计)|
|`<section>`|定义一个文档区域|
|`<header>`|定义一个文档或者section区域的页头内容|
|`<footer>`|定义一个文档或者内容的页底内容|
|`<article>`|定义一个文章|
|`<command>`|定义一个用户可能调用的命令按钮|
|`<rp>`|定义不被ruby注释支持的内容的显示|
|`<progress>`|定义内容的进度|
|`<wbr>`|定义可能得换行|
|`<nav>`|定义导航链接|
|`<time>`|定义时间|
|`<details>`|定义用户可能阅读或者隐藏的更多细节内容|
|`<aside>`|定义页面内容旁边内容。例如，广告|
|`<mark>`|定义骠骑和高亮内容|
|`<hgroup>`|当标题拥有多层时用来将一套<h1>到<h6>的元素分组|
|`<figure>`|指定自包含的内容，例如，插图，图表，图片，代码等|
|`<meter>`|按照指定的区域来定义一个梯度管理器|

## 媒体元素

以前播放视频，大多需要专门下载flash播放器，在Ubuntu下的支持不是很好。而HTML带来内嵌的媒体元素，无需要其它播放器即可播放多媒体。

### video元素

Internet Explorer 9, Firefox, Opera, Chrome, 和Safari都支持。 IE8及其更早的浏览器不支持。

```
<video width="320" height="240" controls="controls" id="gbin1">
  <source src="示例视频.mp4" type="video/mp4" />
  <source src="示例音乐.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video>
```

以上的控制属性可以添加视频相关的控制，例如，播放，暂停和音量。

当然，如果必要我们也需要添加高度和宽度。如果高和宽设定后，页面加载后针对这个视频的区域的大小会预留出来。如果没有相关高和宽的属性，浏览器则不能正确预留显示视频区域。效果就是页面加载过程中，页面布局可能变化。

应该在<video>和</video>元素内容间加入文字内容，这样可以保证如果浏览器不支持video标签。页面能够显示正确的文字。

video标签允许加入多个<source>元素。这些元素可以链接到不同的视频文件。当然，浏览器会使用第一个识别出的格式。

HTML5 video元素也拥有方法，属性和事件。这里有播放，暂停和加载的相关方法，同时也拥有你可以操作的相关duration，volume和seeking属性。同时拥有当你开始播放，暂停和结束时通知你的DOM事件。

```
<section>
    <div id="container" style="text-align:center">
        <button onclick="playPause()">Play/Pause</button>
        <button onclick="makeBig()">Big</button>
        <button onclick="makeSmall()">Small</button>
        <button onclick="makeNormal()">Normal</button>
        <br />
        <video id="video" width="420">
            <source src="示例视频.mp4" type="video/mp4" />
            <source src="示例音乐.ogg" type="video/ogg" />
            你的浏览器不支持Video标签
        </video>
    </div>

    <script type="text/javascript">
        var myVideo=document.getElementById("video");

        function playPause()
        {
            if (myVideo.paused)
                myVideo.play();
            else
                myVideo.pause();
        }

        function makeBig()
        {
            myVideo.width=560;
        }

        function makeSmall()
        {
            myVideo.width=320;
        }

        function makeNormal()
        {
            myVideo.width=420;
        }
    </script>
</section>
```

### audio元素

用于播放音频文件，支持的浏览器有：IE9, Firefox, Opera, Chrome和Safari都支持<audio>元素。

```
<audio controls="controls">
  <source src="示例音乐.ogg" type="audio/ogg" />
  <source src="另一个示例音乐.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
```

### 拖放/拖拽（Drag and Drop）

这是个非常普遍的功能。你可以抓住一个对象，并且拖动到你想放置的区域。很多javascript都类似实现了相关的功能，例如，jQueryUI的drag and drop组件。

在HTML5中，拖放/拖拽(drag and drop)是标准，任何元素都支持。IE9，Firefox，Chrome和Safari 5都支持这个特性。

### Canvas

Canvas是HTML5中的画布API，用来在浏览器上快速的绘制图形图像。

HTML5 `<canvas>`元素可以用来通过使用脚本来绘制图形图像。`<canvas>`元素只是一个图形的容器，必须使用脚本来绘制图形。

一个canvas是一个可以绘制的HTML定义的区域，拥有高度和宽度等属性，拥有几个绘制路径，矩形，圆形，字符和添加图片的方法。

### Geolocation

HTMl5 Geolocation API用来得到用户的地理位置，使用getCurrentPosition()方法得到用户的位置。

HTML5相比HTML

- 提供更富语义的标签，以便更好的被机器识别
- SVG + Canvas + WebGL，无插件的动画，图像
- 离线存储，offline应用
- websocket，改变pull历史，实现服务器端数据主动推送

优点：因为之前是先事实再标准，所以各主流浏览器各自为政。而HTML5是实现与标准并行，用自有标签代替FLASH等标签，推动浏览器统一化。

而XHTML是参照XML来规范他HTML，使其格式更标准，可以理解为HTML4 + XML。

SGML有多个实现，它们的头部有`<!DOCTYPE>`字样，用于指明该文档使用的DTD（Document Type Definition）。

HTML5不需要DTD，使用`<!DOCTYPE html>`。

HTML4构建一个常规网页，使用`<div id="header">`等定义网页结构。而HTML5使用更易读的标签

- header
- nav
- article
- section
- sidebar

HTML5中的`datalist`元素，提供文本框自动完成功能。

```
<input list="Country">
<datalist id="Country">
  <option value="India">
  <option value="Italy">
  <option value="Iran">
  <option value="Israel">
  <option value="Indonesia">
</datalist>
```

![](http://ww1.sinaimg.cn/mw690/7cc829d3gw1eldezeiai9j205204adfp.jpg)

HTML5中新的表单元素

- color：`<input type="color" name="favcolor">`
- data：显示日历
- datatime-local：含本地时间的日历
- email：校验
- url
- number：`<input type="number" min="0" max="100">
- range：`<input type="range" min="1" max="10" step="2" value="7">
- search
- time：只能输入时间
- tel：电话号码校验

输出元素

```
<form onsubmit="return false"  oninput="o.value = parseInt(a.value) + parseInt(b.value)">
  <input name="a" type="number"> +
  <input name="b" type="number"> =
  <output name="o" />
</form>
```

SVG（Scalable Vector Graphics可缩放矢量图形）表示可缩放矢量图形。他是基于文本的图形语言，使用文本，线条，点等来进行图像绘制，这使得他轻便，显示更加迅速。

| SVG | Canvas |
| :---: | :---: |
|绘制的图形能被记忆和操作，浏览器可以再次将其显示|绘制完后并不能访问|
|像CAD绘制的图形那样，可以操作|动画或游戏，显示完了就say goodbay|
|需要记录元素坐标，绘制缓慢|不记忆坐标，速度快|
|分辨率无关，可缩放|分辨率有关|

CSS（Cascading style sheets）

本地存储

```
localStorage.setItem('country', 'India');
var country = localStorage.getItem('country');
```

音频标签

```
<audio controls>
    <source src="Lonely.mp3" type="audio/mpeg">
    Your browser does’nt support audio embedding feature.
</audio>
```

视频标签

```
<video width="450" height="340" controls>
  <source src="demo.mp4" type="video/mp4">
   Your browser does'nt support video embedding feature.
</video>
```