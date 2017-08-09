> Kristina Cbodorow 著，邓强 王明辉 译 @ O'reilly & 人民邮电出版社

## 第 1 章 -- MongoDB 简介

常用功能：

- 二级索引（secondary index）
- 范围查询（range query）
- 排序
- 聚合（aggregation）
- 地理空间索引（geospatial index）

MongoDB 是一个面向文档（document-oriented）的数据库，不是关系型数据库，拥有更好的扩展性（横向扩展）。

与关系型相比，用文档代替行的概念。通过在文档中数组，面向文档的方法能够仅使用一条记录来表现复杂的层次关系。没有预定义模式，文档的键值不再是固定的类型和大小。

## 第 2 章 -- MongoDB 基础知识

基本概念：

- MongoDB 的一个实例可以拥有多个相互独立的数据库
- 每个数据库有自己的集合，集合是一个拥有动态模式的表
- 每张表含多个文档；每个文档有一个特殊的键：`_id`，该键在所属集合中唯一
- MongoDB 自带 JavaScript Shell，可用于管理 MongoDB 的实例

### 数据库

文件系统中的文件，数据库名就是相应的文件名。

### 集合（关系型数据库中的表）

是一组文档（关系型数据库中的行）。

集合是动态的，意味着集合中上的文档的格式不限。

### 文档

文档是 MongoDB 的核心概念，是键值对的有序集，文档被表示成对象。如：

```
{
  "greeting": "Hello, world!",
  "foo": 3
  "Foo": "键区分大小写，值区分类型。这个值为字符串，上面键 foo 的值类型为数值",
  "importent": "键值对是有序的"
}
```

一个文档里有唯一的 KEY，叫：`_id`，如：`{ "_id" : ObjectId("56dab181150bacb8f91657e0"), "rep" : 30 }`。

`_id`值`ObjectId`里的数值从前往后分别代表：时间戳、机器、PID、计数器，所以一般是前几位和后几位不同，在同一台机器上中间几位是相同的。

### MongoDB Shell

#### 常用数据库操作（CRUD）

```
mongo // CMD 里输入 mongo 进入 MongoDB
db // 查看当前所在的数据库名，默认是 test 数据库
use blog // 切换到名为 blog 的数据库
var db = connect('localhost:27017/QA') // 切换到 QA 数据库

post = {
  "title": "My Blog Post",
  "content": "呵呵",
  "date": new Date()
}
db.blog.insert(post) // 往 blog 数据库里插入 post
db.blog.find() // 查询 blog 里的文档，默认显示 20 条文档
db.blog.find().skip(3).limit(5) // 查询结果里，跳过前 3 条，取之后的 5 条
db.blog.findOnd() // 查找 blog 里匹配的第一条文档

post.comments = []
db.blog.update({title: "My Blog Post"}, post) // 更新 post，第一个参数查找到该 post，第二个参数为新的 post

db.blog.remove({title: "My Blog Post"}) // 删除数据库 blog 中匹配的文档

db.blog.drop() // 删除数据库 blog
```

#### 小贴士

```
db.blog.help() // 查看集合级别的帮助
db.blog.update // 查看 update 操作的 JavaScript 实现代码
```

### 数据类型

有六种类型：

- `Null`
- `Boolean`
- `Number`
- `String`
- `Array`
- `Object`

JSON 没有日期类型；只有一种数字类型；也无法表示一些通用类型，如：正则表达式或函数。

## 第 3 章 -- 创建、更新和删除文档

使用命令行工具`mongoimport`从其它数据库（如：MySQL）导入数据。

### 更新文档

```
db.users.insert({"name": "joe", "friends": 32, "enemies": 2}) // WriteResult({ "nInserted" : 1 })
var joe = db.users.findOne({"name": "joe"})
joe.relationships = {"friends": joe.friends, "enemies": joe.enemies} // { "friends" : 32, "enemies" : 2 }
joe.username = joe.name // joe
delete joe.friends // true
delete joe.enemies // true
delete joe.name // true
db.users.update({"name": "joe"}, joe) // WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
db.users.find({"username": "joe"}) // { "_id" : ObjectId("56dbe3849f435ef7f6b3e596"), "relationships" : { "friends" : 32, "enemies" : 2 }, "username" : "joe" }
```

使用修改器`$set`：

```
db.users.update({"username": "joe"}, {$set: {"favorite book": "War and Peace"}})
db.users.find({"username": "joe"}) // { "_id" : ObjectId("56dbe3849f435ef7f6b3e596"), "relationships" : { "friends" : 32, "enemies" : 2 }, "username" : "joe", "fa
vorite book" : "War and Peace" }
```

如果没有`favorite book`字段，则新增；如果有，则替换。对其它字段不影响。如果不使用`$set`，则使用第二个参数把匹配文档全替换！

使用`$addToSet`避免重复插入。

使用`$unset`删除字段。

使用`$inc`自增：

```
db.users.update({"username": "joe"}, {$inc: {"relationships.friends": 2}})
db.users.findOne({'username': 'joe'}) // findOne 只找第一个匹配结果，自带 pretty 格式化效果
```

结果为：

```
{
        "_id" : ObjectId("56dbe3849f435ef7f6b3e596"),
        "relationships" : {
                "friends" : 34,
                "enemies" : 2
        },
        "username" : "joe",
        "favorite book" : "War and Peace"
}
```

`relationships.friends`增加了 2。

使用`$push`进行数组操作：

```
db.users.update({"username": "joe"}, {$push: {"comments": {"name": "joe", "email": "joe@gmail.com", "content": "nice post.
"}}})
```

结果为：

```
{
        "_id" : ObjectId("56dbe3849f435ef7f6b3e596"),
        "relationships" : {
                "friends" : 34,
                "enemies" : 2
        },
        "username" : "joe",
        "favorite book" : "War and Peace",
        "comments" : [
                {
                        "name" : "joe",
                        "email" : "joe@gmail.com",
                        "content" : "nice post."
                }
        ]
}
```

使用`$push`前，无`comments`字段，所以新建；如有，则追加到末尾。

也可以这样用：

```
db.users.update({username: 'joe'}, {$push: {class: {$each: [120, 113]}}})
```

结果为：

```
{
        "_id" : ObjectId("56dbe3849f435ef7f6b3e596"),
        "relationships" : {
                "friends" : 34,
                "enemies" : 2
        },
        "username" : "joe",
        "favorite book" : "War and Peace",
        "comments" : [
                {
                        "name" : "joe",
                        "email" : "joe@gmail.com",
                        "content" : "nice post."
                }
        ],
        "class" : [
                120,
                113
        ]
}
```

使用`$pull`从数组里删除数组项：

```
db.users.update({'username': 'joe'}, {$pull: {"class": 120}})
```

修改数组项：

```
db.users.update({username: 'joe'}, {$set: {'comments.0': {username: 'tr'}}})
```

因为上例中`comments`只有一个数组项（index 等于 0），所以用`comments.0`来索引该项。

```
db.users.update({rep: 25}, {$inc: {rep: 3}}, true)
```

**`update`的第三个参数，表示如果第一个参数（查询条件）没有，则以查询条件为基础新建一个文档；如果查到了，则更新该文档。**

第一次创建里插入时间，以后该创建时间不可改变：

```
db.users.update({'name': 'uRuier'}, {$setOnInsert: {createAt: new Date()}}, true)
```

匹配并更新多个文档：

```
db.users.update({"birthday": '1/1/2000'}, {$set: {'gift': 'cake'}}, false, true)
```

第三个参数为`false`表示如果没查到对象，则不新建；第四个参数就是指查到多个文档了，全都更新。

## 第 4 章 -- 查询

# Mongoose 基本操作

## Mongoose 是 MongoDB 的 ODM(Object Document Mapper)

> - 什么是 ODM? 其实和 ORM(Object Relational Mapper)是同类型的工具。都是将数据库的数据转化为代码对象的库，使用转化后的对象可以直接对数据库的数据进行 CRUD(增删改查)。
> - MongoDB 是文档型数据库(Document Database)，不是关系型数据库(Relational Database)。而 Mongoose 可以将 MongonDB 数据库存储的文档(documents)转化为 javascript 对象，然后可以直接进行数据的增删改查。

查：

```
// 如果不提供回调函数，所有这些方法都返回 Query 对象，它们都可以被再次修改（比如增加选项、键等），直到调用 exec 方法。
var query = Model.find({});
query.where('field', 5);
query.limit(5);
query.skip(100);
query.exec(function (err, docs) {
  // called when the `query.complete` or `query.error` are called
});
```

删：

```
Model.remove({author: 'uRuier'}, callback)
// not executed
var query = Model.find().remove({ name: 'Anne Murray' })
// executed without a callback
query.exec()

Model.remove(conditions, callback)
```

改：

```
Model.where({ _id: id }).update({ $set: { title: 'words' }}).exec()

MyModel.update({
  _id: '52261c53daa9d6b74e00000c',
  someAdditionalFlag: 156
}, {
  $set: {someAdditionalFlag: newValue }
}, function(err, numAffected) {
})

var conditions = { name: 'borne' }
  , update = { $inc: { visits: 1 }}
  , options = { multi: true };

Model.update(conditions, update, options, callback)

// 为了向后兼容，所有顶级更新键如果不是原子操作命名的，会统一被按 $set 操作处理，例如：
var query = { name: 'borne' };
Model.update(query, { name: 'jason borne' }, options, callback)
// 会被这样发送到数据库服务器
Model.update(query, { $set: { name: 'jason borne' }}, options, callback)
```

查：

```
Model.count(conditions, callback)

关联查询子表
Model.findOne().populate('author').exec(function(err, doc) {
  log(doc.author.name) // uRuier
  log(doc.depopulate('author'))
  log(doc.author) // '5144cf8050f071d979c118a7'
  // 两面两步可合并为一步
  log(doc.populated('author')) // '5144cf8050f071d979c118a7'
})

Kitten.findOne().populate('owner').exec(function (err, kitten) {
  console.log(kitten.owner.name) // Max
})

Kitten.find().populate({
    path: 'owner'
  , select: 'name'
  , match: { color: 'black' }
  , options: { sort: { name: -1 }}
}).exec(function (err, kittens) {
  console.log(kittens[0].owner.name) // Zoopa
})

// alternatively
Kitten.find().populate('owner', 'name', null, {sort: { name: -1 }}).exec(function (err, kittens) {
  console.log(kittens[0].owner.name) // Zoopa
})

某字段是否在当前查询操作中
Thing.findOne().select('name').exec(function(err, doc) {
  doc.isSelected('name') // true
  doc.isSelected('age') // false
})

query.findOneAndUpdate(conditions, options, callback)
query.findOneAndUpdate(conditions, update, options, callback)

User.find({age: {$gte: 21, $lte: 65}}, callback)
User
  .where('age').gte(21).lte(65)
  .where('name', /^rui/i)
  .where('tags').in(['movie', 'music', 'art'])
  .where('friends').slice(10)
  .select('name', 'age', 'tags')
  .skip(20)
  .limit(10)
  .asc('age')
  .slaveOk()
  .hint({ age: 1, name: 1 })
  .exec(callback)

// executes immediately, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// name LIKE john and only selecting the "name" and "friends" fields, executing immediately
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })

// passing options and executing immediately
MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {});
// executing a query explicitly
var query = MyModel.find({ name: /john/i }, null, { skip: 10 })
query.exec(function (err, docs) {});

// select only the adventures name and length
Adventure.findById(id, 'name length', function (err, adventure) {});
// same as above
Adventure.findById(id, 'name length').exec(callback);
// include all properties except for `length`
Adventure.findById(id, '-length').exec(function (err, adventure) {});

A.findByIdAndRemove(id, options, callback) // executes
A.findByIdAndRemove(id, options)  // return Query

A.findByIdAndUpdate(id, update, options, callback) // executes
A.findByIdAndUpdate(id, update, options)  // returns Query
A.findByIdAndUpdate(id, update, callback) // executes
A.findByIdAndUpdate(id, update)           // returns Query
Model.findByIdAndUpdate(id, { $set: { name: 'jason borne' }}, options, callback)
Model.findById(id, function (err, doc) {
  if (err) ..
  doc.name = 'jason borne';
  doc.save(callback);
});

// 文档嵌套查询
drawApply = new Schema({
    salesId: { type: Schema.ObjectId, ref: 'sales' },
    money: Number,
    status: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now }
});
sales = new Schema({
    name: { type: String, required: true, unique: true },
    pwd: String,
    phone: String,
    merchant: { type: Schema.ObjectId, ref: 'merchant' },
    status: { type: Number, default: 0 }
});
merchant = new Schema({
    name: String,
    sname: String,
    type: String
});
// 可以使用多个 populate 链式查询
drawApply
  .find()
  .populate({
    path: 'salesId',
    select: '_id name phone merchant',
    model: 'sales',
    populate: {
      path: 'merchant',
      select: '_id sname',
      model: 'merchant'
    }
  })
  .sort({createTime: -1})
  .exec(function(err, list) {
  // list of drawApplies with salesIds populated and merchant populated
});
```

基于分布式文件存储的数据库，使用C++编写，旨在为Web应用提供可扩展高性能的数据存储服务。

它介于关系数据库与非关系数据库之间，是非关系数据库中功能最丰富最接近关系数据库的数据库。

关系数据库（RDBMSs）遵循ACID原则

- Atomicity-原子性
- Consistency-一致性
- Isolation-独立性
- Durability-持久性

NoSQL（Not only SQL），即非关系型数据库。

MongoDB将数据存储为一个文档，数据结构为键值对（类似JSON对象）。

MongoDB管理工具

- 监控
 + Munin - 网络和系统监控，为MongoDB的插件
 + Gangila - 系统监视，也是插件
 + Cacti - 图形界面查看CPU利用率、网络带宽利用率，也是插件
- GUI
 + Fang of Mongo – 网页式,由Django和jQuery所构成。
 + Futon4Mongo – 一个CouchDB Futon web的mongodb山寨版。
 + Mongo3 – Ruby写成。
 + MongoHub – 适用于OSX的应用程序。
 + Opricot – 一个基于浏览器的MongoDB控制台, 由PHP撰写而成。
 + Database Master — Windows的mongodb管理工具
 + RockMongo — 最好的PHP语言的MongoDB管理工具，轻量级, 支持多国语言

注册 MongoDB 服务：`mongod.exe --logpath "D:\MongoDB\data\log\mongodb.log" --logappend --dbpath "D:\MongoDB\data\db\\" --serviceName "MongoDB" --serviceDisplayName "MongoDB" --install`

删除已注册的服务：`sc delete MongoDB`

启动服务：`net start MongoDB`
