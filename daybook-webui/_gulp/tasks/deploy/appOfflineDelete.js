var gulp = require('gulp');
var ftp = require('vinyl-ftp');

var config = require('../../config').ftp;

gulp.task('app:offline:delete', function (callback) {
    var conn = ftp.create(config.options);

    conn.delete('App_Offline.htm', callback);
});
