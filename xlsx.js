var path = require('path')
var XLSX = require('xlsx')

var investorPath = path.join(__dirname, '../public/uploads/investor/zhizooInvestor.xlsx')
console.log(investorPath)
var workbook = XLSX.readFile(investorPath)

// 从 EXCEL 表里获取数据
var sheet_name_list = workbook.SheetNames
sheet_name_list.forEach(function(y) {
  var worksheet = workbook.Sheets[y]
  for (z in worksheet) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(z[0] === '!') continue
    // console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v))
  }
})

console.log(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])))
// 往 EXCEL 表里写入数据
function datenum(v, date1904) {
  if(date1904) v+=1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  for(var R = 0; R != data.length; ++R) {
    for(var C = 0; C != data[R].length; ++C) {
      if(range.s.r > R) range.s.r = R;
      if(range.s.c > C) range.s.c = C;
      if(range.e.r < R) range.e.r = R;
      if(range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C] };
      if(cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
      
      if(typeof cell.v === 'number') cell.t = 'n';
      else if(typeof cell.v === 'boolean') cell.t = 'b';
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';
      
      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}
var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
var ws_name = "SheetJS";
function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}
var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
wb.SheetNames.push(ws_name);
wb.Sheets[ws_name] = ws;
// XLSX.writeFile(wb, 'out.xlsx')