var gulp = require('gulp');
var replace = require('gulp-replace');

var config = require('../../config').api;


gulp.task('api:production', function () {
    return gulp.src(config.production.src)
        .pipe(replace(config.development.url, config.production.url))
        .pipe(replace(config.development.urlWithVersion, config.production.urlWithVersion))
        .pipe(gulp.dest(config.production.dest));
});
