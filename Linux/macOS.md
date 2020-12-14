## 修复系统

### 设置管理员权限或忘记账号密码

1. 开机时按住 `cmd + s`
2. 输入 `/sbin/mount -uaw`
3. 输入 `rm /var/db/.AppleSetupDone`
4. 输入 `reboot` 重启电脑
5. 像用新电脑时一样设置新的管理员，用新管理员修改其他账号信息

## 快捷键

### 键盘快捷键

|key|remark|
|:---:|:---:|
|cmd + H|隐藏当前窗口|
|cmd + M|最小化当前窗口|
|cmd + option + H|隐藏除当前窗口之外所有窗口|
|cmd + option + M|最小化所有同类窗口，比如所有 finder|
|cmd + option + M + H|显示桌面；也可以按下 `F11`|
|option + 窗口左上角全屏按钮：|最大化当前窗口|
|cmd + shift + 3|全屏截图|
|cmd + shift + 4|区域截图|
|cmd + option + shift + esc|强制退出当前软件|
|cmd + option + esc|强制退出软件|
|cmd + option + v|剪切到目标文件夹|
|cmd + H|隐藏当前窗口|
|cmd + shift + D|打开桌面文件夹（在 finder 中，按 cmd + shift + A 进入“应用程序”）|
|cmd + option + D|显示/隐藏 Dock|
|ctrl + 左右键|左右切换桌面|

### 触摸板手势

- 四指向上滑动：显示所有已打开的程序（可以把应用放到其它桌面）
- 四指向下滑动：显示当前程序所有窗口
- 四指张开：显示桌面

## 常用效率软件

### Alfred

#### 搜索不到程序是因为把索引关了

```
sudo mdutil -a -i on
```

## 系统设置

### 登录界面显示其它账号

```
sudo defaults write /Library/Preferences/com.apple.loginwindow SHOWOTHERUSERS_MANAGED -bool TRUE
```

### 已删除的应用还残留在 launchpad 中

打开 launchpad，按住 `option` 键，出现 `X` 后点击删除之。

### 修改 launchpad 每页显示的应用数

注意：下列代码中 columns 代表每页显示的列数；rows 代表显示行数；更改后会解开文件夹，所有应用平铺在 launchpad；

```
defaults write com.apple.dock springboard-columns -int 12;
defaults write com.apple.dock springboard-rows -int 9;
defaults write com.apple.dock ResetLaunchPad -bool TRUE;
killall Dock
```

### 清除 launchpad 里的应用图标

```
sqlite3 $(sudo find /private/var/folders -name com.apple.dock.launchpad)/db/db "DELETE FROM apps WHERE title='照片';" && killall Dock
```

### TotalFinder

1. 重启时按 CMD + R
2. csrutil disable
3. csrutil enable

## 系统应用

### finder

- cmd + 1/2/3/4：在四种文件查看方式间切换
- 选中想要预览的文件，按空格键就可以左右预览文件

```
# 不显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
# 显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```