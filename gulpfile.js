var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');


gulp.task('vendors-js', function() {
    return gulp.src('client/app/lib/**/*.js')
      .pipe(concat('vendors.js'))
      .pipe(uglify())
      .pipe(gulp.dest('client/app/dist/'));
});

gulp.task('all-css', function() {
    return gulp.src([
        'client/app/lib/**/*.css',
        'client/app/modules/checkup/checkup.css',
        'client/app/modules/user/user.css',
        'client/app/app.css'
       ])
      .pipe(concat('style.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('client/app/dist/'));
});



gulp.task('modules-js', function() {
    return gulp.src([
        'client/app/modules/home/home.js',
        'client/app/modules/help/help.js',
        'client/app/modules/user/user.js',
        'client/app/modules/user/controllers.js',
        'client/app/modules/checkup/checkup.js',
        'client/app/modules/checkup/controllers.js'
    ])
      .pipe(concat('modules.js'))
//      .pipe(uglify())
      .pipe(gulp.dest('client/app/dist/'));
});

gulp.task('app-js', function() {
    return gulp.src([
        'client/app/js/services.js',
        'client/app/modules/home/home.js',
        'client/app/modules/help/help.js',
        'client/app/modules/user/user.js',
        'client/app/modules/user/controllers.js',
        'client/app/modules/checkup/checkup.js',
        'client/app/modules/checkup/controllers.js',
        'client/app/app.js',
    ])
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest('client/app/dist/'));
});
