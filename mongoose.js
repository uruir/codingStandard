var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
require('mongoose-long')(mongoose)
mongoose.Promise = require('promise')
var util = require('./backendUtil')

mongoose.connect("mongodb://localhost/hehe")

// 混合类型修改后必须调用 this._markModified()，此为创建模式
var ArticleSchema = new Schema({
  id: Schema.Types.Long,
  title: String,
  content: String,
  category: String,
  tags: String,
  pv: Schema.Types.Long,
  comments: [{}],
  modify: String
})
// 根据模式创建模型
var Article = mongoose.model('Article', ArticleSchema)

var removeArticle = function () {
  var promise = new Promise(function (resolve, reject) {
    // 删除表
    Article.collection.drop(function () {
      resolve('成功删除表')
    })
  })
  return promise
}

removeArticle().then(function (data) {
  util.log(data)
  // 根据模型创建实例
  var firstArticle = new Article({
    id: 1,
    title: 'first',
    content: '第一篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 1,
    comments: [
      {
        from: '涂睿',
        to: 'uRuier',
        content: '呵'
      },{
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈'
      }
    ]
  })
  // 保存实例并返回一个 promise
  var firstPromise = firstArticle.save(function(err) {
    err ? util.log("错误：初始化文章") : util.log("成功：初始化第一篇文章")
  })
  firstPromise.then(function (doc) {
    util.log('第一篇文档：' + doc.tags)
    // lean 指 RAW，没有包装方法，jQuery 就包装了很多方法
    Article.findOneAndRemove({id: 1}, {lean: true}, function (err, doc) {
      util.log(err)
      util.log('删除第一篇文章：' + JSON.stringify(doc.tags))
    })
  })

  var secondArticle = new Article({
    id: 2,
    title: 'second',
    content: '第二篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 2,
    comments: [
      {
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵'
      },{
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈'
      }
    ]
  })
  var secondPromise = secondArticle.save(function(err) {
    err ? util.log("错误：初始化文章") : util.log("成功：初始化第二篇文章")
  })
  secondPromise.then(function (doc) {
    // util.log('第二篇文档：' + doc)
    Article.findByIdAndUpdate(
      doc._id,
      {$set: {
        title: '修改第二篇文章的标题',
        content: '修改第二篇文章的内容'
      }},
      function (err, article) {
        if (article) {
          util.log('成功：修改第二篇文章')
        } else {
          util.log('错误：修改第二篇文章')
        }
      }
    )
  })

  var thirdArticle = new Article({
    id: 3,
    title: 'third',
    content: '第三篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 3,
    comments: [
      {
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵'
      },{
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈'
      }
    ]
  })
  var thirdPromise = thirdArticle.save(function(err) {
    err ? util.log("错误：初始化文章") : util.log("成功：初始化第三篇文章")
  })
  thirdPromise.then(function (doc) {
    // util.log('第三篇文档：' + doc)
    Article.findByIdAndUpdate(
      doc._id,
      {$push: {
        comments: {
          from: '涂睿',
          to: 'LHW',
          content: '累觉不爱'
        }
      }},
      {new: true},
      function(err, pushComment) {
        util.err(err)
        util.log('原评论：' + JSON.stringify(doc.comments))
        util.log('新评论：' + JSON.stringify(pushComment.comments))
      }
    )
  })

  var forthArticle = new Article({
    id: 4,
    title: 'forth',
    content: '第四篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 4,
    comments: [
      {
        id: 5,
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵呵'
      },{
        id: 6,
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈哈'
      }
    ]
  })
  var forthPromise = forthArticle.save(function(err) {
    err ? util.log("错误：初始化文章") : util.log("成功：初始化第四篇文章")
  })
  forthPromise.then(function (doc) {
    // util.log('第四篇文档：' + doc)
    Article.update(
      {'comments.id': 5},
      {$set: {
        'comments.$.from': '不累啊',
        'comments.$.date': Date.now()
      }},
      // 第二个参数是更新的数量，需要得到实例，使用 findByIdAndUpdate
      function(err, pushComment) {
        util.err(err)
        util.log('第四篇修改后的评论：' + JSON.stringify(pushComment.comments))
      }
    )
  })

  var fifthArticle = new Article({
    id: 5,
    title: 'fifth',
    content: '第五篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 5,
    comments: [
      {
        id: 7,
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵呵'
      },{
        id: 8,
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈哈'
      }
    ]
  })
  var fifthPromise = fifthArticle.save(function(err) {
    err ? util.log("错误：初始化文章") : util.log("成功：初始化第五篇文章")
  })
  fifthPromise.then(function (doc) {
    var update = {from: '再改', pv: 7}
    // util.log('第四篇文档：' + doc)
    Article.update(
      // 根据子文档查找，注意这里必须是唯一，要不然都更新不了
      {'comments.id': 7},
      {$set: {
        'comments.$': update
      }},
      {
        // 更新后的文档
        new: true,
        // 如果文档不存在则创建
        upsert: true,
        runValidators: true,
        // 和 upsert 配合使用
        setDefaultsOnInsert: true
      },
      function(err, pushComment) {
        util.err(err)
        util.log('新评论：' + JSON.stringify(pushComment.comments))
      }
    )
  })

  var sixthArticle = new Article({
    id: 6,
    title: 'sixth',
    content: '第六篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 6,
    comments: [
      {
        id: 9,
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵呵'
      },{
        id: 10,
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈哈'
      }
    ]
  })
  var sixthPromise = sixthArticle.save(function(err) {
    err ? util.log("错误：初始化文章") : util.log("成功：初始化第六篇文章")
  })
  sixthPromise.then(function (doc) {
    var update = {from: '再改', pv: 88}
    Article.findOne(
      // 根据子文档查找，注意这里必须是唯一，要不然都更新不了
      {'comments.id': 9},
      {},
      {},
      function(err, pushComment) {
        util.err(err)
        pushComment.comments.forEach(function (item) {
          item.from = '尼玛啊'
        })
        // 这里写不写 markModified 无所谓
        pushComment.markModified('comments')
        util.log('新评论六：' + JSON.stringify(pushComment.comments))
      }
    )
  })
  var seventhArticle = new Article({
    id: 7,
    title: 'seventh',
    content: '第七篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 7,
    comments: [
      {
        id: 111,
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵呵'
      },{
        id: 12,
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈哈'
      }
    ]
  })
  seventhArticle.save(function (err) {
    util.log('已保存第七篇文章')
    Article.findOne({id: 7}, function (err, doc) {
      util.log(err)
      doc.comments.push({id: 112})
      // 并没有删除
      doc.comments.pull({id: 111})
      util.log('第七篇文章' + doc)
      doc.save()
    })
  })

  var eighthArticle = new Article({
    id: 8,
    title: 'eighth',
    content: '第八篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 8,
    comments: [
      {
        id: 113,
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵呵'
      },{
        id: 114,
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈哈'
      }
    ]
  })
  eighthArticle.save(function (err) {
    util.log('已保存第八篇文章')
    // 自增
    // $inc: {pv: 3}
    // 增加属性
    // $set: {gender: 'male'}
    // 删除属性
    // $unset: {title: 'eighth'}
    // 删除子文档
    Article.update({id: 8}, {$unset: {'comments': 1}}, function (err) {
      util.err(err)
    })
  })

  var ninthArticle = new Article({
    id: 9,
    title: 'ninth',
    content: '第九篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 9,
    arr: [1, 2],
    comments: [
      {
        id: 115,
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵呵'
      },{
        id: 116,
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈哈'
      }
    ]
  })
  ninthArticle.save(function (err) {
    util.log('已保存第九篇文章')
    // 增加属性
    Article.update({id: 9}, {'array':{'$each': [1,2,3,4,5]}, '$addToSet': {'comments': {id: 116, to: '呵木呆呆'}}}, function (err) {
      util.err(err)
    })
  })

  var tenthArticle = new Article({
    id: 10,
    title: 'tenth',
    content: '第十篇测试内容',
    category: '文章',
    tags: '测试',
    pv: 10,
    comments: [
      {
        id: 117,
        from: '涂睿',
        to: 'uRuier',
        content: '呵呵呵呵'
      },{
        id: 118,
        from: '涂睿',
        to: 'tTianmuR',
        content: '哈哈哈哈'
      }
    ]
  })
  tenthArticle.save(function (err) {
    util.log('已保存第十篇文章')
    // 删除子文档
    Article.update({id: 10}, {'$pull': {'comments': {id: 117}}}, function (err) {
      util.err(err)
    })
  })
})


