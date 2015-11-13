var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

gulp.task('js',['addons'], function() {
    return gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write('./src'))
        .pipe(gulp.dest('./public/js'));
});


gulp.task('addons', function() {
    var  addons = require('./codemirror.json').addons.map(function (addon) {
        return './public/lib/CodeMirror/addon/'+addon;
    });
    return gulp.src(addons)
        .pipe(concat('addons.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('js:watch', ['js'], function() {
    return gulp.watch(['src/js/**/*.js'], ['js']);
});

gulp.task('css', function() {
    return gulp.src(['src/scss/index.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', gutil.log))
        .pipe(sourcemaps.write('./src'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css:watch', ['css'], function() {
    return gulp.watch(['src/scss/**/*.scss'], ['css']);
});

gulp.task('watch', ['css:watch', 'js:watch']);

gulp.task('default', ['css', 'js']);

gulp.task('server:debug',['watch','server']);

gulp.task('server',function () {
    var server = require('gulp-express');
        server.run(['index.js']);
        gulp.watch(['public/**/*'], server.notify);
        gulp.watch(['index.js', 'views/**/*.html'], [server.run]);
});
