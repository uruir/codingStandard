## 给后台传输 JSON 格式的数据

```
$.ajax({
  url: 'generatePDF',
  type: 'POST',
  dataType: 'json',
  contentType: 'application/json; charset=utf-8',
  beforeSend: function(request) {
      request.setRequestHeader("token", "tokenValue");
  },
  data: JSON.stringify({
    content: totalPDFContent
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

