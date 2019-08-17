var gulp = require('gulp');
var es = require('event-stream');

var config = require('../../config');


gulp.task('watch', ['browsersync'], function () {
    config.html.map(function (item) {
        gulp.watch(item.src, ['html']);
    });

    config.styles.map(function (item) {
        gulp.watch(item.src, ['styles']);
    });

    config.scripts.map(function (item) {
        gulp.watch(item.src, ['scripts']);
    });

    config.template.map(function (item) {
        gulp.watch(item.src, ['template']);
    });

    config.files.map(function (item) {
        gulp.watch(item.src, ['files']);
    });
});
