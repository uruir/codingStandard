### Math

它是 JavaScript 的单体内置对象。

```
Math.E // 2.718281828459045
Math.LN10 // 2.302585092994046
Math.LOG2E // 1.4426950408889634
Math.PI // 3.141592653589793
Math.SQRT1_2 // 0.7071067811865476

var max = Math.max(3, 55, 2);
log(max); //55

var num = [1, 2, 3, 4, 5];
log(Math.max.apply(this, num)); //5，此处this可以用null代替
```

注：Math 不是构造函数，所以不能通过`new`生成实例，然而`Date()`可以啊！

对象：无序属性（基本值、对象或函数）的集合，类似于散列表，是一组名值对。
