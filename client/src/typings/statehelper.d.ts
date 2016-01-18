/// <reference path="../../.tmp/typings/angular-ui-router/angular-ui-router.d.ts" />

// Support for AMD require and CommonJS
declare module "angular-ui-router-statehelper" {
  // Since angular-ui-router adds providers for a bunch of
  // injectable dependencies, it doesn't really return any
  // actual data except the plain string 'ui.router'.
  //
  // As such, I don't think anybody will ever use the actual
  // default value of the module.  So I've only included the
  // the types. (@xogeny)
  export type IState = angular.ui.IState;
  export type IStateProvider = angular.ui.IStateProvider;
}

declare module angular.ui {

  interface IStateHelperState extends ng.ui.IState {
    children?: Function|Array<IStateHelperState|Function>;
  }

  interface IStateHelperProvider extends IServiceProvider {
    state(config: IStateHelperState): IStateProvider;
    decorator(name?: string, decorator?: (state: IStateHelperState, parent: Function) => any): any;
  }
}
