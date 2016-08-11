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
				'js/libs/**/*.js', // Все JS в папке libs
				'js/common.js'  // Конкретный файл
				 ],
			dest: 'build/js/scripts.js',
			}
        },
		uglify: {	// Минификация файлов
			build: {
				src: 'build/scripts.js',
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
		less: {	//обработка less файлов (css препроцессор)
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'build/css/styles.css': 'css/styles.less'
				}
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
				  		'build/index.html': 'templates/views/common.jade'
					},
					{
						src: "templates/*.jade",
						dest: "build/",
						expand: true,
						ext: ".html"
            		}
				]
			  }
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

    // Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};