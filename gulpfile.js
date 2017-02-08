var gulp = require('gulp');
var webserver = require("gulp-webserver");
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');

var paths = {
    temp: 'temp',
    tempVendor: 'temp/vendor',
    tempIndex: 'temp/index.html',

    index: 'app/index.html',
    appSrc: ['app/**/*', '!app/index.html'],
    bowerSrc: 'bower_components/**/*' 
}

gulp.task('default', ['watch']);

// Watch the source folders
gulp.task('watch', ['serve'], function() {
    gulp.watch(paths.appSrc, ['scripts']);      // copy javascript if there are changes
    gulp.watch(paths.bowerSrc, ['vendors']); // copy vendors javascript if there are changes
    gulp.watch(paths.index, ['copyAll']);  // copy everything if the index.html file changes
});

// run webserver and pipe all /api/* calls to localhost port 1337
gulp.task('serve', ['copyAll'], function(){    
    gulp.src(paths.temp)
    .pipe(webserver({
        livereload:true,
        proxies: [{
            source: '/api',
            target: 'http://localhost:1337'
        }]
    }));   
});

// copy files to temp folder and inject both vendor and other java script into index.html
gulp.task('copyAll', function(){
    var tempVendors = gulp.src(mainBowerFiles())
        .pipe(gulp.dest(paths.tempVendor, {override: true})); 

    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp, {override: true}));

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.temp, {override: true}))
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
        .pipe(inject(appFiles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.temp, {override: true}));
    
});

gulp.task('vendors', function(){
    var tempVendors = gulp.src(mainBowerFiles())
        .pipe(gulp.dest(paths.tempVendor, {override: true})); 

    return gulp.src(paths.tempIndex)
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
       .pipe(gulp.dest(paths.temp, {override: true}));
});

gulp.task('scripts', function(){
    var appFiles = gulp.src(paths.appSrc)
        .pipe(gulp.dest(paths.temp, {override: true})); 

    return gulp.src(paths.tempIndex)
        .pipe(inject(appFiles, {
            relative: true,
        }))
       .pipe(gulp.dest(paths.temp, {override: true}));
});

gulp.task('clean', function(){
    del([paths.temp]);
})