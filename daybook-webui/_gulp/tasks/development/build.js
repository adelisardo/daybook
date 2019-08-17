var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (callback) {
    runSequence('delete',
        [
            'html',
            'styles',
            'scripts',
            'template',
            'files'
        ],
        callback);
});
