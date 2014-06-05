module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');

	var userConfig = require('./config/build.config.js');
	var gruntUtils = require('./config/grunt.utils.js');

	var port = grunt.option('port') || '4000';

	var taskConfig = {

		pkg: grunt.file.readJSON("package.json"),

		meta: {
			banner: '/**\n' +
				' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' *\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
				' */\n'
		},

		clean: [
			'<%= compile_dir %>',
			'<%= tmp_dir %>',
			'qa/'
		],

		copy: {
			compile_assets: {
				files: [{
					src: ['**'],
					dest: '<%= compile_dir %>/assets',
					cwd: 'src/assets',
					expand: true
				}]
			},
			vendor_assets: {
				files: [{
					src: ['<%= vendor_files.assets %>'],
					dest: '<%= compile_dir %>/assets',
					expand: true
				}]
			},
			vendor_fonts: {
				files: [{
					src: ['<%= vendor_files.fonts %>'],
					dest: '<%= compile_dir %>/fonts',
					flatten: true,
					expand: true
				}]
			}
		},

		concat: {
			build_css: {
				src: [
					'<%= vendor_files.css %>',
					'<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
				],
				dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
			},
			compile_js: {
				src: [
					'<%= vendor_files.js %>',
					'module.prefix',
					'src/**/*.js',
					'!src/**/*.spec.js',
					'<%= html2js.app.dest %>',
					'<%= html2js.common.dest %>',
					'module.suffix'
				],
				dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},

		ngmin: {
			compile: {
				files: [{
					src: ['<%= concat.compile_js.dest %>'],
					dest: '<%= concat.compile_js.dest %>',
					expand: true
				}]
			}
		},

		uglify: {
			compile: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
				}
			}
		},

		less: {
			compile: {
				options: {
					strictMath: true,
					compress: true
				},
				files: {
					'<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': ['<%= app_files.less %>']
				}
			}
		},

		sass: {
			dist: {
				files: {
					'<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.sass %>'
				},
				options: {
					style: 'compressed'
				},
			}
		},

		jshint: {
			src: [
				'<%= app_files.js %>'
			],
			test: [
				'<%= app_files.jsunit %>'
			],
			gruntfile: [
				'Gruntfile.js'
			],
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			},
			globals: {}
		},

		html2js: {
			app: {
				options: {
					base: 'src/app'
				},
				src: ['<%= app_files.atpl %>'],
				dest: '<%= tmp_dir %>/templates-app.js'
			},
			common: {
				options: {
					base: 'src/common'
				},
				src: ['<%= app_files.ctpl %>'],
				dest: '<%= tmp_dir %>/templates-common.js'
			}
		},

		karma: {
			options: {
				configFile: '<%= tmp_dir %>/karma-unit.js'
			},
			unit: {
				port: 9019,
				background: true,
				singleRun: false,
				reporters: ['growl', 'junit', 'coverage'],
				browsers: ['Firefox'],
				coverageReporter: {
					type: 'html',
					dir: 'qa/'
				}
			},
			continuous: {
				singleRun: true
			}
		},

		karmaconfig: {
			unit: {
				dir: '<%= compile_dir %>',
				src: [
					'<%= concat.compile_js.dest %>',
					'<%= test_files.js %>'
				]
			}
		},

		index: {
			compile: {
				dir: '<%= compile_dir %>',
				src: [
					'<%= concat.compile_js.dest %>',
					'<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
				]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
				options: {
					livereload: false
				}
			},
			jssrc: {
				files: [
					'<%= app_files.js %>'
				],
				tasks: ['jshint:src', 'karma:unit:run', 'concat:compile_js']
			},
			assets: {
				files: [
					'src/assets/**/*'
				],
				tasks: ['copy:compile_assets']
			},
			html: {
				files: ['<%= app_files.html %>'],
				tasks: ['index:compile']
			},
			tpls: {
				files: [
					'<%= app_files.atpl %>',
					'<%= app_files.ctpl %>'
				],
				tasks: ['html2js', 'concat:compile_js']
			},
			sass: {
				files: ['src/**/*.scss'],
				tasks: ['sass']
			},
			less: {
				files: ['src/**/*.less'],
				tasks: ['less']
			},
			jsunit: {
				files: [
					'<%= app_files.jsunit %>'
				],
				tasks: ['jshint:test', 'karma:unit:run'],
				options: {
					livereload: false
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: '<%= pkg.name %>-<%= pkg.version %>.tar',
					mode: 'tar'
				},
				files: [{
					src: ['<%= compile_dir %>/**'],
					dest: '.'
				}, {
					src: ['deploy.sh'],
					dest: '.'
				}]
			}
		},
		open: {
			server: {
				url: 'http://localhost/BafaMobileAngular'
			}
		}
	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	//config IIS
	//grunt.registerTask('serve', ['compile', 'karma:unit', 'open', 'watch']);

	//config locale
	grunt.registerTask('serve', ['compile', 'karma:unit', 'connect', 'watch']);

	grunt.registerTask('default', ['compile']);

	grunt.registerTask('compile', [
		'clean',
		'html2js',
		'jshint',
		'less',
		//'sass',
		'copy:compile_assets',
		'copy:vendor_assets',
		'copy:vendor_fonts',
		'concat:compile_js',
		'concat:build_css',
		'index:compile',
		'karmaconfig',
		'karma:continuous'
	]);

	grunt.registerTask('release', [
		'clean',
		'html2js',
		'jshint',
		'less',
		//'sass',
		'copy:compile_assets',
		'copy:vendor_assets',
		'copy:vendor_fonts',
		'concat:compile_js',
		'concat:build_css',
		'index:compile',
		'karmaconfig',
		'karma:continuous',
		'compress'
	]);

	grunt.registerTask('release-min', [
		'clean',
		'html2js',
		'jshint',
		'less',
		//'sass',
		'copy:compile_assets',
		'copy:vendor_assets',
		'copy:vendor_fonts',
		'ngmin',
		'concat:compile_js',
		'concat:build_css',
		'uglify',
		'index:compile',
		'compress'
	]);

	grunt.registerMultiTask('index', 'Process index.html template', function() {
		var dirRE = new RegExp('^(' + grunt.config('tmp_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
		var jsFiles = gruntUtils.filterForJS(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '');
		});
		var cssFiles = gruntUtils.filterForCSS(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '');
		});
		grunt.log.writeln('tmp dir "' + grunt.config('tmp_dir') + '".');

		grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
			process: function(contents, path) {
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config('pkg.version')
					}
				});
			}
		});
	});

	grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {
		var jsFiles = gruntUtils.filterForJS(this.filesSrc);

		grunt.file.copy('config/karma-unit.tpl.js', grunt.config('tmp_dir') + '/karma-unit.js', {
			process: function(contents, path) {
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles
					}
				});
			}
		});
	});

	var connect = require('connect');
	grunt.registerTask('connect', 'Start a custom static web server.', function() {
		grunt.log.writeln('Starting static web server in "' + grunt.config('compile_dir') + '" on port ' + port + '.');
		connect(connect.static(grunt.config('compile_dir'))).listen(port);
	});

};