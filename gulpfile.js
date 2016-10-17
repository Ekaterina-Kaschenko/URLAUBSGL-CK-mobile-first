var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var postcss    = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var flexibility = require('postcss-flexibility');
var autoprefixer = require('autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], function() {

  browserSync.init({
    server: './'
  });

  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('./sass/style.scss')
	  .pipe(sass().on('error', sass.logError))
	  .pipe(gulp.dest('./css'))
	  .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src('./css/**/*.css')
    .pipe(postcss([flexibility]))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
        flexibility(),
    ];
    return gulp.src('./css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
        
});

gulp.task('scripts', function() {
  return gulp.src('scripts/**/*.js')
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);