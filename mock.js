var Mock = require('mockjs')
var $ = require('jquery')

Mock.mock('./data.json',{
    name: '@chineseName',
    ip: '@ip',
    email: '@email',
    phone: '@phone',
    avatar: '@image'
});

$.ajax({
    url: './data.json',
    type: 'get',
    data: {
        index:1
    },
    dataType: 'json',
    success: function(res){
        console.log(res);
    },
    error: function(msg){
        console.log(msg);
    }
});