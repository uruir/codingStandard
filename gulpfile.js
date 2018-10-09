import gulp from 'gulp'
import babel from 'gulp-babel'

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

gulp.task('default', ['watch', 'babelify']);

gulp.task('watch', function () {
    return gulp.watch(['*.js'], ['babelify']);
});
