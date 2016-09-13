var gulp     = require('gulp');          
var $plugins = require('gulp-load-plugins')();   
var bourbon  = require("bourbon").includePaths;

var paths = {
  PASS   : './',
  src : {
    base   : 'public/src',
    scripts: ['public/src/scripts/*.js', 'public/src/lib/**/*.min.js'],
    styles : ['public/src/stylesheets/scss/',
      css : 'public/src/stylesheets/css/'
    }
  }
  dist : {
    base   : 'public/dist',
    scripts: 'public/dist/scripts',
    styles : 'public/dist/styles'
  }
}

gulp.task('default', ['watch', 'styles', 'scripts']);

gulp.task('watch', function () {
	gulpLivereload.listen();
  gulp.watch(path.join(paths.src.styles.scss, "/*.scss"), ['styles']);
  gulp.watch(path.join(paths.src.scripts.js, "/*.js"), ['scripts']);
  // gulp.watch('./templates/**/*.jade', ['jade']);
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
		.pipe(gulp.dest('public/styles/css'))
		.pipe(gulpLivereload());
});

gulp.task('scss', function() {
  gulp.src(path.join(paths.src.styles.scss, "/*.scss"))
    .pipe($plugins.plumber())
    .pipe($plugins.sass({
      includePaths: ["scss"].concat(bourbon)
    }))   
    .pipe(gulp.dest(paths.src.styles.css))
    .pipe($plugins.notify("scss to css completed"))
});

gulp.task('concat-css', function() {
  gulp.src([
    path.join(paths.src.styles.css, '/*.css'),
    path.join('!' + paths.src.styles.css, '/*.min.css'),
    path.join(paths.src.styles.css, '/vendor/*.css'),
    path.join('!' + paths.src.styles.css, '/vendor/*.min.css')
    ])
    .pipe($plugins.plumber())
    .pipe($plugins.cleanCss({
      keepBreaks: true,
    }))
    .pipe($plugins.rename(function(path) {
      path.basename += ".min";
      path.extname  = ".css";
    }))
    .pipe(gulp.dest(paths.src.styles.css))
    .pipe($plugins.notify("css minify completed"))
});

gulp.task('styles', ['scss', 'minify-css'], function() {
  gulp.src([
    path.join(paths.src.styles.css, '/*.css'),
    path.join(paths.src.styles.css, '/vendor/*.min.css')
  ])
  .pipe($plugins.plumber())
  .pipe($plugins.sourcemaps.init())
  .pipe($plugins.concat({path: 'bundle.min.css', cwd: ''}))
  .pipe(gulp.dest(paths.dist.styles))
  .pipe($plugins.sourcemaps.write("./"))  
  .pipe(gulp.dest(paths.dist.styles))
  .pipe(gulp.dest("./"))
  .pipe($plugins.notify("CSS is ready..."));
  .pipe($plugins.livereload());
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