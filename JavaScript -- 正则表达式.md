直接量语法：`/pattern/attr`。

## search

```
var str = 'hello world'; 
console.log(str.search(/wo/i)); // 6
console.log(str.search('wo')); // 6
```

若匹配不到，返回 -1。

## match

```
var str = 'hello world'; 
console.log(str.match(/Wo/i)); // ["wo", index: 6, input: "hello world"]
console.log(str.match('wo')); // 同上

var str = 'abcde';
console.log(str.match(/[bcd][bcd]/)); // ["bc", index: 1, input: "abcde"]
```

不匹配返回 `null`。

## replace

```
var str = 'hello world'; 
console.log(str.replace('hello', 'nihao')); // nihao world
console.log(str.replace(/hEllo/i, 'nihao')); // 同上
console.log(str.replace(/(\w+)\s(\w+)/g, "$2,$1")); // world,hello，第一个小括号内匹配的内容为 $1，依次类推

var name = "123sdasadsr44565dffghg987gff33234"; 
name2.replace(/\d+/g,function(v){ return '-' + v + '-'; }); // name2 的值为：-123-sdasadsr-44565-dffghg-987-gff-33234-

/*
 * 如下函数，回调函数参数一共有四个
 * 第一个参数的含义是 匹配的字符串
 * 第二个参数的含义是 正则表达式分组内容，没有分组的话，就没有该参数,
 * 如果没有该参数的话那么第四个参数就是undefined
 * 第三个参数的含义是 匹配项在字符串中的索引index
 * 第四个参数的含义是 原字符串
 */
 name2.replace(/(\d+)/g,function(a,b,c,d){
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
 });
```

上面最后一组示例的结果为：

```
123
123
1
-123-sdasadsr-44565-dffghg-987-gff-33234-
44565
44565
14
-123-sdasadsr-44565-dffghg-987-gff-33234-
987
987
27
-123-sdasadsr-44565-dffghg-987-gff-33234-
33234
33234
35
-123-sdasadsr-44565-dffghg-987-gff-33234-
"-undefined-sdasadsr-undefined-dffghg-undefined-gff-undefined-"
```

## 小结

上面三种正则方法都是类似于`string.method(pattern[, function]);`格式。

## test

```
var str = "longen and yunxi";
console.log(/longen/.test(str)); // true
console.log(/longlong/.test(str)); // false
console.log(/l\w+en/.test(str)); // true
console.log(/lon.*xi/.test(str)); // true
```

正则表达式在`.`前面，括号内是原字符串。

## exec

```
var str = "longen and yunxi";
console.log(/en/.exec(str)); // ["en", index: 4, input: "longen and yunxi"]

// 上面的 exec 与之前 match 功能一致
console.log(str.match(/en/)); // ["en", index: 4, input: "longen and yunxi"]
```

看自己取舍用哪个方法了，以免混淆，我选`match`。



