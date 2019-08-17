var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('../../config').optimize.scripts;
var gutil = require('gulp-util')

gulp.task('optimize:scripts', function () {
    return gulp.src(config.src)
        .pipe(uglify(config.options))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest(config.dest));
});
