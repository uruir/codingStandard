CommonJS 的 Promises/A 规范，用于解决回调金字塔问题。

## 什么是 Promise

一个 Promise 对象代表一个目前还不可用，但是在未来的某个时间点可以被解析的值。它允许你以一种同步的方式编写异步代码。例如，如果你想要使用 Promise API 异步调用一个远程的服务器，你需要创建一个代表数据将会在未来由 Web 服务返回的 Promise 对象。唯一的问题是目前数据还不可用。当请求完成并从服务器返回时数据将变为可用数据。在此期间，Promise 对象将扮演一个真实数据的代理角色。接下来，你可以在 Promise 对象上绑定一个回调函数，一旦真实数据变得可用这个回调函数将会被调用。

## 去除厄运的回调金字塔(Pyramid of Doom)

Javascript 中最常见的反模式做法是回调内部再嵌套回调。

```
// 回调金字塔
asyncOperation(function(data){
  // 处理 `data`
  anotherAsync(function(data2){
      // 处理 `data2`
      yetAnotherAsync(function(){
          // 完成
      });
  });
});
```

引入 Promises 之后的代码

```
promiseSomething()
.then(function(data){
    // 处理 `data`
    return anotherAsync();
})
.then(function(data2){
    // 处理 `data2`
    return yetAnotherAsync();
})
.then(function(){
    // 完成
});
```

Promises 将嵌套的 callback，改造成一系列的.then的连缀调用，去除了层层缩进的糟糕代码风格。Promises 不是一种解决具体问题的算法，而已一种更好的代码组织模式。

## Promises/A 规范

promise 表示一个最终值，该值由一个操作完成时返回。

promise 有三种状态：**未完成** (unfulfilled)，**完成** (fulfilled) 和**失败** (failed)。
promise 的状态只能由**未完成**转换成完成，或者**未完成**转换成**失败** 。
promise 的状态转换只发生一次。
promise 有一个 then 方法，then 方法可以接受 3 个函数作为参数。前两个函数对应 promise 的两种状态 fulfilled 和 rejected 的回调函数。第三个函数用于处理进度信息（对进度回调的支持是可选的）。

```
promiseSomething().then(function(fulfilled){
        //当promise状态变成fulfilled时，调用此函数
    },function(rejected){
        //当promise状态变成rejected时，调用此函数
    },function(progress){
        //当返回进度信息时，调用此函数
    });
```

如果 promise 支持如下连个附加方法，称之为可交互的 promise

- get(propertyName) 获得当前 promise 最终值上的一个属性，返回值是一个新的 promise。
- call(functionName, arg1, arg2, ...) 调用当然 promise 最终值上的一个方法，返回值也是一个新的promise。

## 实现一个迷你版本的Promise

上面扯了这么多规范，现在我们看看如何实现一个简单而短小的 Promise。

### 状态机

```
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function Promise() {
  // store state which can be PENDING, FULFILLED or REJECTED
  var state = PENDING;

  // store value or error once FULFILLED or REJECTED
  var value = null;

  // store sucess & failure handlers attached by calling .then or .done
  var handlers = [];
}
```

### 状态变迁

仅支持两种状态变迁，fulfill和reject

```
// ...

function Promise() {
    // ...

  function fulfill(result) {
    state = FULFILLED;
    value = result;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }

}
```

fulfill和reject方法较为底层，通常更高级的resolve方法开放给外部。

```
// ...

function Promise() {

  // ...

  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject)
        return
      }
      fulfill(result);
    } catch (e) {
      reject(e);
    }
  }
}
```

resolve方法可以接受一个普通值或者另一个promise作为参数，如果接受一个promise作为参数，等待其完成。promise不允许被另一个promise fulfill，所以需要开放resolve方法。resolve方法依赖一些帮助方法定义如下:

```
/**
 * Check if a value is a Promise and, if it is,
 * return the `then` method of that promise.
 *
 * @param {Promise|Any} value
 * @return {Function|Null}
 */
function getThen(value) {
  var t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    var then = value.then;
    if (typeof then === 'function') {
      return then;
    }
  }
  return null;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 *
 * @param {Function} fn A resolver function that may not be trusted
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (ex) {
    if (done) return
    done = true
    onRejected(ex)
  }
}
```

这里resolve和doResolve之间的递归很巧妙，用来处理promise的层层嵌套（promise的value是一个promise）。

### 构造器

```
// ...

function Promise(fn) {
    // ...
    doResolve(fn, resolve, reject);
}
```

### .done方法

```
// ...
function Promise(fn) {
  // ...

  function handle(handler) {
    if (state === PENDING) {
      handlers.push(handler);
    } else {
      if (state === FULFILLED &&
        typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value);
      }
      if (state === REJECTED &&
        typeof handler.onRejected === 'function') {
        handler.onRejected(value);
      }
    }
  }

  this.done = function (onFulfilled, onRejected) {
    // ensure we are always asynchronous
    setTimeout(function () {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      });
    }, 0);
  }
  // ...
}
```

### .then方法

```
// ...
function Promise(fn) {
    // ...
    this.then = function (onFulfilled, onRejected) {
      var self = this;
      return new Promise(function (resolve, reject) {
        return self.done(function (result) {
          if (typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(result));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return resolve(result);
          }
        }, function (error) {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return reject(error);
          }
        });
      });
    }
    // ...
}
```

## 示例

```
var p = new Promise(function(resolve, reject){
  console.log('1');
  // 运行后续的 callback 列表，例如：then,when等。否则，不会执行then里面的函数
  resolve('go next');
});

console.log('hehe')

// 只考虑成功
p.then(function(){
  console.log(2, arguments);
  return 'next';
}).then(function(){
  console.log(3, arguments)
});
```

运行结果为：

```
1
hehe
2 { '0': 'go next' }
3 { '0': 'next' }
```

省略第一个参数，即得`catch`方法，一般用于调用链末尾：

```
var p = new Promise(function(resolve, reject){resolve('heh')})

p.then((val) => console.log('成功:', val))
  .catch((val) => console.log('失败:', val));
```