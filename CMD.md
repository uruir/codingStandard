### 文件

```
# 创建文件（若 someText 两边加引号将会把引号一同写进文本，所以不需要画蛇添足）
echo someText > x.txt
# 往文本文件末尾追加文本（也可用于直接创建文本文件）
echo someAppended >> x.txt
# 删除文件
del x.txt
rm x.txt
# 打开文件
直接输入文件名即可用默认程序打开
# 重命名文件
ren before.txt after.txt
```

### 文件夹

```
# 新建文件夹
mkdir test
# 删除文件夹：/s 代表递归删除，/q 代表强制删除
rmdir /s/q FOLDER
或者简写成：rd /s/q test
# 查看当前文件夹下文件信息
dir
```

### 服务

```
# 开启与关闭休眠
powercfg -h on/off
```