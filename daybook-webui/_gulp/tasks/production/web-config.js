var gulp   = require('gulp');
var config = require('../../config').webConfig;

gulp.task('web:config', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
