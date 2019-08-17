var gulp = require('gulp');
var es = require('event-stream');

var items = require('../../config').files;


gulp.task('files', function() {
    return es.merge(items.map(function(item) {
        return gulp.src(item.src)
            .pipe(gulp.dest(item.dest));
    }));
});
