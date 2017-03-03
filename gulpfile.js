/*eslint-env node*/
var gulp = require('gulp'),
	del = require('del'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	reload = browserSync.reload,
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	cleanCss = require('gulp-clean-css'),
	gutil = require('gulp-util'),
	CacheBuster = require('gulp-cachebust'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	browserify = require('browserify'),
	ngAnnotate = require('browserify-ngannotate');

var cachebust = new CacheBuster();

var src = {
	scss: 'dev/assets/css/sass/**/*.scss',
	// scss: 'dev/assets/css/**/*.scss',
	css: 'dev/assets/css/',
	html: 'dev/app/**/*.html',
	// html: ['dev/**/*.html', 'dev/*.html'],
	js: ['dev/app/**/*.js', 'dev/app/*.js'],
	img: 'dev/assets/img/*',
	api: 'dev/api/*',
	libs: 'dev/assets/libs/*',
	downloads: 'dev/assets/downloads/*'
};


/**
 *
 * Cleans the build output
 *
 */

gulp.task('clean', function(cb) {
	del([
		'dist/**/*',
		'!dist/'
	], cb);
});



gulp.task('serve', ['sass', 'browserify'] , function() {

	browserSync.init({
		server: './dev'
		// proxy: 'localhost:3000'
		// proxy: 'mlopage.localhost'  // mlo.localhost is using ./build as root
	});

	gulp.watch(src.scss, ['sass']);
	// gulp.watch(src.js, ['lint']);
	gulp.watch(src.js, ['browserify']);
	gulp.watch(src.html).on('change', reload);
	
});

/**
 *
 * Build JavaScript with Browserify
 *
 */

gulp.task('browserify', function() {
	return browserify({entries: 'dev/app/app.js', debug: true, transform: [ngAnnotate]})
		.bundle()
		.pipe(source('all.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.on('error', gutil.log)
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest('dev/'));
});

/**
 *
 * Build JavaScript for production
 *
 */

gulp.task('build-js', function() {
    var b = browserify({
        entries: 'dev/app/app.js',
        debug: true,
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('all.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({
        	compress: {
        		drop_console: true
        	}
        }))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./assets/js/'))
        .pipe(gulp.dest('./dist/'));
});

/**
 *
 * Copy assets to production
 *
 */

gulp.task('copy-html', function() {
	return gulp.src(src.html)
		// .pipe(cachebust.references())
		.pipe(gulp.dest('./dist/app'));
});

gulp.task('copy-images', function() {
	return gulp.src(src.img)
		// .pipe(imagemin({
		// 	progressive: true,
		// 	use: [pngquant()]
		// }))
		.pipe(gulp.dest('./dist/assets/img'));
});

// gulp.task('copy-api', function() {
// 	return gulp.src(src.api)
// 		.pipe(gulp.dest('./dist/api'));
// });

// gulp.task('copy-php', function() {
// 	return gulp.src('/')
// 		.pipe(gulp.dest('./dist/'));
// });

// gulp.task('copy-libs', function() {
// 	return gulp.src(src.libs)
// 		.pipe(gulp.dest('./dist/assets/libs'));
// });

// gulp.task('copy-downloads', function() {
// 	return gulp.src(src.downloads)
// 		.pipe(gulp.dest('./dist/assets/downloads'));
// });

/**
 *
 * Build CSS for production
 *
 */

gulp.task('css-dist', function() {
	// This task is for building production
	return gulp.src(src.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({includePaths: ['./assets/css/sass']}))
		// .pipe(autoprefixer({
		// 	browsers: ['last 2 version'],
		// 	cascade: false
		// }))
		.pipe(cleanCss({compatibility: 'ie8'})) // minifies CSS
		.pipe(cachebust.resources())
		.pipe(sourcemaps.write('/maps'))
		.pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('build-html', ['css-dist'], function() {
	return gulp.src('./dev/index.html')
		.pipe(cachebust.references())
		.pipe(gulp.dest('./dist'));
});

/**
 *
 * Build for production
 *
 */


gulp.task('dist', [
	'copy-html',
	'copy-images',
	'copy-api',
	'copy-php',
	'copy-libs',
	'copy-downloads',
	'css-dist',
	'build-js',
	'build-html'
]);


/**
 *
 * Build CSS for development
 *
 */

gulp.task('sass', function() {
	return gulp.src(src.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({includePaths: ['./assets/css/sass']}))
		// .pipe(autoprefixer({
		// 	browsers: ['last 2 version'],
		// 	cascade: false
		// }))
		.pipe(sourcemaps.write('/maps'))
		.pipe(gulp.dest(src.css))
		.pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);