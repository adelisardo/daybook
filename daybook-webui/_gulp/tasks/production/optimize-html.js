var gulp = require('gulp');
var minifyhtml = require('gulp-minify-html');
var config = require('../../config').optimize.html;

gulp.task('optimize:html', function () {
    return gulp.src(config.src)
        .pipe(minifyhtml(config.options))
        .pipe(gulp.dest(config.dest));
});
