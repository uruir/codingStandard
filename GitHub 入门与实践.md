> 大塚弘记 著，支鹏浩 刘斌 译，人民邮电出版社出版

## 译者序

这是国内比较少见的对 GitHub 及社会化编程进行系统介绍的书籍。本书的补充信息与勘误：http://www.ituring.cn/book/1581

## 第 1 章 -- 欢迎来到 GitHub 的世界

### 什么是 GitHub

GitHub 是为开发者提供 Git 仓库的托管服务平台，是一个让开发者与同事、朋友及陌生人共享代码的交流场所。

GitHub 公司总部位于美国旧金山，吉祥物是 [octocat](http://octodex.github.com)。

在 [Git](http://git-scm.com) 中，开发者将源代码存入名叫“Git 仓库”的资料库中并加以利用；而 GitHub 则是在网络上提供 Git 仓库服务。

### 使用 GitHub 会带来哪些变化

曾经的协同工作软件有：群件（Groupware）和 CRM（Customer Relationship Management）等。但是在以程序员为代表的软件开发者之间，并没有辅助多人协同编程的软件。因此软件开发者们往往要将版本管理系统、BUG 跟踪系统、代码审查工具、邮件列表、IRC 等众多工具组合在一起才能实现协同工作。

`Pull Request`是指开发者在本地对源代码进行更改后，向 GitHub 中托管的 Git 仓库请求合并的功能。开发者可以在`Pull Request`上通过评论交流，如“修正了 BUG，可以合并一下吗？”等。通过此操作，其他开发者可以轻松更改源代码，并公开更改的细节，然后向仓库提交合并请求。

注：在 Issues 页面里，在输入框中直接`@`即会显示相关人员并通知他们；输入`#`会连接到该仓库所对应的 issue 编号。

在 GitHub 上，用户所有用文字输入的功能都可以用 GitHub Flavored Markdown 语法进行描述。

一旦 Watch 了某个仓库，当它有新功能或 BUG 修正时，即会收到通知。
 
### 社会化编程（Social Coding）

看微博、微信能了解一个人的人品，看 GitHub 可以了解一个人的能力。

### GitHub 提供的功能

#### Git 仓库

免费创建个人仓库，若要创建私有仓库，需要购买[高级功能](https://github.com/plans)。

#### Organization

该帐户允许统一管理帐户和权限。但如果只使用公开仓库，可以免费创建 Organization 帐户，适合以交流群或 IT 小团体的形式进行软件开发。

#### Issue

是将一个任务或问题分配给一个 Issue 进行追踪和管理的功能。每一个功能更改或修正都对应一个 Issue，讨论或修正都以这个 Issue 为中心进行。只要查看 Issue 就能知道和这个更改相关的一切信息，并以此进行管理。在 Git 的提交信息中写上 Issue 的 ID（如：#7），GitHub 就会自动生成从 Issue 到对应提交的链接。

#### Wiki

通过 Wiki 功能，任何人都可以随时对一篇文章进行更改并保存，因此可以多人共同完成一篇文章。

#### Pull Request

开发者向 GitHub 的仓库推送更改或功能添加后，可以通过 Pull Request 功能向别人的仓库提出申请，请求对方合并。

## 第 2 章 -- Git 的导入

