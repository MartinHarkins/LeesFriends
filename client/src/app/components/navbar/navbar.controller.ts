interface INavbarScope extends ng.IScope {
  date: Date
}

/** @ngInject */
export class NavbarCtrl {
  /** @ngInject */
  constructor($scope:INavbarScope) {
    $scope.date = new Date();
  }
}
