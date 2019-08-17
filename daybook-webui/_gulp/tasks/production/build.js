var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build:production', function (callback) {
    runSequence(
        'build',
        'copy:files',
        [
            'optimize:html',
            'optimize:styles',
            'optimize:scripts',
            'web:config'
        ],
        'api:production' ,
        'revision',
        'rev:collect',
        'gzip',
        'delete:ungzip',
        callback);
});
