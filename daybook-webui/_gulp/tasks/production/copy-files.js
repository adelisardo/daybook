var gulp   = require('gulp');
var config = require('../../config').copyFiles;

gulp.task('copy:files', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
