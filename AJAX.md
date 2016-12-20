# 发送 token

```
$(function() {
    $.ajax({
        type: "GET",
        url: "godruoyi.com",
        beforeSend: function(request) {
            request.setRequestHeader("token", "asdadsadasdasdadadad");
        },
        success: function(result) {
            alert(result);
        }
        });
});
```

# 给后台传输 JSON 格式的数据

```
$.ajax({
  url: 'generatePDF',
  type: 'POST',
  dataType: 'json',
  contentType: 'application/json; charset=utf-8',
  data: JSON.stringify({
    content: totalPdfcontent
  }),
  success: function (data) {
    console.log(data)
    if (data.statusCode === 200) {
      window.open('/getPDF/' + data.data.name)
    }
  },
  error: function (err) {
    notie.alert(err)
  }
})
```

注意到 URL 里开关均未使用`/`