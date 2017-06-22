require('source-map-support').install(); // 加上這一行

var sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('ok')
    }, time)
  })
}

setTimeout(() => {
  console.log('呵呵哒')
}, 1234)

var start = async function () {
  try {
    console.log('start')
    let stop = false
    let i = 1
    while (!stop) {
      await sleep(3000);
      console.log(`第 ${i} 次等待...`);
      if (i++ > 5) {
        stop = true
      }
    }
    console.log('end')
  } catch (err) {
    console.log(err)
  }
}

start()

