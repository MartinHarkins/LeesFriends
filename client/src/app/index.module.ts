import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {CarouselComponent} from './components/carousel/carousel';
import {HomeComponent} from './components/home/home';
import {ATComponent} from './components/awesome-things/awesome-things';

import {AboutUsDirective} from './components/about-us/about-us.directives';
import {AwardsDirective} from './components/awards/awards.directives';
import {FaqDirective} from './components/faq/faq.directives';
import {ServicesComponent} from './components/services/services';
import {ServiceItemComponent} from './components/service-item/service-item';
import {FadeInDirective} from "./directives/fade-in";
import {EventItemComponent} from "./components/event-item/event-item";
import {EventEditorComponent} from "./components/event-editor/event-editor";

import { downgradeComponent } from '@angular/upgrade/static';

angular.module('leesFriends.directives', [])
    .directive('fadeIn', () => new FadeInDirective());

  angular.module('leesFriends.components', ['leesFriends.directives'])
    .component('home', new HomeComponent())
    .component('carousel', new CarouselComponent())
    .component('awesomeThings', new ATComponent())
    .component('services', new ServicesComponent())
    .component('serviceItem', new ServiceItemComponent())
    .directive('eventItem', downgradeComponent({
      component: EventItemComponent,
      inputs: ['event']
    }) as angular.IDirectiveFactory)
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
    .config(config)
    .config(routerConfig)
    .run(runBlock);

