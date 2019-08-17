var gulp = require('gulp');
var path = require('path');
var slash = require('slash');

var es = require('event-stream');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rebase = require('gulp-modify-css-urls');

var items = require('../../config').styles;


gulp.task('styles', function () {
    return es.merge(items.map(function (item) {
        var stream = gulp.src(item.src)
            .pipe(plumber())
            .pipe(sass());
        if (item.hasRebase) {
            stream = stream.pipe(rebase(
                {
                    modify(url, filePath) {
                        return '/' + slash(path.relative('./', path.resolve(path.dirname(filePath), url)));
                    },
                }
            ));
        }
        return stream.pipe(concat(item.fileName))
            .pipe(gulp.dest(item.dest));
    }));
});
