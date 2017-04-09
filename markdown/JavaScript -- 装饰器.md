# @decorator

> 为现在有函数添加新特性。可以作用于类，也可以作用于类的属性。常用于日志。

## ES6 中的类

```
class Cat {
  say() {
    console.log('meow')
  }
}
```

它是一个语法糖，代码如下：

```
function Cat() {}
Object.defineProperty(Cat.prototype, "say", {
  value: function() {console.log('meow')},
  enumerable: false,
  configurable: true,
  writable: true
})
```

## 需要安装 `babel-plugin-transform-decorators-legacy`

## 作用于类的装饰器

```
function isAnimal(target) {
    target.isAnimal = true;
    return target;
}
@isAnimal
class Cat {
    say() {
        console.log('meow')
    }
}
console.log(Cat.isAnimal); // true
```

## 作用于类属性的装饰器

```
function decorateArmour(target, key, descriptor) {
  const method = descriptor.value;
  let moreDef = 100;
  let ret;
  descriptor.value = (...args)=>{
    args[0] += moreDef;
    ret = method.apply(target, args);
    return ret;
  }
  return descriptor;
}

function decorateLight(target, key, descriptor) {
  const method = descriptor.value;
  let moreAtk = 50;
  let ret;
  descriptor.value = (...args)=>{
    args[1] += moreAtk;
    ret = method.apply(target, args);
    return ret;
  }
  return descriptor;
}

class Man{
  constructor(def = 2,atk = 3,hp = 3){
    this.init(def, atk, hp);
  }

  @decorateArmour
  @decorateLight
  init(def, atk, hp){
    this.def = def; // 防御值
    this.atk = atk;  // 攻击力
    this.hp = hp;  // 血量
  }
  toString(){                 
    return `防御力: ${this.def}, 攻击力: ${this.atk}, 血量: ${this.hp}`;
  }
}

var tony = new Man();

console.log(`当前状态 ===> ${tony}`); // 当前状态 ===> 防御力: 102, 攻击力: 53, 血量: 3
```


