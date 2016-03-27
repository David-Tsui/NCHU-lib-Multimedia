var gulp = require('gulp'),             
		gulpSass = require('gulp-sass'),
		gulpUglify = require('gulp-uglify'),
		gulpPlumber = require('gulp-plumber'),
		gulpJade = require('gulp-jade'),
    gulpLivereload = require('gulp-livereload');

gulp.task('watch', function () {
	gulpLivereload.listen();
  gulp.watch('public/styles/scss/**/*.scss', ['styles']);
  // gulp.watch('./templates/**/*.jade', ['jade']);
  // gulp.watch('assets/app.js', ['es6']);
  // gulp.watch('javascript/original/*.js', ['scripts']);
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

/*gulp.task('es6', () =>
  gulp.src('src/app.js')
  	.pipe(gulpPlumber())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('scripts', () =>
  gulp.src('javascript/original/*.js')
  	.pipe(gulpPlumber())      
    .pipe(gulpUglify())                     
    .pipe(gulp.dest('javascript/minify')); 
    .pipe(gulpLivereload());
);*/