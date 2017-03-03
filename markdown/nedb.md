## 创建本地数据库

```
var nedb = require('nedb')
var planets = new nedb({
  filename: './test.db',
  autoload: true
})
planets.insert({name: 'Earth', satellites: 1}, function (err) {
  planets.find({}, function (err, docs) {
    console.log(JSON.stringify(docs, null, 2))
  })
})
```