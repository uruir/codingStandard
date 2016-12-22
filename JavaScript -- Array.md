### 检测是否为数组类型

```
var a = [];
Array.isArray(a); // true

// or
var a = [];
a.constructor === Array; // true

// or
var a = [];
Object.prototype.toString.call(a).slice(8, 13) === 'Array'; // true
```

### 数组排序

```
var a = [1, 3, 2, 6, 5, 4];
var b = a.sort();
console.log(b); // [1, 2, 3, 4, 5, 6]

'1'.charCodeAt(); // 49
'a'.charCodeAt(); // 97
'A'.charCodeAt(); // 65
var a = [1, 3, 'a', 6, 5, 'A'];
var b = a.sort();
console.log(b); // [1, 3, 5, 6, "A", "a"]

var a = [1, 3, 'a', 6, 5, 4];
var b = a.sort(function(x, y) { return x - y; });
console.log(b); // [1, 3, "a", 4, 5, 6]
```

### 数组方法

`arr.forEach(function(item){});`，有几点需要注意

- forEach无法遍历对象
- 无法在IE中使用，firefox & chrome实现了该方法
- 无法使用break/continue跳出循环；使用return时，效果和在for循环里使用continue一致

### 使用原型扩展数组方法

往数组指定位置添加元素

```
Array.prototype.insert = function(index, item) {
    if (arguments.length > 2) {
        for (var i = 0, len = arguments.length - 1; i < len; i++) {
            this.splice(index + i, 0, arguments[i+1]);    
        }
    } else {
        this.splice(index, 0, item);
    }
};

var Arr = ['one', 'two', 'four'];
Arr.insert(2, 'three', 'five'); //["one", "two", "three", "five", "four"]
```

### 数组去重

```
Array.prototype.uniq = function () {
  var r = [];
  for (var i = 0, len = this.length; i < len; i++) {
    var tmp = this[i];
    // 若数组r中没有tmp元素，则indexOf结果为-1， 可以将其加入结果数组
    if (r.indexOf(tmp) == -1) {
      r.push(tmp);
    }
  }
  return r;
}
var arr = ['a', 'b', 'a', 'c', 'a', 1, 'b'];
arr.uniq();
```

### 数组方法

```
[1, 'a', 3].join(); // '1,a,3'，默认使用英文逗号分隔，结果为字符串
[1, 'a', 3].join(''); // '1a3'
var c = a.concat(b); // c的值为数组a + 数组b，且不改变a, b

// 数组操作
var a = ['a', 'b', 'c', 'd'];
var b = a.splice(0,2); // b的值为['a', 'b'], a为['c', 'd']，看下面
var a = ['a', 'b', 'c', 'd'];
a.splice(0, 1, 'f', 'g'); // a的值为['f', 'g', 'b', 'c', 'd']，index为0开始删除1个元素，即删除了元素'a'，然后加入'f'和'g'两个数组项

// 数组去重，通过构建一个新对象来去重
function arrUniq(arr) {
    var obj = {};
    var index = 0;
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if(!obj[arr[i]]) {
            obj[arr[i]] = 1;
            newArr[index++] = arr[i];
        } else if (obj[arr[i]] == 1) continue;
    }
    console.log(newArr); //[ 'a', 1, 'b', 2, 'c' ]
};
arrUniq(['a', 1, 'b', 'a', 2, 1, 'c']);

/**
 * 伪数组：无法直接调用数组方法或length属性但可以遍历的数组。如函数的arguments参数、getElementsByTagName返回的数组等。
 * 将伪数组转为数组
 **/
function trigger() {
  var args = Array.prototype.slice.call(arguments); // 或[].slice.call(arguments);
  return args;
}
trigger(1, 2, 'a'); // [1, 2, 'a']
```

数组类型的每一项可以表示任何数据类型，且动态调整大小：

```
var arr = ['red', 'green', 'blue']; // 字面量表示法，可不含参数。所以数组和对象都用字面量表示吧！
arr.length = 2; // ['red', 'green']，通过length属性把数组截断了

// 判断某个对象是否为数组
log(arr instanceof Array); // true
log(Array.isArray(arr)); // true
```

数组的其它方法：

```
var arr = ['red', 'green', blue'];
arr.toString(); // red,green,blue
arr.valueOf(); // ['red', 'green', 'blue']，还是原数组的值
var a = arr.concat(['black', 'yellow']); // [ 'red', 'green', 'blue', 'black', 'yellow' ]
log(a.slice(1,4)); // ['green', 'blue', 'black']，数学里的[1,4)，即arr[1], arr[2] & arr[3]
log(a.splice(1,2, 'a', 'b')); // ['red', 'a', 'b', 'black', 'yellow']，从index为1开始，后2个元素由'a','b'代替，返回被替代的2个元素
a.indexOf('black'); // 位置方法，值为3
a.indexOf('black', 4); // 从 index 值为 4 开始找，这里找不到，所以返回 -1。若是从 3 找，则就返回 3
a.lastIndexOf('black'); // 还是 3，从后往前找
```

Array & String都有indexOf方法，都是查找指定位置的字符（串）。

数组的迭代方法：

- every
- filter
- forEach
- map
- some

```
var a = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var obj = {};
var r = a.filter(function(item, index) {
    if (item > 2) obj[index] = item;
})
log(obj); //{ '2': 3, '3': 4, '4': 5, '5': 4, '6': 3 }
```
`every` & `some`返回布尔值，`filter` & `map`返回新数组，`forEach`无返回值。
