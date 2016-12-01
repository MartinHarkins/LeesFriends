/** @ngInject */
export function config($logProvider: angular.ILogProvider, toastrConfig: any, RestangularProvider: restangular.IProvider) {
  // enable log
  $logProvider.debugEnabled(true);
  // set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  RestangularProvider.setBaseUrl("http://localhost:8080/");
  RestangularProvider.setDefaultHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });
}
