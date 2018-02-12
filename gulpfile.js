let gulp = require('gulp');

//Plugins
let connect = require('gulp-connect');
let clean = require('gulp-clean');
let sourcemaps = require('gulp-sourcemaps');
let jshint = require('gulp-jshint');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let imagemin = require('gulp-imagemin');


let bases = {
    app: 'app/',
    dist: 'dist/'
};

let paths = {
    scripts: ['scripts/**/*.js'],
    libs: ['libs/jquery/dist/jquery.js', 'libs/underscore/underscore.js', 'libs/backbone/backbone.js'],
    styles: ['styles/**/*.css'],
    html: ['index.html', '404.html'],
    images: ['images/**/*.png'],
    extras: []
};

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function () {
    gulp.src(paths.scripts, {cwd: bases.app})
/*        .pipe(jshint())
        .pipe(jshint.reporter('default'))*/
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));
});

gulp.task('connect', function () {

    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function () {
    gulp.src(paths.images, {cwd: bases.app})
        .pipe(imagemin())
        .pipe(gulp.dest(bases.dist + 'images/'));
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function () {
    // Copy html
    gulp.src(paths.html, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist));

    // Copy styles
    gulp.src(paths.styles, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist + 'styles'));

    // Copy lib scripts, maintaining the original directory structure
    gulp.src(paths.libs, {cwd: 'app/**'})
        .pipe(gulp.dest(bases.dist));

    // Copy extra html5bp files
    gulp.src(paths.extras, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist));
});

// A development task to run anytime a file changes
gulp.task('watch', function () {
    gulp.watch('app/**/*', ['scripts', 'copy', 'html']);
});

// Define the default task as a sequence of the above tasks
gulp.task('build', ['clean', 'scripts', 'imagemin', 'copy']);
gulp.task('default', ['build', 'connect', 'watch']);









