import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {acmeNavbar} from '../app/components/navbar/navbar.directive';
import {CarouselComponent} from './components/carousel/carousel';
import {HomeComponent} from './components/home/home';
import {ATComponent} from './components/awesome-things/awesome-things';

import {AboutUsDirective} from './components/about-us/about-us.directives';
import {AwardsDirective} from './components/awards/awards.directives';
import {FaqDirective} from './components/faq/faq.directives';
import {OurMissionComponent} from './components/our-mission/our-mission';
import {HeaderComponent} from './components/header/header';
import {ServicesComponent} from './components/services/services';
import {ServiceItemComponent} from './components/service-item/service-item';
import {FadeInDirective} from "./directives/fade-in";
import {EventsComponent} from "./components/events/events";
import {EventItemComponent} from "./components/event-item/event-item";

declare var moment:moment.MomentStatic;

module leesFriends {
  'use strict';

  angular.module('leesFriends.directives', [])
    .directive('fadeIn', () => new FadeInDirective());

  angular.module('leesFriends.components', ['leesFriends.directives'])
    .component('home', new HomeComponent())
    .component('carousel', new CarouselComponent())
    .component('awesomeThings', new ATComponent())
    .component('header', new HeaderComponent())
    .component('services', new ServicesComponent())
    .component('serviceItem', new ServiceItemComponent())
    .component('ourmission', new OurMissionComponent())
    .component('events', new EventsComponent())
    .component('eventItem', new EventItemComponent())
    .directive('about', () => new AboutUsDirective())
    .directive('awards', () => new AwardsDirective())
    .directive('faq', () => new FaqDirective());

  angular.module('leesFriends', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'restangular',
      'ui.router',
      'ui.bootstrap',
      'ui.tinymce',
      'toastr',
      'leesFriends.components'
    ])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .directive('acmeNavbar', acmeNavbar);
}
