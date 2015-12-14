/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="../typings/statehelper.d.ts" />

module leesFriends {
  'use strict';

  export class AppStates {
    constructor($stateHelperProvider:ng.ui.IStateHelperProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
      $stateHelperProvider
        .state({
          name: 'home',
          url: '/home',
          template: '<home></home>'
        })
      .state({
        name: 'services',
        url: '/services',
        template: '<services></services>'
      });

      $urlRouterProvider.otherwise('/home');
    }
  }
}
