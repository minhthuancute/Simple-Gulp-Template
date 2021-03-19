
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require('browser-sync');
const imagemin = require("gulp-imagemin");

const pathScss = "./scss/*.scss";
const pathJs = "./js/*.js";
const pathImages = "./images/*";

gulp.task("scss", function() {
   return gulp.src(pathScss)
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("./dist/css"))
      .pipe(browserSync.stream())
})

gulp.task("js", function() {
   return gulp.src(pathJs)
      .pipe(gulp.dest("./dist/js"));
})

gulp.task("image", function() {
   return gulp.src(pathImages)
      .pipe(imagemin())
      .pipe(gulp.dest("./dist/images"))
})

gulp.task("serve", function() {
   browserSync.init({
      notify: false,
      server: {
         baseDir: "./"
      }
   })

   gulp.watch(pathScss, gulp.series("scss"));
   gulp.watch(pathJs, gulp.series("js"));
   gulp.watch(pathImages, gulp.series("image"));

   gulp.watch("./*.html").on("change", browserSync.reload);
   gulp.watch("./dist/js/*.js").on("change", browserSync.reload);
   gulp.watch("./dist/css/*.css").on("change", browserSync.reload);
   gulp.watch("./dist/images/*").on("change", browserSync.reload);

})