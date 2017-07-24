/*jslint node: true */
"use strict";
module.exports = function (grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		bower: {
			install: {
				options: {
					install: true,
					copy: false,
					targetDir: './libs',
					cleanTargetDir: true
				}
			}
		},
		//Enable this for libsass compiler
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'app/assets/styles/styles.css': 'app/assets/sass/styles.scss'
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						//for HTML5Shiv files
						expand: true,
						dot: true,
						cwd: 'bower_components/html5shiv/dist',
						src: ['html5shiv.min.js'],
						dest: 'dist/js'
					}, {
						//for Fontawesome stylesheet files
						expand: true,
						dot: true,
						cwd: 'bower_components/fontawesome/css',
						src: ['font-awesome.min.css'],
						dest: 'dist/css'
					}, {
						//for Bootstrap stylesheet files
						expand: true,
						dot: true,
						cwd: 'bower_components/bootstrap/dist/css',
						src: ['bootstrap.min.css'],
						dest: 'dist/css'
					}, {
						//for Bootstrap theme stylesheet files
						expand: true,
						dot: true,
						cwd: 'bower_components/bootstrap/dist/css',
						src: ['bootstrap-theme.min.css'],
						dest: 'dist/css'
					}, {
						//for bootstrap fonts
						expand: true,
						dot: true,
						cwd: 'bower_components/bootstrap/dist',
						src: ['fonts/*.*'],
						dest: 'dist'
					}, {
						//for font-awesome
						expand: true,
						dot: true,
						cwd: 'bower_components/font-awesome',
						src: ['fonts/*.*'],
						dest: 'dist'
					},
					{
						//for Images
						expand: true,
						dot: true,
						cwd: 'app/assets/images',
						src: ['*.*', 'avatars/*'],
						dest: 'dist/images'
					},
					{
						//for Images
						expand: true,
						dot: true,
						cwd: 'app/assets/images',
						src: ['*.*', 'background/*'],
						dest: 'dist/images'
					},
					{
						//for Images
						expand: true,
						dot: true,
						cwd: 'app/assets/images',
						src: ['*.*', 'favicons/*'],
						dest: 'dist/images'
					}
				]
			},
			css: {
				files: [
					{
						//for Fontawesome stylesheet files
						expand: true,
						dot: true,
						cwd: 'app/assets/styles/',
						src: ['styles.css'],
						dest: 'dist/css'
					}
				]
			},
			copyicons: {
				files: [{
					//for Images
					expand: true,
					dot: true,
					cwd: 'bower_components/material-design-icons',
					src: ['*/svg/production/*.svg'],
					dest: 'dist/img/icons',
					flatten: true
				}]
			}
		},
		
		uglify: {
			dist: {
				files: {
					'dist/js/app.js': ['dist/js/app.js']
				},
				options: {
					mangle: false,
					preserveComments: 'some'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'dist/css/main.css': [
						'app/assets/styles/styles.css'
					]
				}
			},
			add_banner: {
				options: {
					banner: '/* My minified admin css file */'
				},
				files: {
					'dist/css/main.css': ['dist/css/main.css']
				}
			}
		},
		
		html2js: {
			dist: {
				src: ['app/*.html', 'app/components/*.html', 'app/shared/*.html'],
				dest: 'tmp/views.js'
			}
		},
		
		bless: {
			default_options: {
				options: {
					force: true
				},
				files: {
					'tmp/css/main.css': 'dist/css/main.css'
				}
			},
			custom_options: {
				options: {
					banner: '/* This file has been blessed by <%= pkg.name %> v<%= pkg.version %> */',
					cacheBuster: false,
					compress: true,
					force: true
				},
				files: {
					'tmp/main.css': 'dist/css/main.css'
				}
			},
			// Just counting files with logging, without write
			check: {
				options: {
					logCount: true
				},
				src: [
					'dist/css/*.css'
				]
			},
		},
		
		clean: {
			temp: {
				src: ['tmp']
			}
		},
		
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['bower_components/jquery/dist/jquery.min.js',
					'bower_components/bootstrap/dist/js/bootstrap.min.js',
					'bower_components/angular/angular.min.js',
					'bower_components/angular-route/angular-route.min.js',
					'bower_components/angular-ui-router/release/angular-ui-router.min.js'
				
				],
				dest: 'dist/js/bower.js'
			}
		},
		
		jshint: {
			all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js']
		},
		
		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 8080
				}
			}
		},
		
		watch: {
			dev: {
				files: ['Gruntfile.js', 'app/**/*.js', '*.html', 'app/assets/sass/**/*.scss'],
				tasks: ['jshint', 'html2js:dist', 'sass', 'copy:main', 'copy:css','concat:dist', 'clean:temp', 'bless:check'],
				options: {
					atBegin: true
				}
			},
			prod: {
				files: ['Gruntfile.js', 'app/**/*.js', '*.html', 'app/assets/sass/**/*.scss'],
				tasks: ['jshint', 'html2js:dist', 'sass', 'copy:main', 'concat:dist', 'clean:temp', 'cssmin', 'bless:check'],
				options: {
					atBegin: true
				}
			},
			min: {
				files: ['Gruntfile.js', 'app/*.js', '*.html', 'app/assets/sass/*.scss'],
				tasks: ['jshint', 'html2js:dist', 'sass', 'copy:main', 'concat:dist', 'clean:temp', 'uglify:dist', 'cssmin', 'bless:check'],
				options: {
					atBegin: true
				}
			}
		},
		
		compress: {
			dist: {
				options: {
					archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
				},
				files: [{
					src: ['index.html'],
					dest: '/'
				}, {
					src: ['app/**'],
					dest: 'app/'
				}, {
					src: ['app/**'],
					dest: 'app/'
				}, {
					src: ['app/**'],
					dest: 'app/'
				}]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	//This uses Libsass
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-bless');
	
	grunt.registerTask('dev', ['bower', 'connect:server', 'watch:dev']);
	grunt.registerTask('prod', ['bower', 'connect:server', 'watch:prod']);
	grunt.registerTask('test', ['bower', 'jshint']);
	grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
	grunt.registerTask('copy-icons', ['copy:copyicons']);
};
