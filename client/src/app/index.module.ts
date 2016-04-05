import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributor } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { acmeMalarkey } from '../app/components/malarkey/malarkey.directive';
import { HeaderDirective } from './components/header/header.directive';
import { CarouselComponent } from './components/carousel/carousel';
import { HomeComponent } from './components/home/home';
import { ATComponent } from './components/awesome-things/awesome-things';
import { ServicesDirective } from './components/services/services.directive';
import { AboutUsDirective } from './components/about-us/about-us.directive';
import { AwardsDirective } from './components/awards/awards.directive';
import { FaqDirective } from './components/faq/faq.directive';
import { OurMissionDirective } from './components/our-mission/our-mission.directive';


declare var malarkey: any;
declare var moment: moment.MomentStatic;

module leesFriends {
    'use strict';

    angular.module('leesFriends.components', [])
        .component('home', new HomeComponent())
        .component('carousel', new CarouselComponent())
        .component('awesomeThings', new ATComponent())
        .directive('header', () => new HeaderDirective())
        .directive('services', () => new ServicesDirective())
        .directive('about', () => new AboutUsDirective())
        .directive('awards', () => new AwardsDirective())
        .directive('faq', () => new FaqDirective())
        .directive('ourmission', () => new OurMissionDirective());


    angular.module('leesFriends', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'restangular',
        'ui.router',
        'ui.bootstrap',
        'toastr',
        'leesFriends.components'
    ])
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .config(config)
        .config(routerConfig)
        .run(runBlock)
        .service('githubContributor', GithubContributor)
        .service('webDevTec', WebDevTecService)
        .controller('MainController', MainController)
        .directive('acmeNavbar', acmeNavbar)
        .directive('acmeMalarkey', acmeMalarkey);
}
