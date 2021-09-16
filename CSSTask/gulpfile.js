const { src, dest, watch } = require('gulp');
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));

const sourcePath = "./src/static/scss/**/*.scss";
const destPath = "./dist/static/css/";

const bundleSass = () => {
    return src(sourcePath)
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer({
            overrideBrowsersList: ["last 20 versions", "ie >= 11"],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(concat('main.css'))
        .pipe(dest(destPath));
};

const devWatch = () => {
    watch(sourcePath, bundleSass);
}

exports.bundleSass = bundleSass;
exports.devWatch = devWatch;