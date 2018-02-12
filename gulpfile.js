

let gulp = require('gulp');

//Plugins
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let serve  = require('gulp-serve');


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/*.js', ['scripts']);
});

gulp.task('serve', serve('.'));

// Default Task
gulp.task('default', ['scripts', 'serve', 'watch']);
