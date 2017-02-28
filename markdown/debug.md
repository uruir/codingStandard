# 调试 JavaScript 代码

## debugger

## console

```
// 格式化成可展开的 DOM，类似 Element 面板
console.log('%o', el)
console.dirxml(el)
// 格式化成 JavaScript 对象
console.log('%O', el)
console.dir(obj)
// 输出时带样式，可使用 background:url() no-repeat; padding: 77px 216px; line-height: 200px; 输出图片。padding & line-height 表示宽高
console.log("%cHello world", "color: red; font-size: 20px");
// 信息分组
console.group("第一组信息");
console.log("第一组第一条");
console.log("第一组第二条");
console.groupEnd();
// 计时
console.time('label')
doSth()
console.timeEnd('label')
// 展示列表
var animals = [
    { animal: 'Horse', name: 'Henry', age: 43 },
    { animal: 'Dog', name: 'Fred', age: 13 },
    { animal: 'Cat', name: 'Frodo', age: 18 }
];
console.table(animals);
// 追踪函数的调用过程
console.trace('xxx')
// 定位到具名函数
debug(funcName)
// 监听指定函数的调用与参数
monitor(funcName)
funcName()
```

## 浏览器调试

### 快速获取 DOM 元素文本

- 点击 Elements 面板中相应元素节点，在 Console 面板中输入 `$0` 即可获取最近一次点击的元素文本
-