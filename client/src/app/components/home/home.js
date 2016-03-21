var leesFriends;
(function (leesFriends) {
    'use strict';
    var HomeController = (function () {
        function HomeController() {
            this.carouselItems = [
                {
                    'imgSrc': '',
                    'text': 'page 1'
                }
            ];
            this.thoseThings = [
                {
                    'title': 'AngularJS',
                    'url': 'https://angularjs.org/',
                    'description': 'HTML enhanced for web apps!',
                    'logo': 'angular.png'
                },
                {
                    'title': 'BrowserSync',
                    'url': 'http://browsersync.io/',
                    'description': 'Time-saving synchronised browser testing.',
                    'logo': 'browsersync.png'
                },
                {
                    'title': 'GulpJS',
                    'url': 'http://gulpjs.com/',
                    'description': 'The streaming build system.',
                    'logo': 'gulp.png'
                },
                {
                    'title': 'Jasmine',
                    'url': 'http://jasmine.github.io/',
                    'description': 'Behavior-Driven JavaScript.',
                    'logo': 'jasmine.png'
                },
                {
                    'title': 'Karma',
                    'url': 'http://karma-runner.github.io/',
                    'description': 'Spectacular Test Runner for JavaScript.',
                    'logo': 'karma.png'
                },
                {
                    'title': 'Protractor',
                    'url': 'https://github.com/angular/protractor',
                    'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
                    'logo': 'protractor.png'
                },
                {
                    'title': 'Bootstrap',
                    'url': 'http://getbootstrap.com/',
                    'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
                    'logo': 'bootstrap.png'
                },
                {
                    'title': 'Angular UI Bootstrap',
                    'url': 'http://angular-ui.github.io/bootstrap/',
                    'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
                    'logo': 'ui-bootstrap.png'
                },
                {
                    'title': 'Sass (Ruby)',
                    'url': 'http://sass-lang.com/',
                    'description': 'Original Syntactically Awesome StyleSheets implemented in Ruby',
                    'logo': 'ruby-sass.png'
                },
                {
                    'title': 'TypeScript',
                    'url': 'http://www.typescriptlang.org/',
                    'description': 'TypeScript, a typed superset of JavaScript that compiles to plain JavaScript.',
                    'logo': 'typescript.png'
                }
            ];
        }
        HomeController.prototype.print = function (text) {
            console.log(text);
        };
        HomeController.prototype.getVariable = function () {
            return 'Hello!';
        };
        return HomeController;
    })();
    var HomeComponent = (function () {
        function HomeComponent() {
            this.templateUrl = 'app/components/home/home.html';
            this.controller = HomeController;
        }
        return HomeComponent;
    })();
    leesFriends.HomeComponent = HomeComponent;
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=home.js.map