## 通过 brew 安装出错

brew switch openssl 1.0.2s

brew remove openssl
brew install openssl

## 开机启动

brew services start mongodb/brew/mongodb-community

## 配置文件

mongod --config /usr/local/etc/mongod.conf