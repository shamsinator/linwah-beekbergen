var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');

//script paths
var jsFiles = ['assets/javascripts/*.js', '!assets/javascripts/*.min.js'],
	jsDest = 'dist/scripts/new';
    // jsDest = 'dist/scripts';

// gulp.task('scripts', function() {
//     return gulp.src(jsFiles)
//         .pipe(concat('scripts.js'))
//         .pipe(gulp.dest(jsDest));
// });


//Minify and transfer non-minified files to a temp folder
gulp.task('scripts1', function() {
  return gulp.src(jsFiles)
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    //.pipe(notify({ message: 'Scripts1 task complete to minify' }));
});
//transfer minified files to the same temp folder
gulp.task('scripts2',['scripts1'], function() {
  return gulp.src(['assets/javascripts/*.min.js'])
    .pipe(gulp.dest(jsDest))
    //.pipe(notify({ message: 'Scripts2 task complete to copy minified files' }));
});
//concat all minified files to a new dist folder
gulp.task('scripts3',['scripts2'], function() {
  return gulp.src('dist/scripts/new/*.min.js')
    .pipe(order([
                'dist/scripts/new/jquery.min.js',
                'dist/scripts/new/fontawesome-markers.min.js',
                'dist/scripts/new/bootstrap.min.js',
                'dist/scripts/new/easing.min.js',
                'dist/scripts/new/sly.min.js',
                'dist/scripts/new/wow.min.js',
                'dist/scripts/new/masonry.pkgd.min.js',
                'dist/scripts/new/imagesLoaded.min.js',
                'dist/scripts/new/isotope.pkgd.min.js',
                'dist/scripts/new/slick.min.js',
                // 'dist/assets/js/new/bootstrap.min.js',
                // 'dist/assets/js/new/jquery.appear.min.js',
                // 'dist/assets/js/new/jquery.countTo.min.js',
                // 'dist/assets/js/new/waypoints.min.js',
                // 'dist/assets/js/new/jquery.prettyPhoto.min.js',
                // 'dist/assets/js/new/modernizr-latest.min.js',
                // 'dist/assets/js/new/SmoothScroll.min.js',
                // 'dist/assets/js/new/jquery.parallax-1.1.3.min.js',
                // 'dist/assets/js/new/jquery.easing.1.3.min.js',
                // 'dist/assets/js/new/jquery.sticky.min.js',
                // 'dist/assets/js/new/owl.carousel.min.js',
                // 'dist/assets/js/new/jquery.isotope.min.js',
                // 'dist/assets/js/new/jquery.themepunch.plugins.min.js',
                // 'dist/assets/js/new/jquery.themepunch.revolution.min.js',
                // 'dist/assets/js/new/jquery.mb.YTPlayer.min.js',
                // 'dist/assets/js/new/jquery.mapmarker.min.js',
                // 'dist/assets/js/new/scripts.min.js'
            ], { base: './' }))
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts3 task complete to concat all minified files' }));
});

//delete the temp folder
gulp.task('cleantempjs',['scripts3'], function(cb) {
    del(jsDest, cb)
});

//Now run the default task with clean task
gulp.task('clean', function(cb) {
   del(['dist/scripts/css', 'dist/scripts/scripts', 'dist/scripts/img'], cb)
});

gulp.task('default', ['clean'], function() {
   gulp.start('cleantempjs');
});