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
    var result = await sleep(2000)
    console.log(result)
    console.log('end')
    for (var i = 1; i <= 3; i++) {
      console.log(`${result} - 当前是第 ${i} 次等待...`);
      await sleep(1000);
    }
  } catch (err) {
    console.log(err)
  }
}

start()

console.log('heheda')