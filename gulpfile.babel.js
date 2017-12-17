import gulp from 'gulp';
var $plugins = require('gulp-load-plugins')();
import path from 'path';
import del from 'del';
import autoprefixer from 'autoprefixer';

const paths = {
	scripts: {
		vendor: 'public/src/scripts/vendor/*.js',
		src   : 'public/src/scripts/*.js',
		dest  : 'public/dist/scripts/'
	},
	styles : {
		base  : 'public/src/styles/',
		vendor: 'public/src/styles/vendor/*.css',
		src   : 'public/src/styles/scss/style.scss',
		dest  : 'public/dist/styles/'
	},
	stylesImages: {
		src: 'public/src/styles/vendor/*.{png,gif,jpg}',
		dest: 'public/dist/styles/'
	},
	images : {
		src: 'public/src/assets/images/**/*',
		dest: 'public/dist/assets/images/'
	},
	fonts  : {
		src: 'public/src/assets/fonts/**/*',
		dest: 'public/dist/assets/fonts/'
	}
};

// const versionConfig = {
//   value: '%MDS%',
//   append: {
//     'key': 'v',
//     'to': ['css', 'js'],
//   },
// };

export const clean = () => del([ 'public/dist/scripts/*.js', 'public/dist/styles/*.css' ]);
export const cleanStyles = () => del([ 'public/dist/styles/main-*.min.css' ]);
export const cleanScripts = () => del([ 'public/dist/scripts/main-*.min.js' ]);
export const cleanAssets = () => del([ 'public/dist/assets' ]);
export const cleanAll = () => del( [ 'public/dist' ]);

export function watch() {
	$plugins.livereload.listen();
  gulp.watch(paths.scripts.src, gulp.series(scripts, index));
  gulp.watch(path.join(paths.styles.base, '**/*.scss'), gulp.series(styles, index));
	gulp.watch('./templates/**/*.pug', pug);
}

export function index() {
  var target = gulp.src('./templates/layouts/default.pug');
  var sources = gulp.src([
		path.join(paths.styles.dest, 'main-*.min.css'),
		path.join(paths.scripts.dest, 'main-*.min.js')
	], {read: false});
  return target.pipe($plugins.inject(sources, {ignorePath: '/public/'}))
		.pipe(gulp.dest('./templates/layouts/'))
		.pipe($plugins.livereload());
}

export function pug() {
	return gulp.src('./templates/**/*.pug')
		.pipe($plugins.plumber({ errorHandler: (err) => {} }))
		.pipe($plugins.pug({
			pretty: true
		}))
		.pipe($plugins.livereload());
}

export function scss() {
  return gulp.src([paths.styles.src, path.join(paths.styles.base, '/vendor/*.scss')])
		.pipe($plugins.sass())
		.pipe($plugins.postcss([ autoprefixer() ]))
    .pipe($plugins.cleanCss())
		.pipe($plugins.concat('main.min.css'))
		.pipe($plugins.rev())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe($plugins.livereload());
}

export function js() {
  return gulp.src([paths.scripts.src, paths.scripts.vendor], { sourcemaps: true })
    .pipe($plugins.uglify())
		.pipe($plugins.concat('main.min.js'))
		.pipe($plugins.rev())
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe($plugins.livereload());
}

export function stylesAssets() {
	return gulp.src(paths.stylesImages.src)
		.pipe(gulp.dest(paths.stylesImages.dest));
}

export function fonts() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
}

export function images() {
	return gulp.src(paths.images.src)
		.pipe($plugins.imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(paths.images.dest));
}

var styles = gulp.series(cleanStyles, scss);
var scripts = gulp.series(cleanScripts, js);
var stylesAssets = stylesAssets;
var assets = gulp.series(cleanAssets, gulp.parallel(stylesAssets, fonts, images));
var build = gulp.series(clean, gulp.parallel(styles, scripts), index);

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('styles_assets', stylesAssets);
gulp.task('assets', assets);
gulp.task('index', index);
gulp.task('build', build);

gulp.task('default', gulp.series(build, watch));