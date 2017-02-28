## DOM 概况

文档对象模型是 HTML or XML 等具有树形结构的文档的 API，是文档的对象表示，它描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。HTML 的根元素是`document`对象。

HTML5 不基于 SGML（标准通用标记语言），因此不需要引用 DTD，但是需要`<doctype>`来规范浏览器的行为；而 HTML4.01 基于 SGML，需要引用 DTD，才能告知浏览器文档所使用的文档类型。

导入样式时：`<link>`属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS、rel 连接属性等，当页面加载时同步加载，浏览器兼容性好；`@import`由 CSS 提供，只能用于加载 CSS，其导入的 CSS 要在页面加载后再加载，在 CSS2.1 提出。

### 层次节点

节点分为几种不同的类型，每个节点都拥有各自的特点、属性和方法，也与其它节点存在某种关系。节点间的关系构成了层次，所有页面标记则表现为一个以特定节点为根节点的树形结构。如：

```
<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
```
```
Document
  Element html
    Element head
      Element title
        Text Sample Page
 
    Element body
      Element p
        Text Hello World!
```

文档节点（Document）是每个文档的根节点，上例中即是`<html>`，称之为文档元素，它是文档最外层元素。

每一段标记都可以通过树中的一个节点来表示：HTML 元素通过元素节点来表示，特性通过特性节点来表示，文档类型通过文档类型节点来表示，注释通过注释节点表示等，共12种节点类型，它们都继承自一个基类型。

上例中`<html>`、`<head>`、`<title>`等都是元素节点（Element），而`Hello World`为文本节点（Text）。

### Node 类型

DOM1 级定义了一个 Node 接口，JavaScript 中所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。

每个节点都有一个 nodeType 属性，用于表明节点的类型。

- 1 - Node.ELEMENT_NODE
- 2 - Node.ATTRIBUTE_NODE
- 3 - Node.TEXT_NODE
- 4 - Node.CDATA_SECTION_NODE
- 5 - Node.ENTITY_REFERENCE_NODE
- 6 - Node.ENTITY_NODE
- 7 - Node.PROCESSING_INSTRUCTION_NODE
- 8 - Node.COMMENT_NODE
- 9 - Node.DOCUMENT_NODE
- 10 - Node.DOCUMENT_TYPE_NODE
- 11 - Node.DOCUMENT_FRAGMENT_NODE
- 12 - Node.NOTATION_NODE

其中最重要便是 1、2、3 对应的元素节点、属性节点和文本节点。

```
<div>something</div>
<script>
  var a = document.querySelector('div');
  console.log(a.nodeType === 1);  // 兼容所有浏览器
  console.log(a.nodeType === Node.ELEMENT_NODE); // 不兼容 IE
</script>
```

#### 操作节点

```
// 访问子节点
var firstNode = someNode.childNodes[0]; // 为了方便，还是用你
var secondNode = someNode.childNodes.item(1);
var count = someNode.childNodes.length; // 能动态变化, childNodes 并不是快照
 
var firstNode = someNode.firstChild;
var lastNode = someNode.lastChild;
 
// 访问兄弟节点
var nextNode = someNode.nextSibling;
var preNode = someNode.previousSibling;
 
// 判断有没有子节点
var hasChild = someNode.hasChildNodes();  
var hasChild = someNode.childNodes.length > 0;
 
// 访问节点的文档节点
var documentNode = someNode.ownerDocument;
 
// appendChild
var returnNode = someNode.appendChild(newNode);
console.log(returnNode === newNode) // true
console.log(someNode.lastChild === newNode) // true
 
// 如果传入到 appendChild() 中的节点已经是文档的一部分了，那就将该节点从原来的位置移到新的位置
var returnNode = someNode.appendChild(someNode.firstChild);
console.log(returnNode === someNode.firstChild); // false
console.log(returnNode === someNode.lastChild); // true
 
// insertBefore(a, b) 将 a 插入 b 前，a 和 b 互为 Sibling
// 插入后成为最后一个子节点
var returnNode = someNode.insertBefore(newNode, null);
console.log(newNode === someNode.lastChild); // true
 
// 插入后成为第一个子节点
var returnNode = someNode.insertBefore(newNode, someNode.firstChild);
console.log(returnNode === someNode.firstChild); // true
 
// removeChild 移除节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);
 
// replaceChild 替换，替换第一个子节点
var returnNode = someNode.replaceChild(newNode, someNode.firstChild);
```

```
<ul>
  <li> apple </li>
  <li> orange </li>
  <li> pear </li>
</ul>
 
<script>
  var myList = document.querySelector('ul');
 
  // 深度复制
  var deepList = myList.cloneNode(true);
  console.log(deepList.childNodes.length); // 7
 
  // 浅复制
  var shallowList = myList.cloneNode(false);
  console.log(shallowList.childNodes.length); // 0
</script>
```

用`dl/dt/dd`替换表单里的`radio`

```
<dl>
  <dt>配送类型</dt>
  <dd>全部</dd>
  <dd>京东配送</dd>
  <dd>第三方配送</dd>
</dl>
```