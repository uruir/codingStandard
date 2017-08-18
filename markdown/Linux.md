
 
内核:
1.系统内存管理;
2.软件程序管理;
3.硬件管理;
4.文件系统管理;
 
cat /proc/meminfo查看内存使用情况
每个进程有自己专用的内存分页.
同理进程不能访问内核进程使用的内存.
ipcs -m查看共享内存
 
内核创建第一个进程,为init process。由它启动系统上的其它进程。
 
ps ax查看进程
pid是进程id/stat是当前状态（s--休眠，sw--休眠并等待，r--运行）/最后一列由方括号包围的处在虚拟内存中
 
驱动程序使内核能向设备传输数据
linux将硬件设备标识为特殊文件，称为设备文件，分为三种：
字符c（路由）/块b（硬盘）/网络（网卡）
Linux为系统的每个设备创建特殊文件，称为节点。所有与设备的通信都通过设备节点完成。每个节点都有一个唯一的数字对（主和次）。
 
内核使用virtual files system与每个文件系统(ntfs,ext…)连接.
 
linus的内核和GNU的Unix实用程序集组成linux
GNU的三个部分：
处理文件，操作文本，管理进程
由shell进行交互
在linux发行版上默认使用的shell是bash shell，由GNU开发，用于取代标准的Unix shell（bourne again shell）
X Windows软件是一个低级别的程序，能与PC中的显卡和监视器直接交互，并控制linux应用程序如何在计算机中展示高级窗口和图形。
另外的图形程序有KDE，GNOME
gedit是GNOME的文本编辑器
nautilus是其图形文件管理器
 
command line interface
 
virtual console按ctrl+alt+f1-f8来进入
最后两个控制台给图形化桌面使用
 
键入xterm(终端模拟包)
按住ctrl+鼠标左键呼出xterm菜单
还有Konsole和gnome两个模拟包
 
/etc/passwd文件最后一行是uruir配置文件，分别对应：
用户名：密码：系统ID编号：组ID编号：全名：默认目录：默认shell
 
显示当前提示符设置：
echo $PS1
PS1="[\t][\u]\$"
 
/bin--实用程序
/boot--引导文件
/dev--设备节点
/etc--系统配置文件
/home--用户
/lib--系统和程序库文件
/media--移动媒体挂载点
/mnt--挂载目录
/opt--可选软件包
/root--主目录
/sbin--系统级程序
/tmp--临时文件
/usr--安装软件
/var--日志文件
 
cd后没有参数则回到主目录
.表示当前目录
..表示父目录
cd ../../
 
ls -F显示文件和文件夹
* 表示是可执行文件
ls -a显示隐藏文件
 
ls -l显示详细信息:
第一列：文件类型。d-目录，--文件，c-字符设备，b-块设备
第二列：权限
第三列：指向该文件的硬链接数量
第四列：所有者
第五列：所属组
第六列：字节大小
第七列：上次修改时间
第八列：文件或目录名称
 
ls -c以最后一次修改排序
ls -l xxx具体显示某个目录里的文件，即用了过滤
 
touch -t 198806290000 born以设定时间来创建文件
 
cp source destination
ls -il字符i表示索引节点，节点名不同则是不同的文件
ls -R  dir1 dir2复制整个目录
cp -l xxx xxx硬链接，索引节点编号和源文件相同。
cp -s xxx xxx软链接，当删除源文件时目标文件也不存在了
 
rm -r dir用于递归删除非空目录
rm -rf dir一次性删除目录
 
stat xxx显示文件具体属性
file xxx查看文件类型
 
cat -n xxx带行号显示文件内容
more xxx or less xxx一页一页的显示
tail xxx or head xxx显示文件开始or最后十行
 
ps查看进程(特定时间点信息)
top实时模式查看进程
 
kill -s HUP PID杀死进程
 
设置root密码
sudo passwd
进入root用su
退出用exit or ctrl+D
 
查看硬盘使用情况:df -h
 
test xxx是直接显示文件内容，而sort xxx则根据行首字母来排序显示，它不分大小 写，相同则查找后一个字符，数字则以首位排完后再排第二位，sort -n xxx则是正常的大小排序。
 
grep xxx xxx.xxx在xxx.xxx文件中找含xxx字符的行
grep -nv xxx xxx.xxx同时显示n行号，v反转行
-c表示有几行匹配
grep [xx] xxx含有x or x字符的行
 
压缩文件bzip2 xxx
查看压缩文件内容bzcat xxx.bz2
解压它bunzip2 xxx.bz2
当文件很小时压缩不一定比压缩前小
or
gzip/gzcat/gunzip
 
zip -r xxxzip xxx将xxx文件夹压缩，但并非所有的都能被压缩
unzip xxx.zip解压
 
tar -cvf xxx.tar xx1/ xx2/将xx1 & xx2文件夹压缩到xxx.tar文件
tar -tf xxx.tar显示该文件中的文件，不解压
tar -xvf xxx.tar则解压
.tgz表示被经过gzip压缩的tar文件--两次压缩？？？
解压用tar -zxvf xxx.tgz

第8章--shell脚本
一行多个命令：
date ; who
 
创建脚本时，须在首行加入：
#!/bin/bash
 
chmod u+x file
//赋于执行权
./file
//执行它
 
echo Let's see if this'll work
//显示，可加单引和双引号
 
#!/bin/bash
echo show the systime:
//echo -n show  the systime:则把时间和echo显示在同一行
date
echo "let's look who's logged into the system:"
who
sleep 100
//100s
date
 
set
//查看变量
#!/bin/bash
echo 'user info for userid:$USER'
//$放在引号内依然被识别，直接用需要要加/
echo UID:$UID
echo HOME:$HOME
 
用户变量
不超过20个字符的字母、数字或下划线组成的文本字符串，区分大小写，在变量、等号和变量值之间不允许有空格。如：
var1=10
var2=-7
var3=testing
var4="still more testing"
 
#!/bin/bash
name="uruir"
day=5
echo "$name checked in $day ago"
name='tr'
//变量可用单引
day=4
echo "$name checked in $day ago"
//这里一定要双引
 
用变量赋值
value1=10
value2=$value1
//仍要使用$
 
使用反引号
//`
echo `date`
//显示日期，等同于直接date
#!/bin/bash
testing=`date`
//把date输出赋于testing变量
echo "the date and time are:" $testing
 
#!/bin/bash
today=`date +%y%m%d`
//定义日期格式
ls /usr/bin -al > log.$today
//重定向，>前后有无空格无所谓
给文件尾追加信息用>>
 
输入入用<
如：wc < file
第一列是文本的行数
第二列是文本的单词数
第三列是文本的字节数
$ wc << EOF
> test string 1
> test string 2
> test string 3
> EOF
 3   9   42
 
command | sort | more把命令生成的数据进行排序，并一页一页显示，这是管道的功能，比<强一些
command | sort > xxx
more xxx
这样更好看点
 
expr 1 + 5
//计算记法，注意空格
expr 2 \* 3
//乘要用转义符
#!/bin/bash
val1=10
val2=20
val3=`expr $val2 / $val1`
//反引号
echo the result is $val3
 
val=$[2*3]
//相较于expr，方括号好用
echo $val
//6，在用变量的值的时候要用$
 
在shell下有个bc计算器
bc
12 * 5.3
quit
 
bc -q
scale=6
//精确度
 
正常情况下一条命令成功退出状态是0
运行出现错误里
echo $?
会显示非0数
代码
描述
0
命令成功完成
1
通常的未知错误，无效参数
2
误用shell命令
126
命令无法执行，无权限
127
没有找到命令，用sudo apt-get install
128
无效的退出参数
128+x
使用Linux信号x的致使错误
130
使用Ctrl - C 终止的命令
255
规范外的退出状态
也可在脚本最后加上：
exit 5
这样有echo $?
显示的就是5
但是退出状态码最高为255，超过的取模，用256

第9章--if then
#!/bin/bash
if date
//exit = 0 equal true
then
echo "it's worked"
else
commands
fi
 
#!/bin/bash
user=uruir
if grep $user /etc/passwd
then
echo the bash files for user $user are:
ls -a /home/$user/.b*
fi
 
if command1
//[ $val1 -gt 6 ]测试条件
then
commands
elif command2
then
more commands
fi
 
PS：bash shell只能处理整数数字
 
第10章--更多结构化数据
#!/bin/bash
for test in I don\'t know if "this'll" work
//以空格来分，或是双引间的，或用转义符不让shell分隔
do
echo this is $test
done
echo this is $test
//work
test=ur
echo this is $test
//ur
 
#!/bin/bash
file="place"
IFS=$'\n'
//以换行符来分隔,一行中的new york就是一个词了
for test in `cat file`
//输入是外部文件中的内容
do
echo …
done
 
#!/bin/bash
for file in /home/uruir/Django-1.6/*
do
if [ -d "$file" ]
then
echo "$file is a dir"
elif [ -f "$file" ]
then
echo "$file is a file"
fi
done
 
#!/bin/bash
IFS.OLD=$IFS
IFS=$'\n'
for entry in 'cat /etc/passwd'
do
echo "values in $entry -"
IFS=:
for  value in $entry
do
echo "$value"
done
done
 
第11章--处理用户输入
#!/bin/bash
total=$[ $1 * $2 ]
//接收这两个参数
echo first num $1
echo second num $2
echo total is $total
文件名是第0个参数，加在文件名后的是第一个参数，都与$x对应
 
#!/bin/bash
name='basename $0'
//不带路径，只显示文件名
echo the command entered is:$name
 
#!/bin/bash
echo there are $# pere.
//文件名后有几个参数就显示几个
 
#!/bin/bash
count=1
while [ -n "$1" ]
do
echo "pare #$count = $1"
count=$[ $count +1 ]
shift
//将全体参数向左移
done
 
getopt/getopts
 
read name
//读取用户输入
echo $name
//如果是echo -n "xxx"，则表示取消换行符，就在之后显示下一行内容
 
read -p "enter u age:" age
days=$[ $age * 365 ]
echo "that makes u over $days old"
 
read -p "enter u name:" first last
echo "u name is $first $last."
 
#!/bin/bash
if read -t 5 -p "enter u name:" name
//必须5秒内输入
then
    echo "welcome, $name"
else
    echo "sorry, too slow"
fi
 
#!/bin/bash
read -n1 -p "do u want to continue [y|n]?" answer
//只允许输入一次，如果带-s则表示不显示，用于输入密码
case $answer in
Y | y) echo
           echo "fine"
N | n) echo
            echo "bye"
            exit;;
esac
 
第12章
文件描述符0，1，2--stdin,stdout,stderr，用户自定义3-9
date | tee test
date | tee -a test
//追加文件内容
 
第13章
退出任务用Ctrl+C
停止任务用Ctrl+Z
//STAT状态是T
用ps au查看正在运行的程序
使用kill -9 PID来杀死进程
在后台运行脚本只要在后面加空格&
 
运行优先级nice&renice
test > testout &
ps al
renice 10 -p PID
 
在某时刻运行程序
at -f exe 17:47
 
开机导入内核后
/sbin/init第一个运行，它的PID是1
它读取/etc/inittab文件

第16章
echo "this is a test" | sed 's/test/big test/'
//this is a big test
sed 's/dog/cat/' file
//file里的dog->cat

ps ax | grep mysql
mysql -u root -p
\s
show databases;
USE mysql
CREATE DATABASE urtest;
USE urtest;
show tables;
GRANT SELECT,INSERT,DELETE,UPDATE ON test.* TO test IDENTIFIED by 'test';
mysql test -u test -p

 
 

 
 
 
 
 
 
