import 'core-js/stable';
import 'regenerator-runtime/runtime';
import babel from 'gulp-babel';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

sass.compiler = require('node-sass');

function css() {
	return gulp.src('src/css/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/css'));
}

function js() {
	return gulp.src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		.pipe(uglify())
		.pipe(concat('script.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/js'));
}

exports.css = css;
exports.js = js;
exports.watch = function() {
	gulp.watch('src/css/**/*', css);
	gulp.watch('src/js/**/*', js);
}
exports.default = gulp.parallel(css, js);