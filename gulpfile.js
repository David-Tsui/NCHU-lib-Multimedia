var gulp           = require('gulp');             
var	gulpSass       = require('gulp-sass');
var	gulpUglify     = require('gulp-uglify');
var	gulpPlumber    = require('gulp-plumber');
var	gulpJade       = require('gulp-jade');
var gulpLivereload = require('gulp-livereload');

gulp.task('default', ['watch', 'jade', 'styles', 'scripts']);

gulp.task('watch', function () {
	gulpLivereload.listen();
  gulp.watch('public/styles/scss/**/*.scss', ['styles']);
  gulp.watch('public/js/main.js', ['scripts']);
  gulp.watch('./templates/**/*.jade', ['jade']);
  // gulp.watch('assets/app.js', ['es6']);
});

gulp.task('jade', function() { /* 一直在compile error */
  gulp.src('./templates/**/*.jade')
    .pipe(gulpPlumber())
    .pipe(gulpJade({
      pretty: true
    }))
    // .pipe(gulp.dest('./dist/'))
    .pipe(gulpLivereload());
});

gulp.task('styles', function () {
	gulp.src('public/styles/scss/**/*.scss')
		.pipe(gulpPlumber())
		.pipe(gulpSass())
		/*.pipe(gulpSass({          
			outputStyle: 'compressed'
		})) */        
		.pipe(gulp.dest('public/styles/css'))
		.pipe(gulpLivereload());
});

// gulp.task('es6', () =>
//   gulp.src('src/app.js')
//   	.pipe(gulpPlumber())
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('dist'))
// );

gulp.task('scripts', function() {
  gulp.src(['public/js/main.js','public/owl-carousel/owl.carousel.js'])
  	.pipe(gulpPlumber())      
    .pipe(gulpUglify())                     
    .pipe(gulp.dest('public/js/min'))
    .pipe(gulpLivereload());
});