require('source-map-support').install(); // 加上這一行

var sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('ok')
    }, time)
  })
}

var start = async function () {
  try {
    console.log('start')
    let stop = false
    let i = 1
    while (!stop) {
      var result = await sleep(1000)
      await sleep(1000);
      console.log(`${result} - 第 ${i} 次等待...`);
      if (i++ > 2) {
        stop = true
      }
    }
    console.log('end')
  } catch (err) {
    console.log(err)
  }
}

console.log('aaa')
start()
console.log('bbb')
