## 简介

[Jade](https://github.com/pugjs/jade) 是一个清晰、对空格敏感用于编写 HTML 的模板引擎，一般用于后端的 NodeJS 环境，浏览器也可以用，但是好大啊！

它主要用于生成类似 XML 等具有文档结构的文件，如 HTML、RSS 等，不能生成文本类文件，如 txt/markdown/css 等。示例如下：

```
doctype html
html(lang="zh-CN")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Jade - node template engine
    #container.col
      if youAreUsingJade
        p You are amazing
      else
        p Got on it!
      p.
        Jade is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

默认的，每行以`#`或`.`开对，自动将它们添加到`<div>`标签内，将转换成如下所示：

```
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>Jade</title>
    <script type="text/javascript">
      if (foo) bar(1 + 5)
    </script>
  </head>
  <body>
    <h1>Jade - node template engine</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>Jade is a terse and simple templating language with a strong focus on performance and powerful features.</p>
    </div>
  </body>
</html>
```

它与 python 类似，对空格敏感，因此不需要关闭标签。

使用官方的[教程](http://jade-lang.com/tutorial/)来入门，点击查看[中文教程](https://github.com/pugjs/jade/blob/master/Readme_zh-cn.md)。

## [API](http://jade-lang.com/api/)

```
var jade = require('jade');

// compile
var fn = jade.compile('string of jade', options);
var html = fn(locals);

// render
var html = jade.render('string of jade', merge(options, locals));

// renderFile
var html = jade.renderFile('filename.jade', merge(options, locals));
```

### options

- `filename` Used in exceptions, and required when using includes
- `compileDebug` When false no debug instrumentation is compiled
- `pretty` Add pretty-indentation whitespace to output (false by default)

## Jade 基础

### 给标签添加文本

```
h1 Welcome to Jade
p
  | Text can be included in a number of
  | different ways.
p.
  This way is shortest if you need big
  blocks of text spanning multiple
  lines.
```

- 第一种是在`<h1>`后直接一个空格加文本
- 第二种是`<p>`后另起一行，空两格加`|`和空格加文本
- 第三种是`<p>`后加上`.`，然后另起一行空两格加文本

### 给标签添加属性

```
h1(id="title") Welcome to Jade
button(class="btn", data-action="bea").
  Be Awesome
```

将生成：

```
<h1 id="title">Welcome to Jade</h1>
<button data-action="bea" class="btn">Be Awesome</button>
```

括号内的属性值单双引都可以。多个属性用`, `隔开，也可以这样：

```
input(
  type='checkbox'
  name='agreement'
  checked
)
```

```
- var authenticated = true
body(class=authenticated ? 'authed' : 'anon')
```

使用条件来确定类的值是`authed`还是`anon`。

### IDs & Classes

生成上面 HTML 片段：

```
h1#title Welcome to Jade
button.btn(data-action="bea") Be Awesome
```

```
- var classes = ['foo', 'bar', 'baz']
a(class=classes)
//- the class attribute may also be repeated to merge arrays. <a class="bing foo bar baz bing"></a>
a.bing(class=classes class=['bing'])
```

### &attributes

|Jade|HTML|
|:---:|:---:|
|`div#foo(data-bar="foo")&attributes({'data-foo': 'bar'})`|`<div id="foo" data-bar="foo" data-foo="bar"></div>`|
|`- var attributes = {'data-foo': 'bar'};
  div#foo(data-bar="foo")&attributes(attributes)`|`<div id="foo" data-bar="foo" data-foo="bar"></div>`|

## JavaScript

构建动态模板

### Outputing Text

用 JavaScript 变量值来显示文本，Jade 能够过滤文本以防止嵌入式 HTML 注入攻击。

```
var jade = require('jade');
var fn = jade.compile(jadeTemplate);
var htmlOutput = fn({
  maintainer: {
    name: 'uRuier',
    weibo: '糊涂涂小睿',
    blog: 'turuir.cn'
  }
});

h1
  | Maintainer:
  = ' ' + maintainer.name
table
  tr
    td Twitter
    td= maintainer.twitter
  tr
    td Blog
    td= maintainer.blog
```

将生成：

```
<h1>Maintainer: Forbes Lindesay</h1>
<table>
  <tr>
    <td>Twitter</td>
    <td>@ForbesLindesay</td>
  </tr>
  <tr>
    <td>Blog</td>
    <td>forbeslindesay.co.uk</td>
  </tr>
</table>
```

|Jade|HTML|
|:---:|:---:|
|`div(escaped="<code>")`|`<div escaped="&lt;code&gt;"></div>`|
|`div(unescaped!="<code>")`|`<div unescaped="<code>"></div>`|

`unescaped`很危险，少用以防跨域攻击。

### 设置属性

```
h1(name=maintainer.name)
  | Maintainer:
  = ' ' + maintainer.name
table
  tr
    td(style='width: '+(100/2)+'%').
      Twitter
    td= maintainer.twitter
  tr
    td(style='width: '+(100/2)+'%').
      Blog
    td= maintainer.blog
```

[更多详情](http://jade-lang.com/)

总结：

- 每行第一个单词是标签，后面紧跟的`=`表明要用变量替换，紧跟小括号表明是属性，之后空一格表明接下来的是文本内容

### case

```
- var friends = 0
case friends
  when 0
  when 1
    p you have very few friends
  default
    p you have #{friends} friends
```

### code

```
- for (var x = 0; x < 3; x++)
  li item
  
-
  list = ["Uno", "Dos", "Tres",
          "Cuatro", "Cinco", "Seis"]
each item in list
  li= item
```

### conditionals

```
- var user = { description: 'foo bar baz' }
- var authorised = false
#user
  if user.description
    h2 Description
    p.description= user.description
  else if authorised
    h2 Description
    p.description.
      User has no description,
      why not add one...
  else
    h1 Description
    p.description User has no description

// each
- var items = ["one", "two", "three"]
each item in items
  li= item
  
// 或者
items = ["one", "two", "three"]
each item, i in items
  li #{item}: #{i}
  
// 或者
obj = { foo: 'bar' }
each val, key in obj
  li #{key}: #{val}
```

`- `开关的行不会显示出来，一般用于定义变量或循环（可以省略）。

### Extends

```
//- layout.jade
doctype html
html
  head
    block title
      title Default title
  body
    block content

//- index.jade
extends ./layout.jade

block title
  title Article Title

block content
  h1 My Article
```

### includes

将 Jade 文件或链式文本插入到另一个 Jade 文件中。

```
//- index.jade
doctype html
html
  include ./includes/head.jade
  body
    h1 My Site
    p Welcome to my super lame site.
    include ./includes/foot.jade
//- includes/head.jade
head
  title My Site
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')


//- index.jade 插入 Plain text
doctype html
html
  head
    style
      include style.css
  body
    h1 My Site
    p Welcome to my super lame site.
    script
      include script.js
/* style.css */
h1 { color: red; }
// script.js
console.log('You are awesome');


//- index.jade 插入过滤器
doctype html
html
  head
    title An Article
  body
    include:markdown article.md

# article.md

This is an article written in markdown.
```

### 过滤器

```
body
  :markdown
    Woah! jade _and_ markdown, very **cool**
    we can even link to [stuff](http://google.com)
```

### Minix

```
mixin book(name, price)
  li #{name} for #{price} €
  
ul#books
  +book("Book A", 12.99)
  +book("Book B", 5.99)
```