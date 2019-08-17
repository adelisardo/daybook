var gulp = require('gulp');
var open = require('gulp-open');
var config = require('../../config').zip;

gulp.task('open', function () {
    gulp.src(config.dest)
        .pipe(open());
});
