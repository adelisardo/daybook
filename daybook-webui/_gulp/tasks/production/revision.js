var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpchanged = require('gulp-changed');
var revdel = require('gulp-rev-delete-original');
var config = require('../../config').revision;

gulp.task('revision', function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest.assets))
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest(config.dest.assets))
        .pipe(rev.manifest({ path: config.dest.manifest.name }))
        .pipe(gulp.dest(config.dest.manifest.path));
});
