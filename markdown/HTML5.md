## 初探 HTML

`href` 是 `<a>` 的专有属性，`class` 和 `id` 等则是全局属性。

布尔属性：`<input disabled>`，用于禁止用户输入数据。当禁止输入时，可以只写`disabled`，值为它本身。

自定义属性：通常以 `data-` 开头。

处理 HTML 文档的软件有浏览器等，叫做用户代理（user agent）。

XHTML 是 HTML 的 XML 序列化形式，方便 XML 解析程序处理。

HTML 文档的外层结构由两个元素确定：`DOCTYPE` 和 `html`。

元素类型：

- 元数据元素（metadata element）：构建 HTML 文档的基本结构，就如何处理文档向浏览器提供信息和指示
- 流元素（flow element）：短语元素的超集
- 短语元素（phrasing element）：确定一个元素合法的父元素和子元素范围，是 HTML 的基本成分

`li` 元素不属于上述三种，它表示列表项，只有三种父元素--`<ol>`、`<ul>`、`<menu>`。

HTML 文档中有些字符具有特殊含义，有时候需要在文档内容中用到这些字符，但不想让它们被当做 HTML 处理。为此应该使用 HTML 实例（entity），实例是浏览器用来替代特殊字符的一种代码。如下：

|字符|实体名称|实体编号|
|:---:|:---:|:---:|
|`<`|`&lt;`|`$#60;`|
|`>`|`&gt;`|`&#62;`|
|`&`|`&amp;`|`&#30;`|

### 全局属性

- `accesskey`：用于选择页面上元素的快捷键，与`Alt`组合使用
- `class`：将元素归类。一个元素可以被归入多个类型，使用空格分隔开类名。`document.getElementsByClassName('x');`
- `contenteditable`：用于修改页面上的内容，属性值为`true`时可编辑
- `contextmenu`：用于为元素设定快捷菜单
- `dir`：用于规定元素中文字的方向。有两个值：`ltr`和`rtl`，类似于`float: left`和`float: right`
- `draggable`：用于表示元素是否可被拖放
- `dropzone`：与`draggable`属性搭配使用
- `hidden`：隐藏该元素
- `id`：用于选择元素，也可以用于导航文档中的位置。如使用`example.html#myElement`这个URL可直接导航到该元素。`#`及其后的部分称为 URL 片段标识符
- `lang`：说明元素内容使用的语言
- `spellcheck`：用于表示浏览器是否应该对元素的内容进行拼写检查，仅用于可编辑的元素上才有意义
- `style`
- `tabindex`：通过按`Tab`键在各元素之间切换，值为1的元素会被第一个选中
- `title`：提供了元素的额外信息

## 初探CSS

用于规定HTML文档的呈现形式（外观和格式编排）。

`<span>`元素可以设置`padding`和`background`并大于父元素尺寸，但不影响父元素的排列。`background`会覆盖父元素前一个元素，也会被父元素后一个元素覆盖。

想要掌握样式表，需要弄清层叠和继承两个概念。

### 样式如何层叠

就近原则（离元素越近的样式优先被采用）：

- 元素内嵌样式：用元素的全局属性`style`定义
- 文档内嵌样式：定义在`<style>`元素中的样式
- 外部样式：通过`<link>`引入的样式
- 用户样式：用户定义的样式
- 浏览器默认样式

`!important`可以改变上述规则。

如果没找到直接相关的样式，会求助于继承机制，使用父元素的这个样式的属性值。

与元素外观（文字颜色、字体等）相关的样式会被继承；与元素在页面上的布局相关的样式不会被继承。在样式中使用`inherit`值可以强行继承。

[CSS3颜色值](http://www.w3.org/TR/css3-color/)

|颜色名|RGB|十进制|
|:---:|:---:|:---:|
|black|\#000|0, 0, 0|
|silver|\#C0C0C0|192, 192, 192|
|gray|\#808080|128, 128, 128|
|white|\#FFF|255, 255, 255|
|maroon|\#800|128, 0, 0|
|red|\#F00|255, 0, 0|
|purple|\#800080|128, 0, 128|
|fuchsia|\#F0F|255, 0, 255|
|green|\#008000|0, 128, 0|
|lime|\#0F0|0, 255, 0|
|olive|\#808000|128, 128, 0|
|yellow|\#FF0|255, 255, 0|
|navy|\#000080|0, 0, 128|
|blue|\#00F|0, 0, 255|
|teal|\#008080|0, 128, 128|
|aqua|\#0FF|0, 255, 255|

另外还有`hsla(h, s, l, a)`表示法。

- 色相：hue
- 饱和度：saturation
- 明度：lightness

CSS相对单位：

- `em`：与元素字号挂钩，即内`font-size`属性值推算而来
- `rem`：与根元素字号挂钩
- `px`：像素
- `%`：另一属性的值的百分比

百分比：

- `font-size`：与元素继承到的`font-size`值挂钩
- `width`：与元素的包含块宽度挂钩

## 初探JavaScript

两本入门书：David Flanagan写的JavaScript: The Definitive Guide和Ross Harmes & Dustin Diaz合编的JavaScript Design Patterns。

不支持多态，若是定义两个同名、同参数数的函数，后一个覆盖前一个。

将函数添作对象的方法，是我最喜欢JavaScript的原因。函数作为方法使用时，其所属对象会以关键字`this`的形式传递给方法。如：`obj.sayHello()`，那么`sayHello()`中的`this`指`obj`。

检测对象是否具有某个属性：`'propName' in obj`，结果为布尔值。

字符串连接符比加法运算优先级高：`5 + '5'`结果为`55`。连接字符串可以：`(5).toString() + String(5);`。另外：`(15).toString(16)`结果为`f`。

`null`是没有值，`undefined`是值未定义。

## HTML元素

HTML5新增的元素有具体的含义，所以应发挥元素的语义作用。如果找不到适合自己所要含义的元素，使用通用元素，如`<div>`或`<span>`等 ，并用全局属性`class`表明其含义。

元数据类型，用于说明文档，它们本身不是文档内容，但提供了关于后面文档内容的信息，应放于`<head>`元素中：

- base：设置相对URL的基础
- link：定义与外部资源的关系
- meta：提供关于文档的信息
- script：定义脚本程序，可以文档内嵌也可以连接外部资源。它和noscript也都是短语类型
- style：定义CSS样式
- title：设置文档标题

文本元素（都是短语元素）用来为内容提供基本的结构和含义：

- a：生成超链接，也是流元素类型
- abbr：<abbr title="这里是全称">缩略语</abbr>
- b：<b>不带强调或着重意味地标记一段文字</b>
- bdo：<bdo dir="rtl">从右往左显示本文本</bdo>
- br：表示换行
- cite：表示其它作品的标题
- code：<code>表示计算机代码片段</code>
- del：表示从文档中删除的文字，也是流元素类型
- dfn：<dfn title="define">表示术语定义</dfn>
- em：<em>表示着重强调的一段文字</em>
- i：<i>表示与周边内容秉性不同的一段文字，例如来自另一语言的词语</i>
- ins：表示加入文档的文字，也是流元素类型
- kbd：<kbd>表示用户输入内容</kbd>
- mark：<mark>添加背景色，chrome里是黄色<mark>
- q：<q cite="http://www.turuir.cn">表示引自它处的内容</q>
- rp：与ruby元素结合使用，标记括号
- rt：与ruby元素结合使用，标记注音符号
- ruby：表示位于表意文字上方或右方的注音符号
- s：<s>表示文字已不再准确</s>
- samp：<samp>表示计算机程序的输出内容</samp>
- small：<small>表示小号字体内容</small>
- span：一个没有自己语义的通用元素
- strong：<strong>表示重要内容</strong>
- sub：X<sub>下标</sub>
- sup：X<sup>上标</sup>
- time：表示时间或日期
- u：<u>不带强调或着重意味地标记一段文字</u>
- var：<var>表示程序或计算机系统中的变量</var>
- wbr：表示可安全换行的地方

<ruby>魑<rp>(</rp><rt>chi</rt><rp>)</rp></ruby>

用于表示分组的元素（流类型）：

- blockquote：<blockquote>表示引自它处的大段内容</blockquote>
- div：一个没有任何既定语义的通用元素，是span元素在流元素中的对应物
- dl：表示包含一系列术语和定义的说明列表
- figure：表示图片
- hr：表示段落级别的主题转换
- ol：表示有序列表
- ul：表示无序列表
- p：表示段落，多个空格合并为一个空格对待
- pre：表示其格式应被保留的内容，源代码时特别有用，与`<code>`配合使用

无类型的元素：

- body：表示HTML文档的内容
- DOCTYPE：表示HTML文档的开始
- head：包含文档的元数据，最少应该含title元素
- html：表示文档中HTML部分的开始
- dd：用在dl元素中，表示定义
- dt：用在dl元素中，表示术语
- figcaption：表示figure元素的标题
- li：用在ul、ol和menu元素中，表示列表项
- summary：用在details元素中，表示该元素内容的标题或说明

说明列表：

<dl>
  <dt>Apple</dt>
    <dd>The apple is the pomaceous fruit of the apple tree</dd>
    <dd><i>Malus domestica</i></dd>
  <dt>Banana</dt>
    <dd>The banana is the parthenocarpic fruit of the banana tree</dd>
    <dd><i>Musa acuminata</i></dd>
</dl>

使用插图：

```
<figure>
  <figcaption>Listing</figcaption>
  <code>
    var a = 1;
  </code>
</figure>
```

划分内容的元素（即文档分节，流类型）：

- address：表示文档或article的联系信息
- article：表示一段独立的内容
- aside：表示与周边内容稍有牵涉的内容
- details：生成一个区域，用户将其展开可以获得更多细节知识
- footer：表示尾部
- h1 ~ h6：表示标题
- header：表示首部
- hgroup：将一组标题组织在一起，以便文档大纲只显示其中第一个标题
- nav：表示有意集中在一起的导航元素
- section：表示一个重要的概念或主题
- table：表示表格

```
<details>
    <summary>WTF</summary>
    <p>What the fuck.</p>
</details>
```

制表（无类型）：

- caption：表示表格标题
- col：表示一列
- colgroup：表示一组列
- tbody：表示表格主体
- td：表示单元格
- tfoot：表示表脚
- th：表示标题行单元格
- thead：表示标题行
- tr：表示一行单元格

创建表单：

- datalist：定义一组提供给用户的建议值，流
- fieldset：表示一组表单元素，流
- form：表示HTML表单，流
- button：表示可用来提交或重置表单的按钮或一般按钮，短语
- input：表示用来收集用户输入数据的控件，短语
- keygen：生成一对公钥和私钥，短语
- label：表示表单元素的说明标签，短语
- output：表示计算结果，短语
- select：给用户提供一组固定的选项，短语
- textarea：用户可以用它输入多行文字，短语
- legend：表示fieldset元素的说明性标签，无
- optgroup：表示一组相关的option元素，无
- option：表示供用户选择的一个选项，无

嵌入内容（短语）：

用于在HTML文档中嵌入内容

- area：表示一个用于客户端分区响应图的区域
- canvas：生成一个动态的图形画面，也是流
- embed：用插件在HTML文档中嵌入内容
- iframe：通过创建一个浏览上下文在一个文档中嵌入另一个文档
- img：嵌入图像
- map：定义客户端分区响应图，也是流
- meter：嵌入数值在许可值范围背景中的图形表示
- object：在HTML文档中嵌入内容，也可用于生成浏览上下文和生成客户端分区响应图，也是流
- progress：嵌入目标进展或任务完成情况的图形表示，无
- param：表示将通过object元素传递给插件的参数，无
- source：表示媒体资源，无
- svg：表示结构化矢量内容，无
- track：表示媒体的附加轨道，发字幕，无
- video：表示视频资源，无
- audio：表示一个音频资源，无

## 创建HTML文档

`<base href="http://www.x.x/x/" />`，若没设置基准URL，则以当前网页所在目录变基准生成绝对链接。

指定样式适用的媒体：`<style media="screen AND (max-width: 640px)" type="text/css">...</style>`。

浏览器在遇到带有`defer`属性的`<script>`时，会将脚本的加载和执行推迟到HTML文档中所有元素都已经解析之后。`defer`只能用于外部脚本文件，对文档内嵌脚本无用。如：`<script defer src="x.js"></script>`。

异步执行脚本：`<script async src="x.js"></script>`，浏览器将在继续解析HTML文档中其它元素（包括其它`<script>`）的同时异步加载和执行脚本。使用`async`不能确保脚本的执行顺序。

这本权威指南的内容太细了，估摸着是把W3C的文档整个给翻译并解释了一遍，总共40章800多页。一章章做笔记未免太浪费时间，粗略浏览一遍，对HTML5、CSS3有最新的了解，当需要时再去看官方文档。HTML5新增了图像、位置、存储、多任务等功能：

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