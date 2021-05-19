const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

// function style(){
// 	return gulp.src('project/compile/styles/**/*.css')
// 				.pipe(gulp.dest('build/style'))
// 				.pipe(browserSync.stream());
// }

function scripts(){
	
}

function sasscompile(){
	return gulp.src('project/compilestyle/*.scss')
				// .pipe(sass({
				// 	includePaths: require('normalize.css').includePaths
				// }))
				.pipe(sass().on('error', sass.logError))
				.pipe(sourcemaps.init())
				.pipe(autoprefixer({overrideBrowserslist: ['last 2 versions']}))
				// .pipe(cssmin())
				.pipe(sourcemaps.write())
				.pipe(gulp.dest('project/css'))
				.pipe(browserSync.stream({stream: true}));
}

function watch(){
	browserSync.init({
		server: {
			baseDir: "project/"
		}
	});
	//browserSync.reload
	gulp.watch('project/compilestyle/*', sasscompile);
	gulp.watch('project/*.html').on('change', browserSync.reload);
	gulp.watch('project/js/*.js').on('change', browserSync.reload);
}

function cleanFin(){
	return del(['build/*']);
}

function finStyles(){
	return gulp.src('project/style/*.css').pipe(gulp.dest('build/style'));
}
function finSctipts(){
	return gulp.src('project/js/*.js').pipe(gulp.dest('build/js'));
}
function finHtml(){	
	return gulp.src('project/*.html').pipe(gulp.dest('build'));
}

gulp.task('sass', sasscompile);
// gulp.task('style', style);
gulp.task('sw', watch);
gulp.task('finbuild', gulp.series(sasscompile, cleanFin, finStyles, finSctipts, finHtml, minimizeimg));





//test
function minimizeimg(){
	return gulp.src('project/img/**/*')
				.pipe(imagemin())
				.pipe(gulp.dest('build/img'));
}
gulp.task('imgmin', gulp.series(cleanFin, minimizeimg));