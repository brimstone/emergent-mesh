/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

"use strict";

module.exports = function(grunt) {
	var exec = require('child_process').exec;
	// Project configuration.
	grunt.initConfig({
		recess: {
			dist: {
				options: {
					compile: true,
					compress: true
				},
				files: {
					'files/www/css/all.css': ['less/manifest.less']
				}
			}
		},
		jshint: {
			gruntfile: ['Gruntfile.js'],
			libs_n_tests: [
				'js/app.js',
				'js/partial/*.js',
				'js/service/*.js',
				'js/controller/*.js',
				'js/directives/*.js'
				],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				//unused: true,
				browser: true,
				strict: true,
				jquery: true,
				node: true,
			}
		},
		concat: {
			dist: {
				files: {
					'files/www/js/all.js': [
						'js/vendor/*.js',
						'js/partial/*.js',
						'js/app.js',
						'js/service/*.js',
						'js/controller/*.js',
						'js/directives/*.js'
					]
				}
			}
		},
		uglify: {
			options: {
				compress: true,
				report: 'min'
			},
			dist: {
				files: {
					'files/www/js/all.js': [ 'files/www/js/all.js' ]
				}
			}
		},
		shell: {
			gzipcss: {
				command: "rm files/www/css/all.css.gz; gzip -9 files/www/css/all.css; ssh root@172.16.0.2 rm /www/css/all.css; scp files/www/css/all.css.gz root@172.16.0.2:/www/css/"
			},
			css: {
				command: "ssh root@172.16.0.2 rm /www/css/all.css; scp files/www/css/all.css root@172.16.0.2:/www/css/"
			},
			gzipjs: {
				command: "rm files/www/js/all.js.gz; gzip -9 files/www/js/all.js; ssh root@172.16.0.2 rm /www/js/all.js; scp files/www/js/all.js.gz root@172.16.0.2:/www/js/"
			},
			js: {
				command: "ssh root@172.16.0.2 rm /www/js/all.js.gz; scp files/www/js/all.js root@172.16.0.2:/www/js/"
			}
		},
		watch: {
			gruntfile: {
				files: ['<%= jshint.gruntfile %>'],
				tasks: ['jshint:gruntfile']
			},
			libs_n_tests: {
				files: ['<%= jshint.libs_n_tests %>'],
				//tasks: ['jshint:libs_n_tests', 'concat', 'uglify', 'shell:gzipjs'],
				tasks: ['jshint:libs_n_tests', 'concat', 'shell:js'],
				options: {
					livereload: true
				}
			},
			recess: {
				files: ['less/*.less'],
				tasks: ['recess', 'shell:gzipcss'],
				options: {
					livereload: true
				}
			},
			www: {
				files: ['files/www/**'],
			}
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-recess');

	grunt.registerTask('css', ['recess', 'shell:gzipcss']);
	grunt.registerTask('js', ['jshint', 'concat', 'uglify', 'shell:gzipjs']);
	// Default task.
	grunt.registerTask('default', ['css', 'js']);

	// Special Watch tasks
	grunt.event.on('watch', function(action, filepath, target) {
		if (target !== "www") {
			return;
		}
		var matches = /files\/www\/[^cj][^s]/.exec(filepath);
		if (matches != null && action === "changed" ) {
			grunt.log.writeln("Regex match with " + filepath + ": " + action);
			exec("scp " + filepath + " root@172.16.0.2:" + filepath.substr(5), {}, function (err) {
				grunt.log.writeln("Scp of " + filepath + " finished");
				if (err) {
					grunt.warn(err);
				}
				else {
					// trigger livereload
					exec("curl -s -X POST http://localhost:35729/changed -d '{ \"files\": [\"" + filepath + "\"] }'");
				}
			});
		}
	});
};
