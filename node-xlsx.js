var xlsx = require('node-xlsx')
var fs = require('fs')
var path = require('path')

var data = [
  ['name', 'cellphone', 'bankcard', 'bank', 'identity', 'projects', 'totalAmount', 'totalProfit', 'lastProfit', 'gender', 'recommend', 'address'],
  ['涂睿', '13720267368', '123', '工行', '362523', 0, 0, 0, 0, '男', '你', '梅林'],
  ['一', '13720267368', '123', '工行', '362523', 0, 0, 0, 0, '男', '我', '上梅林'],
  ['二', '17000215066', '123', '工行', '123456', 1, 2, 3, 4, '男', '他', '下梅林']
]

var buffer = xlsx.build([{name: "mySheetName", data: data}])

fs.writeFileSync('investor.xlsx', buffer, 'binary')