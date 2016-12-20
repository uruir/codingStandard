var xlsx = require('node-xlsx')
var fs = require('fs')
var path = require('path')

var data = [
  ['姓名', '手机号', '银行卡号', '开户行', '证件号', '项目数', '总投资', '总分红', '新分红', '性别', '推荐人', '地址', 'address'],
  ['涂睿', '13720267368', '123', '工行', '362523', 0, 0, 0, 0, '男', '你', '梅林'],
  ['一', '13720267368', '123', '工行', '362523', 0, 0, 0, 0, '男', '我', '上梅林'],
  ['二', '17000215066', '123', '工行', '123456', 1, 2, 3, 4, '男', '他', '下梅林']
]

var buffer = xlsx.build([{name: "mySheetName", data: data}])

fs.writeFileSync('investor.xlsx', buffer, 'binary')

var workbook = xlsx.parse(fs.readFileSync('investor.xlsx'))

console.log(workbook[0].data)