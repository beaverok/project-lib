module.exports = function(grunt) {

  	require('time-grunt')(grunt); // Плагин для указания сколько времени ушло на выполнение задачи

  	// Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {	// проверка синтаксиса js файлов
		  options: {
			jshintrc: '.jshintrc'
		  },
		  files: 'js/**/*.js'
		},
		concat: {	// Объединение файлов
            dist: {
			src: [
				'js/plugins/**/*.js', // Все JS в папке plugins
				'js/common.js'  // Конкретный файл
				 ],
			dest: 'build/js/scripts.js',
			}
        },
		uglify: {	// Минификация файлов
			build: {
				src: 'build/js/scripts.js',
				dest: 'build/js/scripts.min.js'
			}
		},
		imagemin: { // Обработка картинок
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/images/'
				}]
			}
		},
		 postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie 8', 'ie 9']
                    })
                ]
            },
            dist: {
                src: 'build/css/*.css'
            }
        },
		less: {	//обработка less файлов (css препроцессор)
			dist: {
				options: {
					style: 'compressed'
				},
				files: [
					{
						'build/css/styles.css': 'css/**/*.less'
					}
				]
			}
		},
		pug: {	// обработка jade файлов (html шаблонизатор)
			  compile: {
				options: {
				  client: false,		
				  pretty: true,
				},
				files: [
				  	{
						src: "templates/*.pug",
						dest: "build/",
						flatten: true,
						expand: true,
						ext: ".html"
            		}
				]
			  }
    	},
		copy: {
			  main: {
				files: [
				  // includes files within path 
				  {expand: true, flatten: true, src: ['js/*jquery*'], dest: 'build/js/', filter: 'isFile'}
				],
			  },
		},
		clean: {
			  contents: ['build/*.html'],
		},
		watch: {	// отслеживание изменения файлов в реальном времени
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['css/*.less'],
				tasks: ['less'],
				options: {
					spawn: false,
				}
			},
			pug: {
				files: 'app/views/**/*.jade',
				tasks: ['pug']
			}
		}

    });

    // Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

    // Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'less', 'postcss', 'imagemin']);
	grunt.registerTask('html', ['clean', 'pug']);
};