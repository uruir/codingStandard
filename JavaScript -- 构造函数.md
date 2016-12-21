```
var Person = function(name, gender) {
  return {
    rawName: name,
    name: (function(){
      if (gender === 'male') {
        return 'Mr. ' + name;
      } else if (gender === 'female') {
        return 'Miss ' + name;
      }
    }())
  }
};

var rui = new Person('rui', 'male');
rui.rawName;
rui.name;
```

创建对象的是`new`操作符，而不是构造函数。没有`new`，构造函数内的`this`会捆绑到全局对象。

函数的原型属性不是给自己用的，而是给函数充当构造器创建的对象使用的：

```
function Foo() {}
var f = new Foo();
f.constructor;
```

