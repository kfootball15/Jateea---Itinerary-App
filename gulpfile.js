var gulp = require('gulp');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var csso = require('gulp-csso');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

gulp.task('less', function() {
  return gulp.src('public/css/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(gulp.dest('public/css'));
});

gulp.task('angular', function() {
  return gulp.src([
    'app/app.js',
    'app/controllers/*.js',
    'app/services/*.js'
  ])
    .pipe(concat('application.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js'));
});

gulp.task('templates', function() {
  return gulp.src('app/partials/**/*.html')
    .pipe(templateCache({ root: 'partials', module: 'MyApp' }))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js'));
});

gulp.task('vendor', function() {
  return gulp.src('app/vendor/*.js')
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js/lib'));
});

gulp.task('watch', function() {
  gulp.watch('public/css/**/*.less', ['less']);
  //gulp.watch('app/views/**/*.html', gulp.series('templates')); //gulp.series works with gulp v4, which does not seem to exist
  //gulp.watch('app/**/*.js', gulp.series('angular'));
  //gulp.watch('app/views/**/*.html', gulp.task('templates'));
  gulp.watch('app/**/*.html', ['templates'])
  gulp.watch('app/**/*.js', ['templates', 'angular']);
});

gulp.task('build', ['less', 'angular', 'vendor', 'templates']);
gulp.task('default', ['build', 'watch']);
