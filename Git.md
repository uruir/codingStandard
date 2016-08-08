## 远程

```
# 查看远程分支名和注释
git branch -av
# 查看远程分支（不全）
git remote -v
# 删除远程分支
git push origin --delete <branchName>
# 删除 remotes/rui/rui
git remote remove rui
# 删除远程标签
git push origin --delete tag <tagName>
# 摘取时设置远程默认分支
git branch --set-upstream-to=origin/master rui
# 本地是 master 则远程 origin 也是 master，本地是 rui 则远程 origin 也是 rui
# 提交本地 master 分支到远程分支 master
git push origin master
# 提交本地 rui 分支到远程分支 rui 
git push origin rui
# 默认提交到远程 master 分支
git push -u origin master
# 查看当前配置信息
git config -l
# 修改当前项目 Git 配置
git config user.name uRuier
git config user.email 445767568@qq.com
# 查看系统级配置信息，还有 local & global
git config --system -l
# 简写 git add commit
git commit -am "xxx"
# 移除已上传至远程的文件
git rm --cached file && commit && push
```

## 本地

```
# 重命名本地分支
git branch -m before after
```