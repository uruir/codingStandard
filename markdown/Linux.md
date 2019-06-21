## 组成

- linus 的内核
- GNU 的 Unix 实用程序集
  + 处理文本
  + 操作文本
  + 管理进程

在 linux 发行版上默认使用 bash shell，由 GNU 开发，用于取代标准的 Unix shell(bourne again shell)

X Windows(KDE/GNOME) 软件是一个低级别的程序，能与 PC 中的显卡和监视器直接交互，并控制 linux 应用程序如何在计算机中展示高级窗口和图形。

- /bin 实用程序
- /boot 引导文件
- /dev 设备节点
- /etc 系统配置文件
- /home 用户
- /lib 系统和程序库文件
- /media 移动媒体挂载点
- /mnt 挂载目录
- /opt 可选软件包
- /root 主目录
- /sbin 系统级程序
- /tmp 临时文件
- /usr 安装软件
- /var 日志文件

## 开机启动

内核创建第一个进程,为 init process，由它启动系统上的其它进程。

将命令放进 `/etc/rc.local`，文件头使用 `#!/bin/sh -x`，在 `/var/log/messages` 里查看开机启动命令执行的 log。失败的原因可能是 `rc.local` 执行时没有环境变量。

## 内存

`cat /proc/meminfo`

## 进程

`ps ax`

pid 是进程 id，stat 是当前状态（s 表示休眠，sw 表示休眠并等待，r 表示运行），最后一列由方括号包围的处在虚拟内存中

`ps -ef | grep xxx`

## 外置硬件

驱动程序使内核能向设备传输数据，linux 将硬件设备标识为特殊文件，称为设备文件或节点，分为三种：字符设备，块设备和网络设备

## Command Line Interface

### 设置密码

`sudo passwd`

### ls

- -a 显示隐藏文件
- -c 以最后一次修改排序
- -l 显示详情，后面跟目录名则为该目录的详情

第一列：文件类型。d 表示目录，- 表示文件，c 表示字符设备，b 表示块设备

第二列：权限

第三列：指向该文件的硬链接数量

第四列：所有者

第五列：所属组

第六列：字节大小

第七列：上次修改时间

第八列：文件或目录名称

### 文件

`stat filename`

`file filename`

### 文件与文本

`grep xxx -n filename`

`cat -n filename`

`head filename`

`tail filename`

### 硬盘

`df -h`