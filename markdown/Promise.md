```
// promise/A+ 规范
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function Promise(fn) {
    let that = this; // 缓存当前 promise 实例对象
    that.status = PENDING; // 初始状态
    that.value = undefined; // resolved 状态时返回的信息
    that.reason = undefined; // rejected 状态时拒绝的原因
    that.onResolvedCallbacks = []; // 存储 resolved 状态对应的 onResolved 函数
    that.onRejectedCallbacks = []; // 存储 rejected 状态对应的 onRejected 函数
    function resolve(value) {
        if (value instanceof Promise) {
            console.log('Promise > resolve > Promise 实例')
            return value.then(resolve, reject);
        }
        setTimeout(() => {
            console.log('Promise > resolve > setTimeout > status', that.status)
            if (that.status === PENDING) {
                that.status = RESOLVED;
                that.value = value;
                that.onResolvedCallbacks.forEach(cb => cb(that.value));
            }
        });
    }
    function reject(reason) {
        setTimeout(() => {
            console.log('Promise > reject > setTimeout > status', that.status)
            if (that.status === PENDING) {
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        });
    }
    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {  // 如果从onResolved中返回的x 就是promise2 就会导致循环引用报错
        return reject(new TypeError('循环引用'));
    }

    let called = false; // 避免多次调用
    // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
    if (x instanceof Promise) { // 获得它的终值 继续resolve
        if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject);
            }, reason => {
                reject(reason);
            });
        } else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
            x.then(resolve, reject);
        }
        // 如果 x 为对象或者函数
    } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try { // 是否是thenable对象（具有then方法的对象/函数）
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, reason => {
                    if (called) return;
                    called = true;
                    reject(reason);
                })
            } else { // 说明是一个普通对象/函数
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    const that = this;
    let newPromise;
    onResolved = typeof onResolved === "function" ? onResolved : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : reason => {throw reason;};
    if (that.status === RESOLVED) {
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onResolved(that.value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
    if (that.status === REJECTED) {
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
    if (that.status === PENDING) {
        return newPromise = new Promise((resolve, reject) => {
            that.onResolvedCallbacks.push((value) => {
                try {
                    let x = onResolved(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let done = gen(promises.length, resolve);
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}
function gen(length, resolve) {
    let count = 0;
    let values = [];
    return function (i, value) {
        values[i] = value;
        if (++count === length) {
            console.log(values);
            resolve(values);
        }
    }
}
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then(resolve, reject);
        });
    });
}
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}
Promise.resolve = function (value) {
    return new Promise(resolve => {
        resolve(value);
    });
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('start')
    }, 1000);
});
p1.then((result) => {
    console.log('a', result);
    return 'a'
    // return Promise.reject('中断后续调用'); // 此时rejected的状态将直接跳到catch里，剩下的调用不会再继续
}).then(result => {
    console.log('b', result);
    return 'b'
}).then(result => {
    console.log('c', result);
    return 'c'
}).catch(err => {
    console.log(err);
});
```