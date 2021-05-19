const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
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
	return gulp.src('project/compilestyle/main.scss')
				.pipe(sass({includePaths: require('node-normalize-scss').includePaths}).on('error', sass.logError))
				.pipe(autoprefixer())
				// .pipe(cssmin())
				.pipe(gulp.dest('project/style'))
				.pipe(browserSync.stream());
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