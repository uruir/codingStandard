let sleep = (ms) => {
    return new Promise((resolve, reject) => {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            resolve({
                info: `等待 ${~~(ms/1000)} 秒`,
            });
        }, ms);
    });
}

let test = async() => {
    console.log('1')
    console.log(await sleep(1001))
    console.log('2')

}

test()
