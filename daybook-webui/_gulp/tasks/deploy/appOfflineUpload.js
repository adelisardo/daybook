var gulp = require('gulp');
var ftp = require('vinyl-ftp');

var config = require('../../config').ftp;

gulp.task('app:offline:upload', function () {
    var conn = ftp.create(config.options);

    return gulp.src('shared/App_Offline.htm')
        .pipe(conn.newer('/'))
        .pipe(conn.dest('/'));
});
