var gulp        = require('gulp');
var browsersync = require('browser-sync');
var config      = require('../../config').browsersync.production;

gulp.task('browsersync:production', ['build:production'], function() {
  browsersync(config);
});
