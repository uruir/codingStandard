在WebSocket规范发布以前，实时应用通过通常使用轮询（Polling）和Comet技术（轮询技术的改进，基于HTTP长连接的服务器推送技术,分为长轮询机制和流机制）。

- 轮询：以频繁请求的方式保持C/S的消息同步
- 长轮询：当服务器端没有数据更新的时候，连接会保持一段时间周期直到数据或状态改变或者时间过期
- 流：在客户端的页面使用一个隐藏的窗口向服务端发出一个长连接的请求，服务器端接到这个请求后作出回应并不断更新连接状态以保证客户端和服务器端的连接不过期，通过这种机制可以将服务器端的信息源源不断地推向客户端。这种机制在用户体验上有一点问题，需要针对不同的浏览器设计不同的方案来改进用户体验，同时这种机制在并发比较大的情况下，对服务器端的资源是一个极大的考验
- WebSocket：浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，之后客户端和服务器端就可以通过 TCP 连接直接交换数据。因为 WebSocket 连接本质上就是一个 TCP 连接，所以在数据传输的稳定性和数据传输量的大小方面，和轮询以及 Comet 技术比较，具有很大的性能优势

前三种方式均非实时，只是通过Ajax模拟实时的效果。

## comet技术

浏览器作为 Web 应用的前台，自身的处理功能比较有限。浏览器的发展需要客户端升级软件，同时由于客户端浏览器软件的多样性，在某种意义上，也影响了浏览器新技术的推广。在 Web应用中，浏览器的主要工作是发送请求、解析服务器返回的信息以不同的风格显示。AJAX 是浏览器技术发展的成果，通过在浏览器端发送异步请求，提高了单用户操作的响应性。但 Web 本质上是一个多用户的系统，对任何用户来说，可以认为服务器是另外一个用户。现有 AJAX 技术的发展并不能解决在一个多用户的 Web 应用中，将更新的信息实时传送给客户端，从而用户可能在“过时”的信息下进行操作。而 AJAX 的应用又使后台数据更新更加频繁成为可能。

随着互联网的发展，web应用层出不穷，也不乏各种网站监控、即时报价、即时通讯系统，为了让用户得到更好的体验，服务器需要频繁的向客户端推送信息。开发者一般会采用基于AJAX的长轮询方式或者基于iframe及htmlfile 的流方式处理。当然有些程序需要在客户端安装各种插件(Java applet | Flash)来支持性能比较良好的“推”信息。

## 轮询

轮询是一种“拉”取信息的工作模式。设置一个定时器，定时询问服务器是否有信息，每次建立连接传输数据之后，链接会关闭。

前端实现

```
var polling = function(url, type, data){
    var xhr = new XMLHttpRequest(), 
        type = type || "GET",
        data = data || null;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4) {
            receive(xhr.responseText);
            xhr.onreadystatechange = null;
        }
    };
    xhr.open(type, url, true);
    //IE的ActiveXObject("Microsoft.XMLHTTP")支持GET方法发送数据，
    //其它浏览器不支持，已测试验证
    xhr.send(type == "GET" ? null : data);
};
var timer = setInterval(function(){
    polling();
}, 1000);
```

在轮询的过程中，如果因为网络原因，导致上一个xhr对象还没传输完毕，定时器已经开始了下一个询问，上一次的传输是否还会在队列中，这个问题我没去研究。如果感兴趣可以自己写一个ajax的请求管理队列。

## 长轮询(long-polling)

长轮询其实也没啥特殊的地方，就是在xhr对象关闭连接的时候马上又给他接上

```
var longPoll = function(type, url){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        // 状态为 4，数据传输完毕，重新连接
        if(xhr.readyState == 4) {
            receive(xhr.responseText);
            xhr.onreadystatechange = null;

            longPoll(type, url);
        }
    };
    xhr.open(type, url, true);
    xhr.send();
}
```

只要服务器断开连接，客户端马上连接，不让他有一刻的休息时间，这就是长轮询。

## 数据流

数据流方式，在建立的连接断开之前，也就是readystate状态为3的时候接受数据，但是麻烦的事情也在这里，因为数据正在传输，你拿到的`xhr.response`可能就是半截数据。所以，最好定义一个数据传输的协议，比如前2个字节表示字符串的长度，然后你只获取这个长度的内容，接着改变游标的位置。

假如数据格式为： data splitChar data为数据内容，splitChar为数据结束标志（长度为1）。
那么传输的数据内容为 data splitChar data splitChar data splitChar...

```
var dataStream = function(type, url）{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        // 状态为 3，数据接收中
        if(xhr.readyState == 3) {
            var i, l, s;
            s = xhr.response; //读取数据
            l = s.length;     //获取数据长度
            //从游标位置开始获取数据，并用分割数据
            s = s.slice(p, l - 1).split(splitChar);
            //循环并操作数据
            for(i in s) if(s[i])  deal(s[i]);
            p = l;  //更新游标位置

        }
        // 状态为 4，数据传输完毕，重新连接
        if(xhr.readyState == 4) {
            xhr.onreadystatechange = null;
            dataStream(type, url);
        }
    };
    xhr.open(type, url, true);
    xhr.send();
};
```

这个代码写的是存在问题的，当readystate为3的时候可以获取数据，但是这时获取的数据可能只是整体数据的一部分，那后半截就拿不到了。readystate在数据传输完毕之前是不会改变的，也就是说他并不会继续接受剩下的数据。我们可以定时去监听readystate，这个下面的例子中可以看到。

这样的处理不算复杂，但是存在问题。上面的轮询和长轮询是所有浏览器都支持的，所以我就没有写兼容IE的代码，但是这里，低版本IE不允许在readystate为3的时候读取数据，所以我们必须采用其他的方式来实现。

在ajax还没有进入web专题之前，我们已经拥有了一个法宝，那就是iframe，利用iframe照样可以异步获取数据，对于低版本IE可以使用iframe开接受数据流。

```
if(isIE){
    var dataStream = function(url）{
        var ifr = document.createElement("iframe"), doc, timer;
        ifr.src = url;
        document.body.appendChild(ifr);
        doc = ifr.contentWindow.document;
        timer = setInterval(function(){
            if(ifr.readyState == "interactive"){
                // 处理数据，同上
            }
            // 重新建立链接
            if(ifr.readyState == "complete"){
                clearInterval(timer);
                dataStream(url);
            }
        }, 16);
    };
};
```

定时去监听iframe的readystate的变化，从而获取数据流，不过，上面的处理方式还是存在问题。数据流实现“服务器推”数据的原理是什么呢，简单点说，就是文档(数据)还没有加载完，这个时候浏览器的工作就是去服务器拿数据完成文档(数据)加载，我们就是利用这点，给浏览器塞点东西过去。

所以上述利用iframe的方式获取数据，会使浏览器一直处于加载状态，title上的那个圈圈一直在转动，鼠标的状态也是loading，这看着是相当不爽的。幸好，IE提高了HTMLFile对象，这个对象就相当于一个内存中的Document对象，它会解析文档。所以我们创建一个HTMLFile对象，在里面放置一个IFRAME来连接服务器。这样，各种浏览器就都支持了。

```
if(isIE){
    var dataStream = function(url）{
        var doc = new ActiveXObject("HTMLFile"), 
            ifr = doc.createElement("iframe"), 
            timer, d;
        doc.write("<body/>");
        ifr.src = url;
        doc.body.appendChild(ifr);
        d = ifr.contentWindow.document;
        timer = setInterval(function(){
            if(d.readyState == "interactive"){
                // 处理数据，同上
            }
            // 重新建立链接
            if(d.readyState == "complete"){
                clearInterval(timer);
                dataStream(url);
            }
        }, 16);
    };
};
```

## WebSocket

WebSocket 协议本质上是一个基于 TCP 的协议。为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息”Upgrade: WebSocket”表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

```
var ws = new WebSocket("ws://www.example.com:8888");
ws.onopen = function(evt){};
ws.onmessage = function(evt){
    deal(evt.data);
};
ws.onclose  = function(evt){};
//ws.close();
```

新建一个WebSocket实例，一切就OK了，`ws://`是websocket的连接协议，8888为端口号码。onmessage中提供了data这个属性，相当方便。

另外还有一种服务器推送数据新方式：SSE（Server-Send Event）

## web 通信方式利弊分析

- 轮询，这种方式应该是最没技术含量的，操作起来最方便，不过是及时性不强，把定时器的间隔时间设置的短一些可以稍微得到缓和
- 长轮询，算是比较不错的一个web通讯方式，不过每次断开连接，比较耗服务器资源，客户端到无所谓
- 数据流，他和长轮询不同之处是接受数据的时间不一样，数据流是readystate为3的时候接受，低版本IE不太兼容，处理起来略麻烦，而且还要自己设计数据传输协议。不过他对资源的消耗比上面几种都可观
- websocket和EventSource，两个利器，不过，没几个浏览器支持，这是比较让人伤心
- ActionScript和Java Applet，两者都是需要在客户端安装插件的，一个是Flash插件，一个是Java插件，而且搞前端的人一般对这东西不太熟悉，如果没有封装比较好的库可以使用，那建议还是别用了