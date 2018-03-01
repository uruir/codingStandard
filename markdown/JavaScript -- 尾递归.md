```
var trampoline = function (func) {
    console.log('xxx', func)
    var value = func()
    while (typeof value === 'function') {
        value = value()
    }
    return value
}

function factorial (n) {
    function recur (n, acc) {
        if (n === 0) {
            return acc
        } else {
            return recur.bind(null, n-1, n*acc)
        }
    }
    return function () {
        return recur.bind(null, n, 1)
    }
}

console.log(trampoline(factorial(170)))
```
