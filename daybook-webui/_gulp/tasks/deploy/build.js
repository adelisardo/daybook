var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build:deploy', function (callback) {
    runSequence(
        'build:production',
        'zip',
        'open',
        //'app:offline:upload',
        //'upload',
        //'app:offline:delete',
        callback);
});
