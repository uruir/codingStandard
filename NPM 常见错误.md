### 当`npm publish`出错时

可能是 package.json 里的`version`没更新，先更新之，再`npm publish`。

或者先`npm unpublish --force`取消包，再重新发布。

若还不行，则试`npm update`。

一般这样可成功。

### npm ERR! code EPEERINVALID

另外还提及`npm ERR! Windows_NT`等字眼，主要是源有问题，我使用的是`cnpm i`，用官方的`npm i`就可以了，淘宝源也不咱的嘛。

### cannot extract package

put the deep module to the dependence and use npm dedupe to reduce the path length.
