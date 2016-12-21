## 返回顶部

```
$('#top').on('click', function (e) {
  e.preventDefault()
  $(body).animate({scrollTop: 0}, 800)
}
```

## 图片

### 是否全部加载

```
$('img').on('load', function() {
  console.log('已全部加载')
})
```

### 图片加载错误

```
$('img').on('error', function() {
  $(this).prop('src', 'images/broken.png')
})
```

## Havor 状态的类切换

```
$('.btn').hover(function() {
  $(this).toggleClass('hover')
})
```

## 表单

### 输入框不可编辑

```
$('input[type="submit"]').prop('disable', true)
```

## 侧边栏的显示与隐藏

```
$('.btn').on('click', function() {
  $('.slidebar').slideToggle('slow')
})
```


