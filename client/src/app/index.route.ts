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
    })
    .state({
      name: 'about-us',
      url: '/about-us',
      template: '<about></about>'
    })
    .state({
      name: 'awards',
      url: '/awards',
      template: '<awards></awards>'
    })
    .state({
      name: 'faq',
      url: '/faq',
      template: '<faq></faq>'
    })
    .state({
      name: 'our-mission',
      url: '/our-mission',
      template: '<ourmission></ourmission>'
    })
    .state({
      name: 'events',
      url: '/events',
      template: '<events></events>'
    });

  $urlRouterProvider.otherwise('/home');
}
