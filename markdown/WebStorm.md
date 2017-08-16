## 减少内存占用

- 选中文件夹 -> 右键 —> mark directory as -> exclude。特别是 node_modules 文件夹
- 选中文件 —> 右键 -> mark as plain text。特别是一些自已引用的第三方 js 插件，例如 jquery
- 选中 file -> settings -> plugins。自己不用的插件，一律取消勾选

## 无法调试

- chrome 里安装 JB 插件
- 把 --debug 改为 --debug-brk 参数
- NodeJS 应用程序可以在运行命令中加入 --debug=5858 参数，可以使得 NodeJS 程序监听本地 5858 端口，并开启调试模式
- babel 或是 TS 生成的 JS 需要先生成 sourcemap 才可调试
