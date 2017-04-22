var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babelify', function () {
    return gulp
        .src('*.js')
        .pipe(babel({
            presets: ['es2015', 'es2016', 'es2017', 'stage-3'],
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

gulp.task('default', ['watch']);

gulp.task('watch', function () {
    return gulp.watch(['*.js'], ['babelify']);
});
