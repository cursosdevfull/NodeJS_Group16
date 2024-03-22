const uglify = require("gulp-uglify-es").default;
const { src, dest } = require("gulp");

const minify = () =>
  src("./cache/src/**/*.js")
    .pipe(uglify({ output: { comments: "preserve" } }))
    .pipe(dest("./dist"));

exports.minify = minify;
