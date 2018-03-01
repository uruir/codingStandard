var XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xlsx');
var fs = require('fs')
var path = require('path')

// 获取 Excel 中所有表名
var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
var worksheet = workbook.Sheets[sheetNames[0]];

console.log(workbook.Directory)
console.log(workbook.Workbook)
console.log(workbook.Props)
console.log(workbook.Custprops)
console.log(workbook.Deps)
console.log(workbook.Sheets)
console.log(workbook.SheetNames)
console.log(workbook.Strings)
console.log(workbook.Styles)
console.log(workbook.Themes)
console.log(workbook.SSF)
fs.writeFile(path.resolve(__dirname, 'to.json'), JSON.stringify(workbook), function (err) {
  if (err) {
    console.warn('Error: ', e)
  }
})

// 获取 A1 单元格对象
var a1 = worksheet['A1']; // 返回 { v: 'hello', t: 's', ... }
// 获取 A1 中的值
a1.v // 返回 'hello'
// 获取表的有效范围
worksheet['!ref'] // 返回 'A1:B20'
worksheet['!range'] // 返回 range 对象，{ s: { r: 0, c: 0}, e: { r: 100, c: 2 } }
// 获取合并过的单元格
worksheet['!merges'] // 返回一个包含 range 对象的列表，[ {s: { r: 0, c: 0 }, c: { r: 2, c: 1 } } ]
