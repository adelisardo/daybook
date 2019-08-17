var gulp = require('gulp');
var es = require('event-stream');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

var api = require('../../config').api;
var items = require('../../config').html;


gulp.task('html', function () {
    return es.merge(items.map(function (item) {
        return gulp.src(item.src)
            .pipe(plumber())
            .pipe(concat(item.fileName))
            .pipe(replace(api.urlKey, api.development.url))
            .pipe(replace(api.urlVersionKey, api.development.urlWithVersion))
            .pipe(gulp.dest(item.dest));
    }));
});
