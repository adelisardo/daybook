var gulp = require('gulp');
var del = require('del');
var config = require('../../config').gzip;

gulp.task('delete:ungzip', function () {
    return del(config.src);
});
