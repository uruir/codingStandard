var fs = require("fs")
var path = require("path")
var http = require("http")

var uploadOption = {
    // 这里直接用了站点的地址及路由的上传文件地址
    host: "192.168.1.101",
    port: "3456",
    path: "/uploadFiles",
    method: 'post'
};
var formFieldName = "files"
var uploadFilePath = "../crypto.js" // 待上传的文件路径
var boundaryKey = "NodeFormBoundaryKey" // multipart 的 part 之间的界定符

var request = http.request(uploadOption, function(res) {
    // 响应首行
    console.log('STATUS: ' + res.statusCode)
    // 响应头
    console.log('HEADERS: ' + JSON.stringify(res.headers))
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
        // 响应体
        console.log('BODY: ' + chunk)
    });
    res.on('end', function(err) {
        // 响应结束
        console.log("UPLOAD DONE")
    });
});
request.on("error", function(e) {
    // 请求出错，可能是服务器的问题。比如配置的上传文件目录地址有误等
    console.log('upload Error: ' + e.message)
})
request.setHeader('Content-Type', 'multipart/form-data; boundary="' + boundaryKey + '"') // 设置编码方式 multipart/form-data 和各个 part 之间的界定符
var filename = path.basename(uploadFilePath);

var part = []
part.push('--' + boundaryKey) // part 开始界定符
part.push('Content-Type: application/octet-stream')
part.push('Content-Disposition: form-data; name="' + formFieldName + '"; filename="' + filename + '"')
part.push('Content-Transfer-Encoding: binary')
part.push('\r\n')
request.write(part.join('\r\n'))

var readStream = fs.createReadStream(uploadFilePath, {
    bufferSize: 4 * 1024
})
readStream.on('end', function(err) {
    if (err) {
        console.error(err)
        return;
    }
    request.end('\r\n--' + boundaryKey + '--') // 请求体结束标记
    console.log("finish sending file " + uploadFilePath + ' content')
})
readStream.pipe(request, {
    end: false // readStream 读完之后，还要再补充一行请求体结束标记
})