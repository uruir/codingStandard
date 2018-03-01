## launchpad

### 已删除的应用还残留在 launchpad 中

打开 launchpad，按住 `option` 键，出现 `X` 后点击删除之。

## Alfred

### 搜索不到程序是因为把索引关了

```
sudo mdutil -a -i on
```

## 修复系统

### 清除缓存

开机的时候按住 `cmd + option + P + R`，直到三声“duang”之后松手，第四声为开机声。

### 设置管理员权限或忘记账号密码

1. 开机时按住 `cmd + s`
2. 输入 `/sbin/mount -uaw`
3. 输入 `rm /var/db/.AppleSetupDone`
4. 输入 `reboot` 重启电脑
5. 像用新电脑时一样设置新的管理员，用新管理员修改其他账号信息

## 接口

2016 年 10 月发售的 macbook pro，只含有 4 个 usb-c 接口和一个 3.5mm 的耳机接口。4 个接口均可充电，据某些机友测试，可用充电宝给 mbp 充电。

当关上屏幕后，电脑将休眠，这时接口依然会提供电力，方便给手机充电。

由于给 iPhone 充电，或是读取 SD 卡，外接移动硬盘、鼠标、键盘等等，均需要用到 USB 接口，所以在官网买了一个 USB-C 到 USB 的转换器，68 元。一头插在 mbp，另外一头连接 USB 集线器，然后把所有 USB 设备都插在这个集线器上。

如果你想知道是否会有供电不足的问题，`cmd + 空格` 呼出 Spotlight，输入“系统信息”，在“硬件”栏找到 `USB` 项，即可以查看各个 USB 设备所需电量。其中“可用电流”指 mbp 提供给该设备的电流，若“可用电流”大于“所需电流”，则可大胆使用该 USB 设备。

## 快捷键

### 键盘快捷键

> `cmd` 指空格键左侧的“花”键，全名 `command`，对应 windows 下 `Win` 键
> `option` 即 windows 下的 `Alt` 键

- cmd + M：最小化当前窗口
- cmd + option + M：最小化所有同类窗口，比如所有 finder
- cmd + option + M + H：显示桌面；也可以按下 `F11`
- option + 窗口左上角全屏按钮：最大化当前窗口
- cmd + shift + 3：全屏截图
- cmd + shift + 4：区域截图
- 在 finder 里选中某文件后按空格键预览该文件（连视频都能预览，不需要打开视频播放器）
- cmd + option + shift + esc：强制退出当前软件
- cmd + option + esc：选择需要强制退出的软件（比如 mac 版的 QQ，使用其自带的截图就会造成系统假死，这时就可以通过该快捷键杀死 QQ）
- cmd + option + v：剪切到目标文件夹（mac 没有剪切功能，复制依然使用 cmd + c，粘贴使用 cmd + v，当要剪切到目标文件夹时多按一个 option 键即可）
- cmd + H：隐藏当前窗口
- cmd + shift + D：打开桌面文件夹（在 finder 中，按 cmd + shift + A 进入“应用程序”）
- cmd + option + D：显示/隐藏 Dock
-

### 触摸板手势

- 二个手指轻拍：右键
- 三个手指轻拍：显示预览或是翻译该单词
- 四指向上滑动：显示所有已打开的程序（可以把应用放到其它桌面）
- 四指向下滑动：显示当前程序所有窗口
- 四指张开：显示桌面
-
- cmd + W：关闭标签页
- cmd + Q：退出软件（不是每个软件都支持）
- cmd + space：使用 macOS 自带的 Spotlight 搜索

## 常用效率软件

### Alfred

其实系统自带的 Spotlight 已经支持很多搜索操作，但是 Alfred 的功能更加强大。

> 使用 `cmd + 空格` 呼出 Spotlight 或使用 `option + 空格` 呼出 Alfred，在输入框内输入以下命令

- activity：任务管理器
- find x：查找文件

### CheatSheet

安装后，只要按住 `cmd` 几秒钟，就会显示当前窗口的快捷键。比如在 windows 下使用 `Esc` 键可以隐藏所有聊天窗口，但在 mac 下无效。这时按住 `cmd` 键，会隐藏所有窗口的快捷键是 `cmd + H`

## 系统设置

### 修改 launchpad 每页显示的应用数

注意：下列代码中 columns 代表每页显示的列数；rows 代表显示行数；更改后会解开文件夹，所有应用平铺在 launchpad；

```
defaults write com.apple.dock springboard-columns -int 10;
defaults write com.apple.dock springboard-rows -int 8;
defaults write com.apple.dock ResetLaunchPad -bool TRUE;
killall Dock
```

2016 款 macbook pro 15 寸设置成 6 行 9 列没有问题。

### 清除 launchpad 里的应用图标

```
sqlite3 $(sudo find /private/var/folders -name com.apple.dock.launchpad)/db/db "DELETE FROM apps WHERE title='照片';" && killall Dock
```

把“照片”换成想要删除的图标名称。另外，如果再次修改了每页显示应用图标数，那么 launchpad 会重新整理。因此在设置完每页显示应用数之后再删除不需要显示的应用图标。

### touchbar

在“系统偏好设置”的“键盘”里，在第一个 Tab 选项“键盘”里可以设置 touchbar 的显示内容。在第三个 Tab “快捷键”的“功能键”可以设置某个应用始终显示功能键。比如编辑 IDE 就可以设置为一直 F1-F12。

### TotalFinder

1. 重启时按 CMD + R
2. csrutil disable
3. csrutil enable

## 系统应用

### finder

- cmd + 1/2/3/4：在四种文件查看方式间切换
- 选中想要预览的文件，按空格键就可以左右预览文件
-

```
# 不显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
# 显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

### safari

- 直接把图片拖到桌面即保存到桌面
