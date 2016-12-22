var moment = require('moment')
moment.locale('zh-cn')
var util = require('./backendUtil')

util.white('当前时间', moment().format('MM/DD/YYYY HH:mm:ss'))

util.cyan('星期几', moment().format('d') + ' | ' + moment().format('dddd'))

util.blue('年第几周', moment().format('w'))

util.red('年第几天', moment().format('DDD'))

util.green('第几季', moment().format('Q'))

util.grey('第几个月', moment().format('MM'))

util.yellow('月第几天', moment().format('DD'))

util.gray('秒', moment().format('X'))
//
// util.log('毫秒', moment().format('x'))
//
// util.log('相对时间', moment('20160524', 'YYYYMMDD').fromNow())
//
// util.log('7 天后', moment().add(7, 'days').format('YYYY 年 MM 月 DD 日'))
//
// util.log('7 小时后', moment().add(7, 'hours').format('HH:mm:ss'))
//
// util.log('明天', moment().add(1, 'days').calendar())
//
// util.log('test:', moment(1111111111111).format('MM/DD/YYYY'))
//
