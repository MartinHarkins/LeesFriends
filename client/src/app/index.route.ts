/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
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
