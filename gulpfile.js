var gulp = require('gulp');
var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');
var replace = require('gulp-ext-replace');
var path = require('path');

var apps = [{
  name: 'blog',
  styles: {
    src: [
      './apps/blog/public/styles/**/[^_]*.pcss',
      '!./apps/blog/public/styles/build/*.css'
    ],
    dest: './apps/blog/public/styles/build',
    watch: [
      './apps/blog/public/styles/**/*.pcss',
      '!./apps/blog/public/styles/build/*.css'
    ]
  },
  views: {
    src: './apps/blog/views/**/*.jade'
  }
}];

var stylesTask = function(app) {
  var processors = [
      require('postcss-import'),
      require('postcss-nested'),
      require('postcss-custom-properties'),
      require('postcss-custom-media'),
      autoprefixer({ browsers: ['last 2 version'] }),
      mqpacker,
      csswring({ removeAllComments: true })
  ];
  gulp.src(app.styles.src)
    .pipe(postcss(processors))
    .pipe(replace('.css'))
    .pipe(gulp.dest(app.styles.dest))
    .pipe(browserSync.stream());
};

gulp.task('styles', function () {
  for (var i = 0; i < apps.length; ++i) {
    var app = apps[i];
    stylesTask(app);
  }
});

gulp.task('default', ['styles'], function() {
  browserSync.init({
    open: 'external',
    proxy: 'localhost:3000',
    host: 'wedevelop.dev',
    port: 3000
  });

  for (var i = 0; i < apps.length; ++i) {
    var app = apps[i];
    gulp.watch(app.styles.watch, ['styles']);
    gulp.watch(app.views.src).on('change', browserSync.reload);
  }
});
