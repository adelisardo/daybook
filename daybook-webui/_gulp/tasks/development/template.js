var gulp = require('gulp');
var es = require('event-stream');
var plumber = require('gulp-plumber');
var templateCache = require('gulp-angular-templatecache');
var replace = require('gulp-replace');

var api = require('../../config').api;
var items = require('../../config').template;


gulp.task('template', function () {
    return es.merge(items.map(function (item) {
        return gulp.src(item.src)
            .pipe(plumber())
            .pipe(templateCache(item.fileName, { module: 'templates', transformUrl: function (url) { return url.replace(/^.*[\\\/]/, '/'); }, standalone: true }))
            .pipe(replace(api.urlKey, api.development.url))
            .pipe(replace(api.urlVersionKey, api.development.urlWithVersion))
            .pipe(gulp.dest(item.dest));
    }));
});
