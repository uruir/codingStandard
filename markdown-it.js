var fs = require('fs')
var MarkdownIt = require('markdown-it')

var md = new MarkdownIt()

fs.readFile('./markdown/BOM.md', 'UTF-8', function (err, data) {
    if (err) {console.log(err)}
    var result = md.render(data)
    console.log(result)
})