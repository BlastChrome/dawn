const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Using Dart Sass
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

// File paths
const paths = {
  scss: './scss/**/*.scss', // Path to your SCSS files
  css: './assets/', // Output directory for CSS
};

// Compile SCSS, add prefixes, create sourcemaps
gulp.task('styles', function () {
  return gulp
    .src(paths.scss) // Source SCSS files
    .pipe(sourcemaps.init()) // Initialize sourcemaps
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
    .pipe(sourcemaps.write('.')) // Write sourcemaps
    .pipe(concat('theme.css')) // Concatenate all CSS into theme.css
    .pipe(gulp.dest(paths.css)); // Output to ./assets/
});

// Watch SCSS files for changes and run styles task
gulp.task('watch', function () {
  gulp.watch(paths.scss, gulp.series('styles'));
});

// Default task: compile styles and watch for changes
gulp.task('default', gulp.series('styles', 'watch'));
