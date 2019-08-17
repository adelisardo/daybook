var gulp = require('gulp');
var zip = require('gulp-zip');
var config = require('../../config').zip;

gulp.task('zip', function () {
    gulp.src(config.src)
        .pipe(zip(config.fileName))
        .pipe(gulp.dest(config.dest));
});
