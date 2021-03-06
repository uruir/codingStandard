## 设置用户名和邮箱

分别是 Github 上的用户名和邮箱，用于提交时的身份确认：

```
git config --global user.name turui
git config --global user.email xxx@xxx.com
git config --global color.ui auto
git config --global alias.co checkout
```


### 生成密钥

Windows 下，使用 Git Bash。

```
ssh-keygen -t rsa -C "xxx@xxx.com"
```

一路回车使用默认值即可创建公钥，将生成的 `C:\Users\yourname\.ssh\id_rsa.pub` 里的内容复制到 `https://github.com/settings/keys`，将本机与 github 连通，此后提交代码到 github 时便不需要使用密码。

### 验证安装

```
ssh -T git@github.com
```

详情请看：{% link generating-ssh-keys https://help.github.com/articles/generating-ssh-keys %}和{% link error-permission-denied-publickey https://help.github.com/articles/error-permission-denied-publickey %}


![](http://www.admin10000.com/UploadFiles/Document/201512/09/20151209184619252139.JPG)

只回退 commit 信息，代码不动，用于修改错误的 commit 注释：

```
git reset --mixed hash
```

### git config

查看全局 git 配置：`git config --global -l`，另有系统级（--system）和用户级（--local）。
编辑配置：`git config --global -e`。
查看当前生效的 git 配置：`git config -l`。
增加配置项：`git config --add key value`。
获取配置项：`git config --get key`。
修改当前项目的配置项：`git config user.name 涂睿`。
查看配置项：`git config user.name`。
修改当前用户所有 Git 项目的配置项：`git config --global user.name 涂睿`。

### git

撤销所有修改（未提交到暂存区）：`git checkout . && git clean -xdf`。
若使用 `git checkout -f or git checkout --` 不会删除新增的文件，不推荐。
若加入到了暂存区：`git reset --hard && git clean -xdf`。
架设 Git 服务器，域名使用 `http://git.xxx.com` 之类。
查看本地所有分支：`git branch`。
查看远程所有分支：`git branch -r`。
查看所有分支：`git branch -a`。
查看所有分支及注释：`git branch -av`。
切换到本地某分支：`git checkout xxx`。
获取远程某分支：`git checkout origin/xxx`。

一台电脑多个 SSH

```
# 制造第一把公钥：
ssh-keygen -t rsa -C "mywork@email.com"
# 设置名称为 id_rsa_derek
# Enter file in which to save the key (~/.ssh/id_rsa): id_rsa_derek
# 添加到 SSH agent 中
ssh-add id_rsa_derek
# 制造第二把公钥：
ssh-keygen -t rsa -C "yourwork@email.com"
# 设置名称为 id_rsa_ranpop
# Enter file in which to save the key (~/.ssh/id_rsa): id_rsa_ranpop
# 添加到 SSH agent 中
ssh-add id_rsa_ranpop
# 将 id_rsa_derek.pub 添加到 derek 帐号的后台 ssh
# 将 id_rsa_ranpop.pub 添加到 ranpop 帐号的后台 ssh
# 在 .ssh 目录下配置 config 文件：
Host derek
HostName git.coding.net
User git
IdentityFile C:\\Users\\zhizoo\\.ssh\\id_rsa_derek
Host ranpop
HostName git.coding.net
User git
IdentityFile C:\\Users\\zhizoo\\.ssh\\id_rsa_ranpop
# 对于 derek 帐号下的仓库：
git clone derek:githubname/repository.git
# 原地址是：git@github.com:githubname/repository.git，替换后应该是：derek:githubname/repository.git
# 对于 ranpop 帐号下的仓库：
git clone ranpop:githubname/repository.git
# 原地址是：git@github.com:githubname/repository.git，替换后应该是：ranpop:githubname/repository.git
# 测试：
ssh -T derek
# Hi derek! You've successfully authenticated, but GitHub does not provide shel l access.
ssh -T ranpop
# Hi ranpop! You've successfully authenticated, but GitHub does not provide shel l access.
# 如果已经使用原地址克隆过了，可以使用命令修改：
git remote set-url origin derek:githubname/repository.git
# 目前的配置
Host uRuier
HostName git.coding.net
User git
IdentityFile C:\\Users\\zhizoo\\.ssh\\uRuier
Host uruir
HostName github.com
User git
IdentityFile C:\\Users\\zhizoo\\.ssh\\uRuier
Host id_rsa
HostName git.coding.net
User git
IdentityFile C:\\Users\\zhizoo\\.ssh\\id_rsa
```

通过 `git remote -v` 查看远程分支，或在 `.git/config` 中查看 Git 信息。

查看所有分支 `git branch -a`，只看远程分支 `git branch -r`

分支间对比 `git diff origin/master master`

`git push origin master:master` 将本地 master （冒号前的 master）推送到远程 master，若省略冒号后的 master，则默认为与当前提交一致的分支，即 master。若远程无此分支，则新建。

`git push origin localbranch:originbranch`，提交本地分支 `localbranch` 到远程 `originbranch`。

删除远程分支 `git push origin :mybranch`，即使用地址空分支推送到远程 mybranch 分支

若当前分支游离于主分支，且比主分支更新。则新建分支  `git branch tmp xxxxxxx`，然后切换到主分支 `git checkout master`，再进行合并 `git merge tmp`，之后就可以删掉临时分支了 `git branch -d tmp`。

## 初始化跟踪

表示对当前目录（Windows 下称文件夹，*nix 下称目录）实行 Git 版本管理：

```
git init
```

### 跟踪文件

将`test.txt`文件加入版本管理：

```
git add 'test.txt'
// 将本文件夹内的所有文件加入版本库中
git add .
```

### 移除跟踪

取消跟踪某文件

```
git reset filename
```

### 移除文件

```
git rm '*.txt'
```

使用`-r`参数移除目录。

### 删除工作区文件，并且将这次删除放入暂存区

```
git rm [file1] [file2] ...
```

### 停止追踪指定文件，但该文件会保留在工作区

```
git rm --cached [file]
```

若要删除文件夹使用 -r

### 改名文件，并且将这个改名放入暂存区

```
git mv [file-original] [file-renamed]
```

## 设置远程仓库，存放本地代码的地方

表示你将要把该文件夹的代码提交到Github上哪个位置：

```
git remote add origin https://github.com/yourname/yourProject
```

origin 是 github 官网上的同名项目，master 是本地默认分支，所以在提交前就在 github 官网创建同名仓库。

### 删除远程分支

```
git push origin --delete <branchName>
```

### 回滚远程分支到某个 commit

先将本地回滚到该 commit。

```
git push origin :theBranch
git push orign theBranch
```

加 `:` 是删除该远程分支，然后将本地分支推送到远程。

### 删除 remotes/rui/rui

```
git remote remove rui
```

### 删除远程标签

```
git push origin --delete tag <tagName>
```

### 从远程拉回本地

当在其它电脑上提交了代码后，将更新后的代码拉回本地（从远程 origin 的 master 分支摘取）：

```
git pull origin master
```

因为在 github 官网要先创建项目，一般要生成默认的 Readme.MD 文件，所以等于远程有新代码，于是第一次推送需要此操作。

考虑远程和本地代码会有所不同，如不想在拉的时候把本地代码合并，可`use the command 'git stash' to stash your changes, and 'git stash apply' to re-apply your changes after your pull`

## 配置

### 显示当前 Git 配置

```
git config --list
```

## 分支

### 查看所有本地分支

```
git branch
```

### 查看所有远程分支

```
git branch -r
```

### 查看所有本地及远程分支

```
git branch -a
```

### 查看远程分支名和注释

```
git branch -av
```

### 添加分支

新建分支，并且 HEAD 依然在当前分支。当使用`git init`将目录加入 Git 管理时，默认是 master 分支。

```
git branch name
```

### 重命名本地分支

```
git branch -m before after
```

### 切换到新分支，并更新工作区

```
git checkout name
```

### 新建分支并指向指定 commit

```
git checkout [branch] [commit]
```

### 回到分支的某个版本

```
git merge <SHA>
```

### 删除分支

```
git branch -d someBranch
```

### 合并指定分支到当前分支，假设现在处于 master 分支

```
git merge otherbranch
```

这条命令的意思是把 otherbranch 分支上的内容合并到当前分支（主分支）上来。`

## 提交

```
git commit -m "commit message:
```

在提交前要`git status`确定所有要上传的文件处于staged状态。之前提交时的注释可以用单引号，现在在我的电脑上只能使用双引号，不知为啥。  

### 提交工作区自上次commit之后的变化，直接到仓库区

```
git commit -a
```

### 简写 git add commit

```
git commit -am "xxx"
```

### 查看提交日志

```
git log
```

### 将当前改动追加到上一次提交

```
git commit --amend -m "编辑最后一次的提交信息"
```

### 将某个功能点从 branchA 移动到 branchB 上

```
git cherry-pick <SHA1>...
```

直接更改某次提交的操作步骤:

将HEAD移到需要更改的commit上:
git rebase f744c32cf74454a74bb2f80e5e38b120cb475af1^ --interactive
找到需要更改的commit, 将行首的pick改成edit, 按esc, 输入:wq退出
更改文件
使用git add 改动的文件添加改动文件到暂存
使用git commit --amend追加改动到第一步中指定的commit上
使用git rebase --continue移动HEAD到最新的commit处
这里会有冲突, 需要解决:
编辑冲突文件, 解决冲突
git add .
git commit --amend
解决冲突之后再执行git rebase --continue

### 撤销最后一次代码提交

```
git reset --soft HEAD~1 // 把 HEAD 指针移到之前一个提交，假如这样写了提交信息 A
git add filename // 这样就可以修改暂存区
git commit -m "add filename" // 然后把修改和提交信息提交了，这时"add filename"的提交信息会代替 A
```

### 查看最近10次提交与分支记录

```
git reflog show HEAD@{now} -10
```

### 查看现在与最后一次提交时的不同

`diff`是显示不同时期的两个版本的代码有何不同，`HEAD`表示最近提交的那次的代码，因此下面的命令表示当前代码与最后一次提交的代码有何不同。

```
git diff HEAD
```

### 推送到远程，使用参数`-u`是告诉 Git 记住上面的配置，这样以后可以用`git push`代替下面的命令

在设置好远程地址后，就可以提交了：

```
git push -u origin master
```

把本地 master 分支的内容提交到远程仓库的 origin 分支，因为加了`-u`，所以之后`git push`默认使用本地主分支推送到远程`origin`分支。

### 回到某个历史版本

```
git checkout <SHA> // 将 HEAD 指针移动 <SHA> 对应的版本，类似于 OS X 的时间轴？好神奇啊。
```

**这个命令会得 HEAD 从当前分支脱离出来。**

<SHA> 是提交时系统产生的唯一码，可以通过`git log`查看，它显示在第一行，由数字和字符组成的长度为40的字符串，只要输入前七、八基本就能确定是哪次提交了。

**注意：到指定历史版本后，如果更改了代码，说明你要从这个位置新建分支了（参照提示新建分支），然后在新分支编写代码，再合并到需要并入的分支。如果只是回到历史看看那时候的代码，那看完了用同样的操作（<SHA>的值写最新版本的唯一码）回到最新版本去。**

## tips

每次提交都需要输入用户名和密码是因为使用了`https`的方式，如果使用`ssh`方式则无需输入。

## 若想把 Git 服务器上某些文件或目录删除时，先 pull 再 rm

```
git pull origin master
git rm -r --cached folder // 删除目录
git rm --cached filename // 删除文件
modify .gitignore
```

## 将文件从暂存区（staging area）撤回

```
git reset filename
git reset // 从暂存区移除所有没有提交的修改
```

比如当我回到某个历史版本后，需要回到当前最新版本

## 查看

### 查看目录状态

查看当前文件夹里的文件的跟踪状态：

```
git status
```

### 查看最近情况

```
git show
```

### 查看当前所在分支与 HEAD 指向

```
git branch -v
```

## 标签

### 列出所有 tag

```
git tag
```

### 新建一个 tag 在当前 commit

```
git tag [tag]
```

### 新建一个 tag 在指定 commit

```
git tag [tag] [commit]
```

### 查看 tag 信息

```
git show [tag]
```

### 提交指定 tag

```
git push [remote] [tag]
```

### 提交所有 tag

```
git push [remote] --tags
```

### 新建一个分支，指向某个 tag

```
git checkout -b [branchName] [SHA1]
```

## 查看信息

### 显示有变更的文件

```
git status
```

### 显示当前分支的版本历史

```
git log
```

### 显示 commit 历史，以及每次 commit 发生变更的文件

```
git log --stat
```

### 显示某个文件的版本历史，包括文件改名

```
git log --follow [file]
git whatchanged [file]
```

### 显示指定文件相关的每一次 diff

```
git log -p [file]
```

### 显示指定文件是什么人在什么时间修改过

```
git blame [file]
```

### 显示暂存区和工作区的差异

```
git diff
```

### 显示两个版本间的差异

```
git diff <SHA1> <SHA2>
```

### 显示暂存区和上一个 commit 的差异

```
git diff --cached []
```

### 显示工作区与当前分支最新 commit 之间的差异

```
git diff HEAD
```

### 显示两次提交之间的差异

```
git diff [first-branch]...[second-branch]
```

### 显示某次提交的元数据和内容变化

```
git show [commit]
```

### 显示某次提交发生变化的文件

```
git show --name-only [commit]
```

### 显示某次提交时，某个文件的内容

```
git show [commit]:[filename]
```

### 显示当前分支的最近几次提交

```
git reflog
```

## 远程同步

### 下载远程仓库的所有变动

```
git fetch [remote]
```

### 删除远程文件

```
git rm --cached filename
git commit -am "rm filename"
git push
```

### 显示所有远程仓库

```
git remote -v
```

### 显示某个远程仓库的信息

```
git remote show [remote]
```

### 增加一个新的远程仓库，并命名

```
git remote add [shortname] [url]
```

### 取回远程仓库的变化，并与本地分支合并

```
git pull [remote] [branch]
```

这里 remote 可以是本地一个 git 文件夹

### 上传本地指定分支到远程仓库

```
git push [remote] [branch]
```

### 强行推送当前分支到远程仓库，即使有冲突

```
git push [remote] --force
```

### 推送所有分支到远程仓库

```
git push [remote] --all
```

### 推送到多个远程仓库（在已有一个远程分支的情况下增加其它远程仓库）

```
git remote set-url --add origin git@git.coding.net:t628/xxx.git
git push origin --all
```

打开当前项目文件夹，在 `.git/config` 文件里可以看到

```
[remote "origin"]
	url = a.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = b.git
```

有多个远程仓库，则添加多个 `url` 即可。

## 撤销

### 恢复暂存区的指定文件到工作区

```
git checkout [file]
```

### 恢复某个 commit 的指定文件到工作区

```
git checkout [commit] [file]
```

### 恢复上一个 commit 的所有文件到工作区

```
git checkout .
```

### 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变

```
git reset [file]
```

### 将工作区和暂存区恢复到最近一次提交

```
git reset --hard
```

### 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变

```
git reset [commit]
```

### 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致

```
git reset --hard [commit]
```

### 重置当前HEAD为指定 commit，但保持暂存区和工作区不变

```
git reset --keep [commit]
```

## .gitignore

只对未加入版本跟踪的文件有效。

- `.gitignore_global` macOS 每个目录下都有 .DS_Store 文件夹，需要忽略。该文件位于用户目录下，同目录下的 .gitconfig 已经引用了该文件。可通过 git config --global core.excludesfile .gitingore_global 添加。
- `.git/info/exclude` 每个项目都有自己的忽略文件。

### 忽略已跟踪的文件

```
git update-index --assume-unchanged file.name
git update-index --no-assume-unchanged file.name // 重新跟踪
```

## 其他

### 生成一个可供发布的压缩包

```
git archive
```

## 将 web 合并到 server

在服务端代码根目录
git clone git@gitlab.com:company/project/web.git web
git fetch web
git checkout -b web web/develop
git checkout develop
git merge web —allow-unrelaed-histories

## 将上述两仓库拆开

在服务端代码根目录
git subtree split -P web -b web

## 将原有子仓库与拆开的合并

在网页端代码根目录
git remote add father git@gitlab.com:a/b/server.git
git fetch father web:web
git merge web —allow-unrelated-histories

## 显示某目录中曾经缓存过的文件

git ls-files --stage somefolder

## 添加子仓库

git submodule add git@gitlab.com:betrends/track/web.git web

**本文部分内容来源于：http://try.github.io/levels/1/challenges/1**