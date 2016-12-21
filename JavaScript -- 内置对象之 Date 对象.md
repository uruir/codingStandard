源于 java.util.Date 类，从 1970 年 1 月 1 日 0 点 0 分 0 秒开始经过的毫秒数：`var d = new Date(); //Thu Oct 01 2015 16:28:03 GMT+0800 (中国标准时间)`

```
new Date().getMonth(); // 月，从0开始
console.log(new Date()); // Sat Oct 31 2015 00:07:32 GMT+0800 (中国标准时间)
var data = new Date();
data.getFullYear(); // 年
data.getYear(); // 115，1900 + 115= 2015
data.getDate(); // 天，从1开始
data.getDay(); // 星期几，0是星期日，1是星期一
data.getHours(); // 时
data.getMinutes(); // 分
data.getSeconds(); // 秒
data.getTime(); // 距离1970年初始的毫秒数
new Date(毫秒数); // 根据毫秒数求出日期

new Date(2015, 9, 1); // 标准格式显示2015年10月1日
new Date(2015, 10, 0); // 2015年10月最后一天

// 求上月最后一天
function getLastMonthLastDay() { var data = new Date(); var y = data.getFullYear(); var m = data.getMonth(); return new Date(y, m, 0); } 

// 35天之后的日期
new Date(new Date().getTime() + 35 * 24 * 3600 * 1000); //Sat Dec 05 2015 00:28:46 GMT+0800 (中国标准时间)

// 或者这样
new Date(new Date().setDate(new Date().getDate() + 35)); //Sat Dec 05 2015 01:11:49 GMT+0800 (中国标准时间)

// 修改年，可顺便修改月和日
new Date(new Date().setFullYear(2016, 0, 1)); //Fri Jan 01 2016 01:16:16 GMT+0800 (中国标准时间)

// 修改天，只能修改天
new Date(new Date().setDate(15)); //Thu Oct 15 2015 00:58:03 GMT+0800 (中国标准时间)

// 获取时间
(function(){
    var date = new Date();
    var y = date.getFullYear(); //获取年
    var m = date.getMonth() + 1; //获取月份，从0开始
    m = m >= 10 ? m : '0' + m;
    var d = date.getDate();
    d = d >= 10 ? d : '0' + d;
    var time = y + '年' + m + '月' + d + '日';
    console.log(time);
})();
```
