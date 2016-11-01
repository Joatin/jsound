var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();
var webpackDevMiddleware = require('webpack-dev-middleware');
var stripAnsi            = require('strip-ansi');
var pug = require('gulp-pug');
var nodemon = require('gulp-nodemon');
var historyApiFallback = require('connect-history-api-fallback');
var webpack = require('webpack');
var swebpack = require('webpack-stream');

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

gulp.task('copy-public-files', function(){
    return gulp.src(['src/public/**/*'])
        .pipe(gulp.dest('build/development/public'));
});

gulp.task('copy-files', ['copy-public-files'], function(){
   return gulp.src(['src/client/**/*.js', 'src/client/**/*.html'])
       .pipe(gulp.dest('build/development/client'));
});

gulp.task('copy-files-watch', ['copy-files'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('old-serve', ['typescript-server'], function () {
    nodemon({
        script: './build/development/server/server.js',
        watch: './build/development/server'
    }).on('start', function(){
        browserSync.reload()
    });
    gulp.watch('src/server/**/*.ts', ['typescript-server']);
});

gulp.task('webpack', function(){
    var webpackConfig = require('./webpack.config.server');
    var bundler = webpack(webpackConfig);

    bundler.plugin('done', function (stats) {
        if (stats.hasErrors() || stats.hasWarnings()) {
            browserSync.notify('Webpack Error', 3000);
        }
        browserSync.reload();
    });

    bundler.watch();

    browserSync.init({
        server: {
            baseDir: 'dist',
            routes: {
                "/bower_components": "bower_components"
            }
        },
        open: true,
        logFileChanges: false,
        middleware: [
            historyApiFallback({index: '/index.html'}),
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {colors: true}
            })
        ],
        plugins: ['bs-fullscreen-message']
    });
    /*return gulp.src('src/client/main.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('dist/'));*/
});

gulp.task('build-webpack', function(){
    return gulp.src('src/client/main.ts')
        .pipe(swebpack(require('./webpack.config')))
        .on('error', function(error) {
            this.emit('end');
        })
        .pipe(gulp.dest('dist/client/'));
});

gulp.task('webpack-server', function(){
    return gulp.src('src/server/server.ts')
        .pipe(swebpack(require('./webpack.config.server')))
        .on('error', function(error) {
            this.emit('end');
        })
        .pipe(gulp.dest('dist/server'));
});

gulp.task('serve',['webpack-server'], function() {
    var stream =  nodemon({
        script: './dist/server/server.js',
        watch: './dist/server/'
    });

    browserSync.init({
        proxy: 'https://localhost:8000',
        files: ['./src/**/*']
    });

    gulp.watch('./src/server/**/*', ['webpack-server'])
    return stream;
});

