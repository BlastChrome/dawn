const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Using Dart Sass
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); // Minifies JS files

// File paths
const paths = {
  scss: './src/scss/**/*.scss', // Path to your SCSS files
  css: './assets/', // Output directory for CSS
  js: './src/js/**/*.js', // Path to your JS files
  jsOutput: './assets/', // Output directory for JS
  slickJs: './node_modules/slick-carousel/slick/slick.min.js', // Path to Slick Slider JS
};

// Compile SCSS, add prefixes, create sourcemaps
gulp.task('styles', function () {
  return gulp
    .src(paths.scss) // Source SCSS files
    .pipe(sourcemaps.init()) // Initialize sourcemaps before transformations
    .pipe(sass().on('error', sass.logError)) // Compile SCSS and handle errors
    .pipe(
      postcss([
        require('postcss-em')(), // Convert px to em if needed
      ])
    )
    .pipe(
      autoprefixer({
        cascade: false, // Disable the cascade of prefixes
      })
    )
    .pipe(concat('theme.css')) // Concatenate all CSS into theme.css
    .pipe(sourcemaps.write('.')) // Write sourcemaps after all transformations
    .pipe(gulp.dest(paths.css)); // Output to ./assets/
});

// Concatenate and minify JavaScript files
gulp.task('scripts', function () {
  return gulp
    .src([paths.slickJs, paths.js]) // Include Slick Slider JS before your custom JS
    .pipe(sourcemaps.init()) // Initialize sourcemaps before transformations
    .pipe(concat('theme.js')) // Concatenate all JS into theme.js
    .pipe(uglify()) // Minify the JavaScript files
    .pipe(sourcemaps.write('.')) // Write sourcemaps after all transformations
    .pipe(gulp.dest(paths.jsOutput)); // Output to ./assets/
});

// Watch SCSS and JS files for changes and run respective tasks
gulp.task('watch', function () {
  gulp.watch(paths.scss, gulp.series('styles'));
  gulp.watch(paths.js, gulp.series('scripts'));
});

// Default task: compile styles, scripts and watch for changes
gulp.task('default', gulp.series('styles', 'scripts', 'watch'));
