// Required files
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


// Compile sass
gulp.task('styles', function() {

  // Load sass files
  return gulp.src('scss/main.scss')

    // Create sourcemap start
    .pipe(sourcemaps.init())

    // Convert to css
    .pipe(sass({
      style: 'expanded'
      })
      .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
      }))
    )

    // Prefix css
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))

    // Save file
    .pipe(gulp.dest('css/'))

    // Save sourcemap
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('css/'))

});


// Watch
gulp.task('watch',function() {
  gulp.watch('scss/*.scss',['styles']);
  gulp.watch('css/main.css').on('change', browserSync.reload)
});


gulp.task('default', ['styles', 'watch'])
