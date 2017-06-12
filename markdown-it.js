var fs = require('fs');
var MarkdownIt = require('markdown-it');

var md = new MarkdownIt();

fs.readFile('../markdown/BOM.md', 'UTF-8', function(err, data) {
  if (err) {
    console.log(err);
  }
  var result = md.render(data);
  var html = `<!doctype html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>`
          + result
          + `</body>
    </html>`;
  fs.writeFile('./BOM.html', html, 'UTF-8', function(err, data) {
    console.log('写完毕');
  });
});