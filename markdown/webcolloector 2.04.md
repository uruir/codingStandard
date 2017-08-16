SoupLang是WC 2.x中的一种爬虫脚本，以Jsoup内置的CSS SELECTOR为基础，程序会将SoupLang的脚本xml转换成语义树。

WC内核架构图：
http://img2.tuicool.com/AFV73a.png

- 注入器注入种子。若是断点续爬则不用
- CrawlDB。保存URL列表，将URL传给生成器；未爬取的状态设为UNFETCHED，已爬取FETCHED
- 分析该URL，生成任务给抓取器
- 抓取网页，利用Handler把doc打包交给用户自定义；将抽取到的URL给CrawlDB
- 用户自定义模块：对网页信息抽取，存储等。这是二次开发的内容！
- RequestFactory：Http请求生成器，可选用不同插件来做为爬虫的http请求
- ParerFactory：链接分析器！！！相对路径的抽取看它了！！！

正则匹配：Pattern.matches(regex, str) //boolean

- page.getUrl()
- page.getDoc().title()
- page.getDoc().select(str).text()

正则实例：
限制在本域名内 http://([a-z0-9]*\\.)*cnhubei.com/
过滤图片 -.*jpg.*
