/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  compile_dir: 'dist',
  tmp_dir: 'tmp',
  app_files: {
    js: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js'],
    jsunit: ['src/**/*.spec.js'],

    atpl: ['src/app/**/*.tpl.html'],
    ctpl: ['src/common/**/*.tpl.html'],

    html: ['src/index.html'],
    less: ['vendor/ionicons/css/ionicons.css', 'src/less/main.less'],
    sass: 'src/sass/main.scss'
  },
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },
  vendor_files: {
    js: [
      'vendor/jquery/jquery.js',
      'vendor/jquery-ui/ui/jquery-ui.js',
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-cookies/angular-cookies.js',
      'vendor/angular-strap/dist/angular-strap.js',
      'vendor/angular-strap/dist/angular-strap.tpl.js',
      'vendor/angular-file-upload/angular-file-upload.js',
      'vendor/angular-bootstrap/ui-bootstrap.min.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/angular-ui-calendar/src/calendar.js',
      'vendor/fullcalendar/fullcalendar.js',
      'vendor/fullcalendar/gcal.js',
      'vendor/angular-breadcrumb/dist/angular-breadcrumb.min.js'
    ],
    css: [
      'vendor/angular-motion/dist/angular-motion.min.css',
      'vendor/fullcalendar/fullcalendar.css'
    ],
    assets: [
    ],
    fonts: [
      'vendor/ionicons/fonts/*',
      'vendor/bootstrap/fonts/*'
    ]
  },
};
