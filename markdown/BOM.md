## window 对象

- window
  + navigator
  + screen
  + history
  + location
  
## 宽度与高度

```
document.documentElement.clientWidth // 浏览器可视宽度 - 滚动条宽度
document.documentElement.clientHeight // 浏览器可视高度 - 滚动条高度

document.body.scrollHeight === document.body.clientHeight === document.documentElement.scrollHeight // 文档高度
document.body.scrollWidth === document.body.clientWidth === document.documentElement.scrollWidth // 文档宽度，等于上面的clientWidth
```

## 把页面当成编辑器

```
// 使整个页面可编辑
document.body.contentEditable = 'true';
```

### 网页中常用的宽高

- 网页可见区域宽：document.body.clientWidth 
- 网页可见区域高：document.body.clientHeight 
- 网页可见区域宽：document.body.offsetWidth (包括边线的宽) 
- 网页可见区域高：document.body.offsetHeight (包括边线的高) 
- 网页正文全文宽：document.body.scrollWidth 
- 网页正文全文高：document.body.scrollHeight 
- 网页被卷去的高：document.body.scrollTop（即当前内容离文档顶部的距离）
- 网页被卷去的左：document.body.scrollLeft 
- 屏幕分辨率的高：window.screen.height 
- 屏幕分辨率的宽：window.screen.width 
- 屏幕可用工作区高度：window.screen.availHeight （屏幕的有效高度） 
- 屏幕可用工作区宽度：window.screen.availWidth  （屏幕的有效宽度）

HTML精确定位：scrollLeft, scrollWidth, clientWidth, offsetWidth 

- scrollHeight: 获取对象的滚动高度。  
- scrollLeft：设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离  
- scrollTop：设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离  
- scrollWidth：获取对象的滚动宽度  
- offsetHeight：获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度  
- offsetLeft：获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置  
- offsetTop：获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置  
- event.clientX：相对文档的水平座标  
- event.clientY：相对文档的垂直座标  
- event.offsetX：相对容器的水平坐标  
- event.offsetY：相对容器的垂直坐标  
- document.documentElement.scrollTop：垂直方向滚动的值  
- event.clientX+document.documentElement.scrollTop：相对文档的水平座标+垂直方向滚动的量 

![图示](http://jbcdn2.b0.upaiyun.com/2015/12/be02c02be685d24e9cd6d80059217429.jpg)

`offsetWidth` & `offsetHeight`对应的是盒模型的宽度和高度，这两个值跟我们使用 Chrome 审查元素时看到的尺寸一致（在 Console 里`document.querySelector('#tr').offsetWidth`）。

`scrollWidth` & `scrollHeight`不包含滚动条。

`clientWidth` & `clientHeight`也不包含滚动条。

那意思是只有 `offset` 即含边框又含滚动条咯？

