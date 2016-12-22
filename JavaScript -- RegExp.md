## 元字符 - metacharacter

|正则|含义|
|:---:|:---:|
|`\w`|匹配字母、数字、下划线，大写表示非。`\W`：匹配任意不是字母、数字、下划线的字符|
|`\b`|匹配单词首尾，即单词分界处，它只匹配位置。或者说：它的前一个/后一个字符不全是`\w`。如hi后面不久跟着个lucy，这样写：`\bhi\b.*\blucy\b`|
|`.`|匹配除换行符以外的任意字符|
|`*`|代表数量，任意次|
|`+`|代表数量，1次或更多次|
|`\n`|换行符。ASCII编码为10（Ox0A）|
|`\d`|匹配数字。`\D`：匹配任意非数字字符|
|`\s`|任意的空白符，包括空格、制表符、换行符。`\S`：匹配任意不是空格的字符|
|`^`|匹配字符串开始|
|`$`|匹配字符串结尾（输入5-12位数字：`^\d{5,12}$`）|
|`{}`|匹配次数|
|`[]`|`[aeiou]`：匹配其中一个元音字母，`[^aeiou]`：匹配任意一个辅音字母；`[.?!]`：匹配`.`/`?`/`!`；`[0-9]`：匹配数字，与`\d`同义；`[a-z]`：匹配小写字母；英文里`[0-9a-zA-Z]`匹配`\w`；`\(?0\d{2}[) -]?\d{8}`。这里`.`/`?`/`(`/`)`等都是元字符，在`[]`里可直接使用，不必`\`转义|
|`()`|分组，匹配到第一个分级，组号为1，依次类推，0代表整个分组。`\b(\w+)\b\s+\1\b`：匹配go go等，其中的\1表示匹配到的内容|
|`?`|匹配一次或没有|
|`\|`|匹配分枝，从左到右匹配|

[更多](https://www.zybuluo.com/Rico/note/19387)

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



