var gulp = require('gulp');
var babel = require('gulp-babel');

// 使用 babel 将 ES6 转成 ES5
gulp.task('babelify', function () {
    return gulp
        .src('*.js')
        .pipe(babel({
            presets: ['es2015', 'es2016', 'es2017'],
            plugins: [["transform-decorators-legacy", "transform-runtime", {"polyfill": false, "regenerator": true}]]
        }))
        .pipe(gulp.dest('build'))
        .on('end', function (err) {
            console.log('转译结束')
        })
        .on('error', function (err) {
            console.log(err.stack);
            this.emit('end');
        })
});

gulp.task('default', ['babelify', 'watch']);

gulp.task('watch', function () {
    console.log('开始默诵项目根目录下所有 JavaScript 文件为 ES7')
    return gulp.watch(['*.js'], ['babelify']);
});
