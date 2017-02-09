var gulp = require('gulp');
var babel = require('gulp-babel');
gulp.task('babelify', function () {
  return gulp.src('src/**/*.js').pipe(babel({
    presets: ['es2015', 'es2016', 'es2017'],
    plugins: [["transform-runtime", {"polyfill": false, "regenerator": true}]]
  }).on('error', function (err) {
    console.log(err.stack);
    this.emit('end');
  })).pipe(gulp.dest('build'))
});

gulp.task('default', ['babelify', 'watch']);

gulp.task('watch', function () {
  return gulp.watch(['src/**/*.js'], ['babelify']);
});
