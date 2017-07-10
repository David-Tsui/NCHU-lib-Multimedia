var gulp     = require('gulp');
var $plugins = require('gulp-load-plugins')();
var path     = require('path');
var bourbon  = require("bourbon").includePaths;

var paths = {
	src: {
		base   : 'public/src',
		scripts: ['public/src/js/*.js', 'public/src/js/vendor/*.js', '!public/src/js/vendor/*.min.js'],
		styles : {
			scss: ['public/src/styles/scss/*.scss', 'public/src/vendor/**/*.scss'],
			css : 'public/src/styles/css/'
		},
		assets: {
			images : 'public/src/assets/images/**/*',
			fonts  : 'public/src/assets/fonts/**/*'
		}
	},
	dist: {
		base   : 'public/dist',
		scripts: 'public/dist/scripts',
		styles : 'public/dist/styles',
		assets : 'public/dist/assets'
	}
};

gulp.task('default', ['watch', 'styles', 'scripts']);
gulp.task('assets', ['assets']);

gulp.task('watch', function () {
	$plugins.livereload.listen();
	gulp.watch(paths.src.styles.scss, ['styles']);
	gulp.watch(paths.src.scripts, ['scripts']);
	gulp.watch('./templates/**/*.jade', ['jade']);
	// gulp.watch('assets/app.js', ['es6']);
});

gulp.task('jade', function() { /* 一直在compile error */
	gulp.src('./templates/**/*.jade')
		.pipe($plugins.plumber())
		.pipe($plugins.jade({
			pretty: true
		}))
		// .pipe(gulp.dest('./dist/'))
		.pipe($plugins.livereload());
});

gulp.task('scss', function() {
	gulp.src(paths.src.styles.scss)
		.pipe($plugins.plumber())
		.pipe($plugins.sass({
			includePaths: ["scss"].concat(bourbon)
		}))
		.pipe(gulp.dest(paths.src.styles.css))
		// .pipe($plugins.notify("scss to css completed"))
});

gulp.task('minify-css', ['scss'], function() {
	setTimeout(function() {
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
			// .pipe($plugins.notify("css minify completed"))
	}, 1000);
});

gulp.task('styles-assets', function() {
	gulp.src([
		path.join(paths.src.styles.css, '/vendor/*.png'),
		path.join(paths.src.styles.css, '/vendor/*.gif')
	])
	.pipe(gulp.dest(paths.dist.styles))
});

gulp.task('styles', ['styles-assets', 'minify-css'], function() {
	setTimeout(function() {
		gulp.src(path.join(paths.src.styles.css, '/*.min.css'))
			.pipe($plugins.plumber())
			.pipe($plugins.concat({path: 'bundle.min.css', cwd: ''}))
			.pipe(gulp.dest(paths.dist.styles))
			.pipe($plugins.notify("CSS is ready..."))
			.pipe($plugins.livereload());
	}, 1200);
});

// gulp.task('es6', () =>
//   gulp.src('src/app.js')
//   	.pipe($plugins.plumber())
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('dist'))
// );

gulp.task('fonts', function() {
	gulp.src(paths.src.assets.fonts)
		.pipe(gulp.dest(path.join(paths.dist.assets, "/fonts")))
});

gulp.task('images', function() {
	gulp.src(paths.src.assets.images)
		.pipe($plugins.imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(path.join(paths.dist.assets, "/images")))
});

gulp.task('assets', ['fonts', 'images'], function() {
	gulp.src('')
		.pipe($plugins.notify('Assets are ready...'));
});

gulp.task('uglify-scripts', function() {
	gulp.src(paths.src.scripts)
		.pipe($plugins.plumber())
		.pipe($plugins.uglify())
		.pipe(gulp.dest('public/src/js/min'));
});

gulp.task('scripts', ['uglify-scripts'], function() {
	gulp.src([
		'public/src/js/vendor/*.min.js',
		'public/src/js/min/*.js',
	])
	.pipe($plugins.plumber())
	.pipe($plugins.concat({path: 'bundle.min.js', cwd: ''}))
	.pipe(gulp.dest(paths.dist.scripts))
	.pipe($plugins.notify("JS is ready..."))
	.pipe($plugins.livereload());
});