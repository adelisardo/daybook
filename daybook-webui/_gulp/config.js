var modRewrite = require('connect-modrewrite');
var gutil = require('gulp-util');

var build = 'build';

var development = build + '/development';
var production = build + '/production';
var developmentAssets = development + '/assets';
var productionAssets = production + '/assets';

var backOffice = 'admin';
var backOfficeDevelopment = development + '/' + backOffice;
var backOfficeProduction = production + '/' + backOffice;
var backOfficeDevelopmentAssets = development + '/' + backOffice + '/assets';
var backOfficeProductionAssets = production + '/' + backOffice + '/assets';


module.exports = {
    browsersync: {
        development: {
            server: {
                baseDir: [development]
            },
            files: [development + '/**/*.*'],
            middleware: [
                modRewrite([
                    '^((?!admin)([^.]))*$ /index.html [L]',
                    '^(/admin)([^.])*$ /admin/index.html [L]'
                ]),
            ],
            port: 3000,
            browser: 'firefox',
        },
        production: {
            server: {
                baseDir: [production]
            },
            middleware: [
                modRewrite(['!\\.\\w+$ /index.html [L]'])
            ],
            port: 3001,
            browser: 'firefox'
        }
    },
    api: {
        development: {
            src: development + '/**/*.{html,css,js}',
            dest: development,
            url: 'http://daybook-api.test',
            urlWithVersion: 'http://daybook-api.test'
        },
        production: {
            src: production + '/**/*.{html,css,js}',
            dest: production,
            url: '/api',
            urlWithVersion: '/api'
        },
        urlKey: '#WEB_API_URL#',
        urlVersionKey: '#WEB_API_WITH_VERSION#'
    },
    delete: {
        src: [build]
    },
    html: [
        //frontOffice 
        {
            src: 'frontOffice/index.html',
            dest: development,
            fileName: 'index.html'
        },
        //backOffice
        {
            src: 'backOffice/index.html',
            dest: backOfficeDevelopment,
            fileName: 'index.html'
        }
    ],
    styles: [
        //frontOffice
        //lib
        {
            src: [
                'shared/lib/bootstrap/css/bootstrap.css',
                'shared/lib/angular-ui-notification/angular-ui-notification.min.css',
                'shared/lib/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
                'shared/lib/offline/themes/offline-theme-chrome.css',
                'shared/lib/offline/themes/offline-language-english.css',
            ],
            dest: developmentAssets,
            fileName: 'lib.css',
            hasRebase: true
        },
        //frontOffice
        //app
        {
            src: [
                'frontOffice/**/*.{css,scss}',
                'shared/app/**/*.{css,scss}',
            ],
            dest: developmentAssets,
            fileName: 'app.css',
            hasRebase: false
        },
        //backOffice
        //lib
        {
            src: [],
            dest: backOfficeDevelopmentAssets,
            fileName: 'lib.css',
            hasRebase: true
        },
        //backOffice
        //app
        {
            src: [],
            dest: backOfficeDevelopmentAssets,
            fileName: 'app.css',
            hasRebase: false
        }
    ],
    scripts: [
        //frontOffice
        //lib
        {
            src: [
                'shared/lib/jquery/jquery-1.11.2.min.js',
                'shared/lib/jquery/jquery.easing.min.js',
                'shared/lib/angular/angular.js',
                'shared/lib/angular/angular-route.js',
                'shared/lib/angular/angular-sanitize.js',
                'shared/lib/angular-ui-notification/angular-ui-notification.min.js',
                'shared/lib/angular/focusIf.min.js',
                'shared/lib/ui-bootstrap/ui-bootstrap-tpls-2.5.0.min.js',
                'shared/lib/moment/moment.min.js',
                'shared/lib/angular-local-storage/angular-local-storage.js',
                'shared/lib/angular-duplicate-requests-filter/angular-duplicate-requests-filter.js'
            ],
            fileName: 'lib.js',
            dest: developmentAssets
        },
        //frontOffice
        //app
        {
            src: [
                'frontOffice/**/*.js',
                'shared/app/**/*.js'
            ],
            fileName: 'app.js',
            dest: developmentAssets
        },
        //backOffice
        //lib
        {
            src: [],
            fileName: 'lib.js',
            dest: backOfficeDevelopmentAssets
        },
        //backOffice
        //app
        {
            src: [],
            fileName: 'app.js',
            dest: backOfficeDevelopmentAssets
        }
    ],
    template: [
        //frontOffice
        {
            src: [
                'frontOffice/app/**/*.html',
                'shared/app/**/*.html'
            ],
            fileName: 'template.js',
            dest: developmentAssets
        },
        //backOffice
        {
            src: [],
            fileName: 'template.js',
            dest: backOfficeDevelopmentAssets
        }
    ],
    files: [
        //frontOffice
        //images
        {
            src: 'frontOffice/assets/images/**/*.*',
            dest: developmentAssets + '/images'
        },
        //backOffice
        //images
        {
            src: 'backOffice/assets/images/**/*.*',
            dest: backOfficeDevelopmentAssets + '/images'
        },
        //fonts
        {
            src: 'shared/**/*.{otf,eot,svg,ttf,woff,woff2}',
            dest: development + '/shared'
        },
        //favicon
        {
            src: 'shared/favicon/**/*.*',
            dest: development + '/shared/favicon'
        }
    ],
    copyFiles: {
        src: development + '/**/*.*',
        dest: production
    },
    cordovaRequirement: {
        deleteAdmin: {
            src: development + '/admin'
        },

    },
    optimize: {
        html: {
            src: production + '/**/*.html',
            dest: production,
            options: {
                collapseWhitespace: true
            }
        },
        styles: {
            src: production + '/**/*.css',
            dest: production,
            options: {
                level: {
                    1: {
                        specialComments: 0
                    }
                },
                rebase: false
            }
        },
        scripts: {
            src: production + '/**/*.js',
            dest: production,
            options: {}
        }
    },
    webConfig: {
        src: 'shared/Web.config',
        dest: production
    },
    revision: {
        src: [production + '/**/*.{css,js}', '!' + production + '/shared/lib/tinymce/**/*.*'],
        dest: {
            assets: production,
            manifest: {
                name: 'manifest.json',
                path: productionAssets
            }
        }
    },
    collect: {
        src: [
            productionAssets + '/manifest.json',
            production + '/**/*.{html,xml,txt,json,css,js}'
        ],
        dest: production
    },
    gzip: {
        src: production + '/**/*.{html,css,js}',
        dest: production,
        options: {}
    },
    zip: {
        src: production + '/**/*.*',
        dest: build,
        fileName: 'deploy.zip'
    },
    ftp: {
        options: {
            host: '',
            user: '',
            password: '',
            parallel: 10,
            maxConnections: 10,
            log: gutil.log
        },
        src: production + '/**/*.*',
        dest: build
    }
};