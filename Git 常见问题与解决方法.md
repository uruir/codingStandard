Q: warning: Your console font probably doesn't support Unicode. If you experience strange characters in the output, consider switching to a TrueType font such as Lucida Console

A: 这个好像并无大碍，只是一个警告

---

Q: fatal: remote origin already exists

A: 我是在设置了错误的远程地址后，想改回正确的地址。先移除远程分支，然后设置新的远程地址

```
git remote rm origin
git remote add origin git@github.com:uruir/project.git
```

---

Q: error: Your local changes to the following files would be overwritten by merge

A: 说明合并的时候，本地代码还有未提交的，如果合并了，本地修改的代码就要被覆盖了。所以直接`git commit`本地修改，再`git pull`

---

Q: 如果当前没在任何分支上

A: 当前不在任何分支，那便把当前挂在一个临时分支上，再回到想去分支然后合并代码就OK啦

```
git checkout -b tmp // 新建临时分支
git checkout master // 切回我想去的分支
git merge tmp // 把我不在任何分支时候的代码合并到当前分支
git branch -d tmp // 删除那个临时分支
```

---

Q: 若不小心上传了本地不想上传到远程的代码

A: 把代码从本地版本库移除后，再提交

```
git rm -r --cached folder // or git rm --cached filename
git add .
git commit -m "把远程多余的代码删掉"
git push
```

这里参数`--cached`指把要删除的代码从版本库移除，但不从本地移除，即代码还在，只是不上传了而已。

用过 Linux 的应该知道`-r`是指扫描`folder`下面所有文件与子目录。

---

Q: HEAD detached from <SHA>
A: 

---

Q: nothing to commit, working directory clean
A: 查看`.gitignore`文件是不是添加了修改的文件，这样修改就不会被 git 跟踪，所以提示工作仓库干净。

---

Q: error: RPC failed; result=22, HTTP code = 411
A: 上传包过大，修改之：`git config --global http.postBuffer 52428800`

---

Q:
A:

---

Q:
A: