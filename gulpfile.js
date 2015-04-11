"use strict";

var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var logger = require('gulp-logger');
var plumber = require('gulp-plumber');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var argv = require('yargs').argv;
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');

var CONFIG = {
	client: {
		dist:      '_dist/client',
		js:        "client/src/**/*.js",
		resources: [
			"client/**",
			"client/*.html",
			"!client/src",
			"!client/src/**"
		]
	},
	server: {
		dist: '_dist/server',
		js:   'server/src/**/*.js'
	},
	test:   {
		src:     './test',
		options: ''
	}
};

if (argv.watch) {
	console.log(" WATCH MODE ");
}

gulp.task("client:resources", function () {
	var src = gulp.src(CONFIG.client.resources);
	if (argv.watch) {
		src = src.pipe(plumber()).pipe(watch(CONFIG.client.resources));
	}
	src = src.pipe(logger({showChange: true}));
	src = src.pipe(gulp.dest(CONFIG.client.dist));

	return src;
});

gulp.task('client:clean', function (cb) {
	del(CONFIG.client.dist, cb);
});

gulp.task("client:all",
	gulpSequence(
		'client:clean',
		['client:js', 'client:resources']
	)
);

gulp.task("client:js", function () {
	var src = gulp.src(CONFIG.client.js);

	if (argv.watch) {
		src = src.pipe(plumber()).pipe(watch(CONFIG.client.js));
	}
	src = src.pipe(logger({showChange: true}))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(CONFIG.client.dist +'/app'));

	return src;
});

gulp.task('server:clean', function (cb) {
	del(CONFIG.server.dist, cb);
});

gulp.task("server:js", function () {
	var src = gulp.src(CONFIG.server.js);
	if (argv.watch) {
		src = src.pipe(plumber()).pipe(watch(CONFIG.server.js));
	}
	src = src.pipe(logger({showChange: true}))
		.pipe(babel({
			// only transform module statements and add strict header
			whitelist: ['es6.modules', 'strict', 'es6.arrowFunctions', 'es6.parameters.default']
		}))
		.pipe(gulp.dest(CONFIG.server.dist));

	return src;
});

gulp.task("server:all",
	gulpSequence(
		'server:clean',
		'server:js'
	)
);

gulp.task("tests", function () {
	return gulp.src(CONFIG.test.src + '/**/*.js', {read: false})
		.pipe(mocha());
});

gulp.task("default", ["server:all", "client:all"]);
gulp.task("clean", ["server:clean", "client:clean"]);
gulp.task("client", ["client:all"]);
gulp.task("server", ["server:all"]);
gulp.task("dist", gulpSequence('server:all', 'client:all', 'tests'));
