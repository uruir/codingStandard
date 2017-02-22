var gulp = require('gulp');
var babel = require('gulp-babel');

// 使用 babel 将 ES6 转成 ES5
gulp.task('babelify', function () {
  return gulp
      .src('src/**/*.js')
      .pipe(babel({
        presets: ['es2015', 'es2016', 'es2017'],
        plugins: [["transform-runtime", {"polyfill": false, "regenerator": true}]]
      }))
      .pipe(gulp.dest('build'))
      .on('error', function (err) {
          console.log(err.stack);
          this.emit('end');
      })
});

gulp.task('default', ['babelify', 'watch']);

gulp.task('watch', function () {
  return gulp.watch(['src/**/*.js'], ['babelify']);
});
