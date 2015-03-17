'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var modRewrite  = require('connect-modrewrite');

var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var scripts = [
	'bower_components/angular/angular.min.js',
	'bower_components/angular-ui-router/release/angular-ui-router.min.js',
	'app/scripts/main.js',
	'app/scripts/angular/**/*.js'
];

gulp.task('copy', function () {
	return gulp.src([
		'app/*',
		'!app/*.html'
	], {
		dot: true
	})
	.pipe(gulp.dest('dist'))
});

gulp.task('html', function () {
	return gulp.src('app/**/*.html')
		.pipe($.changed('dist'))
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
	return gulp.src(scripts)
		.pipe($.concat('app.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function () {
	return $.rubySass('app/styles/app.scss', {
			loadPath: 'bower_components',
			sourcemap: true,
			style: 'extended'
		})
		.on('error', function (err) { console.error(err); })
		.pipe($.autoprefixer('last 2 versions'))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*')
		.pipe($.changed('dist/fonts'))
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['styles', 'html', 'copy', 'scripts', 'fonts'], function() {
	browserSync({
		notify: false,
		server: ['dist'],
		// tunnel: "battleborn",
		middleware: [
			modRewrite([
				'!\\.\\w+$ /index.html [L]'
			])
		],
	});

	gulp.watch(['app/*', '!app/*.html'], ['copy', reload]);
	gulp.watch('app/styles/**/*.scss', ['styles', reload]);
	gulp.watch('app/scripts/**/*.js', ['scripts', reload]);
	gulp.watch('app/fonts/**/*', ['fonts', reload]);
	gulp.watch('app/**/*.html', ['html', reload]);
});
