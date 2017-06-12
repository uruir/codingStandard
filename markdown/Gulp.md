## 使命

优化前端工作流程，比如自动刷新页面、压缩 CSS 与 JS、编译 SCSS 等。

理念：代码优于配置（Grunt要写很多配置内容）。

基于 Node stream 构建任务，每个任务单独运行，避免反复 I/O 操作。核心只有 4 个 API：`gulp.src/dest/task/watch`。

## 安装 Gulp

全局安装：`sudo npm install gulp -g`

再在工作目录安装：`npm install gulp --save-dev` 

编写测试文件：
```
var gulp = require('gulp');
gulp.task('default', function() {
  console.log('default task');
});
```

回到终端，输入`gulp`即可。 

特点：

- 构建文件是脚本，而不是配置文件
- 使用 Node.js 标准库编写脚本
- 一个插件只负责一件事
- 任务以最大并发数执行
- 流式 I/O

```
npm install gulp -g
cd <folder>
npm install gulp --save-dev
gulp
```

```
gulp.task(name, fn)
gulp.src(globs[, options])
gulp.dest(path)
gulp.watch(glob[, options], tasks) or gulp.watch(glob[, options], cb)
```

```
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('jshint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify', function() {
  return gulp.src('src/*.js')
    .pipe(concat('all.js').
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['jshint', 'minify']);
});

gulp.task('default', ['jshint', 'minify', 'watch']);
```

