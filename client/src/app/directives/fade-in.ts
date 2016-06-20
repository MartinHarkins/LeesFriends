/**
 * Created by mharkins on 6/19/16.
 */
/** @ngInject */
export class FadeInDirective implements angular.IDirective {
  link = (scope:any, $element:ng.IAugmentedJQuery, attributes:ng.IAttributes):void => {
    $element.addClass('ng-hide-remove');
    $element.on('load', function() {
      console.log('Loaded');
      $element.addClass('ng-hide-add');
    });
  };
}
