<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <title>WiFi 昨侦定位图</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        body{
            background-color: #F9F9F9;
        }
        .main {
            overflow: hidden;
            background-color: #FFF;
        }
        .data-from-webview {
            display: none;
        }
        .top {
            background-image: url(/assets/img/position_background.png);
            background-repeat: no-repeat;
            background-size: cover;
            position:absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 50%;
            background-position: center;
        }
        .top-box {
            position:absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 60%;
        }
        .top-text {
            width: 160px;
            height: 160px;
            position: absolute;
            top: 50%;
            left:  50%;
            margin-top: -80px;
            margin-left: -80px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url(/assets/img/position_power.png);
        }
        .power-text {
            display: inline-block;
            height: 160px;
            line-height: 160px;
            color: #fff;
            font-size: 40px;
            width: 100%;
            text-align: center;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .drawer {
            position: absolute;
            top: 40%;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .drawer-box {
            height: 100%;
        }
    </style>
</head>
<body>
<div id="abc" class="data-from-webview">["11:11:11:11:11:11", "BigBrother", "22:22:22:22:22:22", {"mac": "11:22:33:44:55:66", "power": -77}]</div>
<div class="single">
    <div class="top"></div>
    <div class="top-box">
        <div class="top-text">
            <span id="power" class="power-text">0</span>
        </div>
    </div>
    <div class="drawer">
        <div id="container" class="drawer-box"></div>
    </div>
</div>
<div class="main">
    <div class="left">
        <div class="top">
            <div class="hexagon">
                <span id="leftPower" class="power">0</span>
            </div>
            <div id="leftName" class="name">路由</div>
        </div>
        <div class="mainDrawer">
            <div id="leftContainer" class="container"></div>
        </div>
    </div>
    <div class="right">
        <div class="top">
            <div class="hexagon">
                <span id="rightPower" class="power">0</span>
            </div>
            <div id="rightName" class="name">设备</div>
        </div>
        <div class="mainDrawer">
            <div id="rightContainer" class="container"></div>
        </div>
    </div>
</div>
<script src="/assets/js/jquery.js"></script>
<script src="/assets/js/echarts.min.js"></script>
<script src="/assets/js/moment.js"></script>
<script src="/assets/lib/stomp.js"></script>
<script>
    var pollCount = 0;
    var pollWindowHeight = function(isAp, arrFromRN) {
        if (window.innerHeight == 0) {
            pollCount += 1;
            if (pollCount < 200)   {
                setTimeout(pollWindowHeight, 50);
            }
        } else {
            setContainerStyle(window, isAp, arrFromRN)
        }
    }
    $(function () {
        $('.single').hide()
        $('.main').hide()
        setTimeout(function () {
            var str = document.querySelector('#abc').innerText
            alert(str)
            var arrFromRN = JSON.parse(str)
            var isAp = false
            if (arrFromRN[2] == '00:00:00:00:00:00') {
                isAp = true
            }
            pollWindowHeight(isAp, arrFromRN);
        }, 1000)
    });
    function setContainerStyle(win, isAp, arrFromRN) {
        var windowsH = win.innerHeight,
            windowsW = win.innerWidth;
        if (isAp) {
            $('.single').show()
            var containerBoxH = windowsH * 0.6 - 20;
            var styleOb = {
                height: containerBoxH + 'px',
                width: windowsW - (20 * 2) + 'px'
            }
            $('#container').css(styleOb);
            init(isAp, arrFromRN);
        } else {
            $('.main').show()
            var leftStyle = {
                float: 'left',
                height: (windowsH - 20) + 'px',
                width: (windowsW / 2 - 20) + 'px',
                margin: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
            }
            var rightStyle = {
                height: (windowsH - 20) + 'px',
                width: (windowsW / 2 - 20)+ 'px',
                marginLeft: (windowsW / 2 + 10) + 'px',
                marginTop: '10px',
                marginBottom: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
            }
            var topStyle = {
                height: (windowsH * 0.4) + 'px',
                backgroundImage: 'url(/assets/img/position_background.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'auto 100%',
                backgroundPosition: 'center',
                position: 'relative',
            }
            var hexagonStyle = {
                width: '150px',
                height: '150px',
                backgroundImage: 'url(/assets/img/position_power.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: '-75px',
                marginTop: '-90px',
            }
            var powerStyle = {
                display: 'inline-block',
                height: '150px',
                inlineHeight: '150px',
                color: '#FFF',
                fontSize: '80px',
                width: '100%',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                marginTop: '30px',
            }
            var nameStyle = {
                display: 'inline-block',
                width: '100%',
                height: '150px',
                inlineHeight: '150px',
                color: '#FFF',
                fontSize: '36px',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                position: 'absolute',
                top: '75%',
            }
            var mainDrawerStyle = {
                paddingTop: '20px',
            }
            var containerStyle = {
                height: (windowsH * 0.6 - 40) + 'px',
            }
            $('.left').css(leftStyle);
            $('.right').css(rightStyle);
            $('.top').css(topStyle);
            $('.hexagon').css(hexagonStyle);
            $('.power').css(powerStyle);
            $('.name').css(nameStyle);
            $('.mainDrawer').css(mainDrawerStyle);
            $('.container').css(containerStyle);
            init(isAp, arrFromRN);
        }
    }
    function init(isAp, arrFromRN){
        // document.addEventListener('message', function(msg) {
        //     console.log('监听来自 RN 的数据', msg)
        //     document.querySelector('#power').innerText = msg + '呵呵哒'
        // })
        // window.postMessage('向 RN 发送数据')
        var ws = new WebSocket('ws://192.168.60.1:15674/ws');
        var client = Stomp.over(ws);
        var arr = arrFromRN.slice(3)
        var dom, leftDom, rightDom
        if (isAp) {
            dom = document.getElementById("container")
            var myChart = echarts.init(dom);
            var lastTime = new Date().getTime()
            console.log('lastTime', lastTime)
            var data = []
            var num = -1
            var l = arr.length
            arr.forEach((element, index) => {
                var now = new Date().getTime()
                var indexTime = new Date(now - (l - index) * 1000)
                data.push({
                    name: indexTime.toString(),
                    value: [indexTime, element.power]
                })
            });
            option = {
                xAxis: {
                    minInterval: 1,
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '定位数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: data
                }],
                backgroundColor: 'rgba(255, 255, 255, 1)',
            };
            client.connect('guest', 'guest', function () {
                client.subscribe("/topic/wifi_locate", function (res) {
                    var currentTime = new Date().getTime()
                    console.log('currentTime', currentTime)
                    if (typeof res == 'string' && res.indexOf('mac=') == 0 && res.indexOf('power=') > 0) {
                        res = {
                            mac: res.substr(4, 17),
                            power: res.substring(28) ? res.substring(28) : -1
                        }
                    } else {
                        res = {
                            mac: '00:00:00:00:00:01',
                            power: -1
                        }
                    }
                    num = res.power
                    if (lastTime != currentTime) {
                        if (num > 0) {
                            console.log('不做什么')
                        } else {
                            document.querySelector('#power').innerText = res.power
                            var now = new Date();
                            var time = now.getTime();
                            if (data.length >= 200) {
                                data.shift();
                            }
                            data.push({
                                name: now.toString(),
                                value: [now, res.power]
                            });
                            console.log(data)
                            myChart.setOption({
                                series: [{
                                    data: data
                                }]
                            });
                            lastTime = currentTime
                        }
                    } else {
                        console.log('计数重复')
                    }
                });
            });
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        } else {
            leftDom = document.getElementById("leftContainer");
            rightDom = document.getElementById("rightContainer");
            var apMac = arrFromRN[0]
            var apName = arrFromRN[1]
            var staMac = arrFromRN[2]
            var leftChart = echarts.init(leftDom);
            var rightChart = echarts.init(rightDom);
            var lastTime = new Date().getTime()
            var leftData = []
            var rightData = []
            var num = -1
            var l = arr.length
            arr.forEach((element, index) => {
                var now = new Date().getTime()
                var indexTime = new Date(now - (l - index) * 1000)
                if (element.mac == apMac) {
                    leftData.push({
                        name: indexTime.toString(),
                        value: [indexTime, element.power]
                    })
                } else {
                    rightData.push({
                        name: indexTime.toString(),
                        value: [indexTime, element.power]
                    })
                }
            });
            let option = {
                xAxis: {
                    minInterval: 1,
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                backgroundColor: 'rgba(255, 255, 255, 1)',
            };
            leftOption = Object.assign(option, {series: [{
                    name: '定位数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: leftData
                }]})
            rightOption = Object.assign(option, {series: [{
                name: '定位数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: rightData
            }]})
            client.connect('guest', 'guest', function () {
                client.subscribe("/topic/wifi_locate", function (res) {
                    var currentTime = new Date().getTime()
                    console.log('currentTime', currentTime)
                    if (typeof res == 'string' && res.indexOf('mac=') == 0 && res.indexOf('power=') > 0) {
                        res = {
                            mac: res.substr(4, 17),
                            power: res.substring(28)
                        }
                    } else {
                        res = {
                            mac: '00:00:00:00:00:01',
                            power: -1
                        }
                    }
                    num = res.power
                    if (lastTime != currentTime) {
                        if (num > 0) {
                            console.log('不做什么')
                        } else {
                            if (apMac == res.mac) {
                                document.querySelector('#leftPower').innerText = res.power
                            } else {
                                document.querySelector('#rightPower').innerText = res.power                                
                            }
                            var now = new Date();
                            var time = now.getTime();
                            if (leftData.length >= 200) {
                                leftData.shift();
                                leftData.push({
                                    name: now.toString(),
                                    value: [now, res.power]
                                });
                                console.log(leftData)
                                leftChart.setOption({
                                    series: [{
                                        data: leftData
                                    }]
                                });
                            }
                            if (rightData.length >= 200) {
                                rightData.shift();
                                rightData.push({
                                    name: now.toString(),
                                    value: [now, res.power]
                                });
                                console.log(rightData)
                                rightChart.setOption({
                                    series: [{
                                        data: rightData
                                    }]
                                });
                            }
                            lastTime = currentTime
                        }
                    } else {
                        console.log('计数重复')
                    }
                });
            });
            if (leftOption && typeof leftOption === "object") {
                leftChart.setOption(leftOption, true);
            }
            if (rightOption && typeof rightOption === "object") {
                rightChart.setOption(rightOption, true);
            }
        }
    }
</script>
</body>
</html>


