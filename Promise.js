let promise = new Promise((resolve, reject) => {
    console.log('start')
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('ok') : reject('end')
    }, 1000)
    console.log('end')
})

promise.then((result) => {
    console.log(result)
    let p1 = new Promise((resolve, reject) => {
        console.log('p1-start')
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('p1-ok') : reject('p1-heheda')
        }, 1000)
        console.log('p1-end')
    })
    return p1
}).then((result) => {
    console.log(result)
    let p2 = new Promise((resolve, reject) => {
        console.log('p2-start')
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('p2-ok') : reject('p2-heheda')
        }, 1000)
        console.log('p2-end')
    })
    return p2
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})

let arr = [1, 2, 3].map((value) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(value);
            }, value * 1000);
        });
    }
);

// 如果 Promise 全都是 resoved 状态，则 resolved
Promise.all(arr).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

// 只要有一个 resolved 就结束并返回 result
Promise.race(arr).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})