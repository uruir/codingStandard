var nodeExcel = require('excel-export')

var conf = {};
conf.name = 'investor';
conf.cols = [{
    caption: '姓名',
    type: 'string',
    width: 30
  },
  {
    caption: '手机号',
    type: 'string',
    width: 20.85
  },
  {
    caption: '银行卡号',
    type: 'string',
    width: 30
  },
  {
    caption: '开户行',
    type: 'string'
  },
  {
    caption: '证件号',
    type: 'string'
  },
  {
    caption: '项目数',
    type: 'number'
  },
  {
    caption: '总投资',
    type: 'string'
  },
  {
    caption: '总分红',
    type: 'number'
  },
  {
    caption: '新分红',
    type: 'number'
  },
  {
    caption: '性别',
    type: 'string'
  },
  {
    caption: '推荐人',
    type: 'string'
  },
  {
    caption: '地址',
    type: 'string'
  }];
conf.rows = [
  ['涂睿', '13720267368', '1231231232322322332', '工行', '362523198805152813', 1, '', 0.1233, 0, '男', '你', '梅林'],
  ['一', '13720267368', '123', '工行', '362523', 2, '', 0, 0, '男', '我', '上梅林'],
  ['二', '17000215066', '123', '工行', '123456', 3, '', 0, 0, '男', '他', '下梅林']
  ];

var result = nodeExcel.execute(conf);

var fs = require('fs');
fs.writeFileSync('single.xlsx', result, 'binary');