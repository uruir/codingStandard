## 组成

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

内核创建第一个进程为 init process，由它启动系统上的其它进程。

将命令放进 `/etc/rc.local`，文件头使用 `#!/bin/sh -x`，在 `/var/log/messages` 里查看开机启动命令执行的 log。

失败的原因可能是 `rc.local` 执行时没有环境变量。

### 重启 shell

`source .bash_profile`

## 内存

`cat /proc/meminfo`

## 进程

`ps ax`

pid 是进程 id，stat 是当前状态（s 表示休眠，sw 表示休眠并等待，r 表示运行），最后一列由方括号包围的处在虚拟内存中

`ps -ef | grep xxx`

## 外置硬件

驱动程序使内核能向设备传输数据，linux 将硬件设备标识为特殊文件，称为设备文件或节点，分为三种：字符设备，块设备和网络设备

### 查看硬盘信息

`df -h`

## 文件与文本

`grep xxx -n filename`

`cat -n filename`

`stat filename`

`file filename`

`head filename`

`tail filename`

## 网络

`lsof -i tcp:1087`