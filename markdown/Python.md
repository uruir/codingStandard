###适合的领域
- Web网站和各种网络服务
- 系统工具和脚本
- 作为“胶水”语言把其他语言开发的模块包装起来方便使用
python.org下载安装后，在环境变量path里添加C:\Python27（默认路径）
打开CMD运行python即进入python
```
exit() //退出python
print 'hello uRuier' //打印
```
cmd里切换到F盘
```
F:
cd 目录名 //切换到该目录下
dir //显示当前目录下文件内容
python hello.py //运行保存的py文件
```
###支持的数据类型
- 整数。int('123', 8) //8进制，默认10进制
- 浮点数
- 字符串，用'' or ""包围
- 布尔值，取True or False，可通过and or not三个运算符得到布尔值，等号用==，python把0、空字符串和None都看成False
- 空值，用None表示
- 其它，如列表、字典和自定义等类型
###print语句
```
print 'turui', 'love', 'nmq' //连接字符串，遇到“，”会加空格
```
###注释
```
# 这一行是注释
```
###转义
当有很多字符要转义时，通过“\"很麻烦
所以用“r'''...'''”括起来
表示...的内容原样输出
###编码
- ASCII //英文，单字节
- GB2312 //中文，双字节
- Unicode //万国码，双字节
英文单字节编码转为双字节，只要高字节置0
```
print u'中文' //中文
print u'''多行
中文''' //在两行上显示
ur'''Python的Unicode字符串支持“中文”，
“日文”，
“韩文”等多种语言'''
```
如果出现UnicodeDecodeError，是因为.py文件保存的格式有问题，在文件第一行加注释
```
# -*- coding: utf-8 -*-
```
###List and tupple
```
L = ['turui', 27]
print L[0] //turui
```
从0开始索引
可以用倒数
```
print L[-1] //27
```
在列表尾添加元素
```
L.append('nmq')
```
按索引添加
```
L.insert(0, 'love')
```
删除元素
```
L.pop() //从尾部弹出，并返回结果
L.pop(2) //从索引位置删
```
有序列表tuple，它创建后不能改值（指向不变，但指向的变量值可变），最好在最后加个逗号
```
t = ('Adam', 'Lisa', 'Bart',) //t[2]的值是Bart
```
函数返回多值是一个tuple
###if
```
score = 75
if score >= 60:
    print 'passed'
```
```
age = 16
if not age >= 18:
    print 'teenager'
```
```
if age >= 18:
    print 'adult'
elif age >= 6:
    print 'teenager'
else:
    print 'kid'
```
###for
```
L = [75, 92, 59, 68]
sum = 0.0
for i in L:
    sum += i
print sum / 4
```
###while
```
sum = 0
x = 1
while x <= 100:
    sum += x
    x += 1
print sum
```
```
sum = 0
x = 1
n = 1
while True:
    if n > 20:
        break
    sum = sum + x
    x = x * 2
    n = n + 1
print sum
```
```
sum = 0
x = 0
while True:
    x = x + 1
    if x > 100:
        break
    if x % 2 == 0: //当不满足条件，就不执行下面的sum加语句
        continue
    sum = sum + x
print sum
```
```
for x in [1, 2, 3, 4, 5, 6, 7, 8, 9]:
    for y in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]:
        if x < y:
            print x * 10 + y
```
###dict无序但快速，key不能重值
```
d = {
    'Adam': 95,
    'Lisa': 85,
    'Bart': 59,
}
print len(d) //计算d的长度
print d['Adam']
if 'Paul' in d:
    print d['Paul']
print d.get('Bart') //如果没有Bart，返回None
d['Paul'] = 72 //给d加Key-Value对
print 'Adam:', d['Adam']
```
```
# -*- coding: utf-8 -*-
d = {
    95: 'Adam',
    85: 'Lisa',
    59: 'Bart'
}
print d[95] //这里没用单引号表示Key值，结果为Adam
```
```
d = {
    'Adam': 95,
    'Lisa': 85,
    'Bart': 59
}
for name in d:
    print name + ':', d.get(name)
```
###set，无序且不重复
```
s = set(['Adam', 'Lisa', 'Bart', 'Paul'])
print
```
```
s = set(['adam', 'bart'])
print 'adam' in s //True
print 'Bart' in s //False
```
```
months = set(['Feb', 'Jan'])
x1 = 'Feb'
x2 = 'Sun'

if x1 in months:
    print 'x1: ok'
else:
    print 'x1: error'

if x2 in months:
    print 'x2: ok'
else:
    print 'x2: error'
```
遍历set
```
s = set([('Adam', 95), ('Lisa', 85), ('Bart', 59)])
for x in s:
    print x[0] + ':', x[1]
```
更新set
```
s = set(['Adam', 'Lisa', 'Paul'])
L = ['Adam', 'Lisa', 'Bart', 'Paul']
for name in L:
    if name in s:
        s.remove(name)
    else:
        s.add(name)
print s
```
###帮助
```
help(abs)
```
###函数
```
L = []
x = 1
while x <= 100:
    L.append(x * x)
    x += 1
print sum(L)
```
```
def square_of_sum(L):
    sum = 0
    for x in L:
        sum = sum + x * x
    return sum
print square_of_sum([1, 2, 3, 4, 5])
print square_of_sum([-5, 0, 5, 15, 25])
```
解一元二次方程
```
import math

def quadratic_equation(a, b, c):
    t = math.sqrt(b * b - 4 * a * c)
    return (-b + t) / (2 * a), (-b - t) / (2 * a)
print quadratic_equation(2, 3, 0)
print quadratic_equation(1, -6, 5)
```
汉诺塔
```
def move(n, a, b, c):
    if n ==1:
        print a, '-->', c
        return
    move(n-1, a, c, b)
    print a, '-->', c
    move(n-1, b, a, c)
move(4, 'A', 'B', 'C')
```
默认参数的函数
```
def greet(g = 'world'):
    print 'hello,', g + '.'

greet()
greet('Bart')
```
可变参数
```
def average(*args):
    sum = 0.0
    if len(args) == 0:
        return sum
    for x in args:
        sum += x
    return sum / len(args)
print average()
print average(1, 2)
print average(1, 2, 2, 3, 4)
```
###切片
```
L[::2] //冒号前后没有值表0或最大索引，最后的2表示隔2个取值
```
```
range(1, 101) //[1, 2, 3, ..., 100]
```
对字符串切片
```
'abcde'[:3] //abc
```
####字符串方法
大写
```
'abc'.upper() //ABC
```
仅首字母大写
```
def firstCharUpper(s):
    return s[:1].upper() + s[1:]

print firstCharUpper('hello')
print firstCharUpper('sunday')
print firstCharUpper('september')
```
注意: 集合是指包含一组元素的数据结构，我们已经介绍的包括：
1. 有序集合：list，tuple，str和unicode；
2. 无序集合：set
3. 无序集合并且具有 key-value 对：dict
###迭代
```
for i in range(1, 101):
    if i % 7 == 0:
        print i
```
使用 enumerate()函数，我们可以在for循环中同时绑定索引index和元素name。
但是，这不是 enumerate() 的特殊语法。实际上，enumerate() 函数把：
```
['Adam', 'Lisa', 'Bart', 'Paul']
```
变成了类似：
```
[(0, 'Adam'), (1, 'Lisa'), (2, 'Bart'), (3, 'Paul')]
```
因此，迭代的每一个元素实际上是一个tuple：
```
for t in enumerate(L):
    index = t[0]
    name = t[1]
    print index, '-', name
```
或
```
for index, name in enumerate(L):
    print index, '-', name
```
zip()函数可以把两个 list 变成一个 list：
```
zip([10, 20, 30], ['A', 'B', 'C']) //[(10, 'A'), (20, 'B'), (30, 'C')]
```
```
L = ['Adam', 'Lisa', 'Bart', 'Paul']
for index, name in zip(range(1, len(L)+1), L):
    print index, '-', name
```
dict 对象有一个 values() 方法，这个方法把dict转换成一个包含所有value的list，这样，我们迭代的就是 dict的每一个 value：
```
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59 }
print d.values()
# [85, 95, 59]
for v in d.values():
    print v
# 85
# 95
# 59
```
```
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59, 'Paul': 74 }

sum = 0.0
for k, v in d.items():
    sum = sum + v
    print k + ':', v
print 'average', ':', sum / len(d)
```
列表生成式
```
[x * x for x in range(1, 11) if x ^ 2 == 0]
```
```
print [x * (x+1) for x in range(1,100,2)]
```
```
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59 }
def generate_tr(name, score):
    if score < 60:
        return '<tr><td>%s</td><td style="color:red">%s</td></tr>' % (name, score)
    return '<tr><td>%s</td><td>%s</td></tr>' % (name, score)
tds = [generate_tr(name, score) for name, score in d.iteritems()]
print '<table border="1">'
print '<tr><th>Name</th><th>Score</th><tr>'
print '\n'.join(tds)
print '</table>'
```
```
def toUppers(L):
    return [x.upper() for x in L if isinstance(x, str)]
print toUppers(['Hello', 'world', 101])
```
```
[m + n for m in 'ABC' for n in '123']
print [x*100 + y*10 + z for x in range(1,10) for y in range(0, 10) for z in range(10) if x == z]
```

## 设置环境变量

```
set PYTHON=C:\problems\Python27\python.exe
echo %PYTHON%

mklink python2.7.exe python.exe

npm config set python C:\problems\Python27\python.exe
```
