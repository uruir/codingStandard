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