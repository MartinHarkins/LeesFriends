import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {WebDevTecService} from '../app/components/webDevTec/webDevTec.service';
import {acmeNavbar} from '../app/components/navbar/navbar.directive';
import {CarouselComponent} from './components/carousel/carousel';
import {HomeComponent} from './components/home/home';
import {ATComponent} from './components/awesome-things/awesome-things';

import {AboutUsDirective} from './components/about-us/about-us.directives';
import {AwardsDirective} from './components/awards/awards.directives';
import {FaqDirective} from './components/faq/faq.directives';
import {OurMissionDirective} from './components/our-mission/our-mission.directives';
import {HeaderComponent} from "./components/header/header";
import {ServicesComponent} from "./components/services/services";
import {ServiceItemComponent} from "./components/service-item/service-item";

declare var moment:moment.MomentStatic;

module leesFriends {
  'use strict';

  angular.module('leesFriends.components', [])
    .component('home', new HomeComponent())
    .component('carousel', new CarouselComponent())
    .component('awesomeThings', new ATComponent())
    .component('header', new HeaderComponent())
    .component('services', new ServicesComponent())
    .component('serviceItem', new ServiceItemComponent())
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
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('webDevTec', WebDevTecService)
    .directive('acmeNavbar', acmeNavbar);
}