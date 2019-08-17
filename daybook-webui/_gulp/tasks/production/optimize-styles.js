var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var config = require('../../config').optimize.styles;

gulp.task('optimize:styles', function () {
    return gulp.src(config.src)
        .pipe(cleancss(config.options))
        .pipe(gulp.dest(config.dest));
});
