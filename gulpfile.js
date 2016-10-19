var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var nodemon = require('gulp-nodemon');
var historyApiFallback = require('connect-history-api-fallback')

gulp.task('build',  ['typescript', 'typescript-server', 'pug', 'copy-files'], function() {

});

gulp.task('build-prod', function() {

});

gulp.task('typescript', function() {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('build/development/client'));
});

gulp.task('typescript-watch', ['typescript'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('typescript-aot', function() {
    var tsProject = ts.createProject('tsconfig.aot.json');
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('build/release/client'));
});

gulp.task('typescript-server', function() {
    var tsProject = ts.createProject('tsconfig.server.json');
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('build/development/server'));
});

gulp.task('pug', function() {
    return gulp.src('src/client/**/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('build/development/client'))
});

gulp.task('pug-watch', ['pug'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('copy-files', function(){
   return gulp.src('src/client**/*.js')
       .pipe(gulp.dest('build/development/client'));
});

gulp.task('copy-files-watch', ['copy-files'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['build'], function () {
    nodemon({
        script: './build/server/server.js',
        watch: './build/development/server'
    }).on('start', function(){
        browserSync.reload()
    });
    browserSync.init({
        server: {
            baseDir: "./build/development/client",
            middleware: [historyApiFallback({index: '/index.html'})],
            routes: {
                "/node_modules": "node_modules"
            }
        }
    });
    gulp.watch('src/client/**/*.pug', ['pug-watch']);
    gulp.watch('src/client/**/*.ts', ['typescript-watch']);
    gulp.watch('src/client/**/*.js', ['copy-files-watch']);
    gulp.watch('src/server/**/*.ts', ['typescript-server']);
});