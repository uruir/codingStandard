import moment from 'moment'
moment.locale('zh-cn')

console.log('当前时间', moment().format('MM/DD/YYYY HH:mm:ss'))

console.log('星期几', moment().format('d') + ' | ' + moment().format('dddd'))

console.log('年第几周', moment().format('w'))

console.log('年第几天', moment().format('DDD'))

console.log('第几季', moment().format('Q'))

console.log('第几个月', moment().format('MM'))

console.log('月第几天', moment().format('DD'))

console.log('秒', moment().format('X'))

console.log('毫秒', moment().format('x'))

console.log('相对时间', moment('20160524', 'YYYYMMDD').fromNow())

console.log('40 天后', moment('20170609').add(40, 'days').format('YYYY 年 MM 月 DD 日'))

console.log('7 小时后', moment().add(7, 'hours').format('HH:mm:ss'))

console.log('昨天', moment().add(-1, 'days').format('YYYY-MM-DD'))

console.log('明天', moment().add(1, 'days').calendar())

console.log('时间戳转日期：', moment(1471224865000).format('MM/DD/YYYY'))

console.log('日期转时间戳：', moment("07192017-00:00:00", "MMDDYYYY-HH:mm:ss").format('X')) // X 秒；x 毫秒

console.log('将标准时间格式化', moment('2018-07-31T11:05:54.164189Z').format('MM/DD/YYYY HH:mm:ss'))

console.log('2018-07-31', moment('2018-07-31').format('MM/DD/YYYY HH:mm:ss'))

console.log('2018-07-31', moment('2018-07-31 01:23:45').format('MM/DD/YYYY HH:mm:ss'))

console.log('2018/07/31', moment('2018/07/31', 'YYYY-MM-DD').format('MM/DD/YYYY HH:mm:ss'))

console.log('1538017162', moment(1538017162).format('MM/DD/YYYY HH:mm:ss')) // 不能用字符串数值