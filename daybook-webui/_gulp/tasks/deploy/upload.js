var gulp = require('gulp');
var ftp = require('vinyl-ftp');

var config = require('../../config').ftp;

gulp.task('upload', function () {
    var conn = ftp.create(config.options);

    return gulp.src(config.src)
        .pipe(conn.newer('/'))
        .pipe(conn.dest('/'));
});
