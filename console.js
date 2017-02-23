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