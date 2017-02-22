var genArr = function (len) {
    var arr = []
    var i = 0
    for (i; i < len; i++) {
        arr[i] = i
    }
    return arr
}

var shuffle = function (arr) {
    var len = arr.length
    var t
    var i
    while(len) {
        i = Math.floor(Math.random() * len--)
        t = arr[i]
        arr[i] = arr[len]
        arr[len] = t
    }
    return arr
}
var arr = genArr(10)
for(var i = 0; i < 30; i++) {
    console.log(shuffle(arr))
}

