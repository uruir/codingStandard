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

