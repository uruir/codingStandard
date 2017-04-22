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
        await sleep(1000);
        console.log(`${result} - 第 ${i} 次等待...`);
    }
  } catch (err) {
    console.log(err)
  }
}

start()

