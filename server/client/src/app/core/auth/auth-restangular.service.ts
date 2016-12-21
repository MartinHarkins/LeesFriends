import {OpaqueToken} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {AuthService} from "./auth.service";

/**
 * A restangular service configured to connect to authenticated apis.
 */
export const AuthRestangular = new OpaqueToken('AuthRestangular');

export function AuthRestangularFactory(restangular: Restangular, authService: AuthService) {
  return restangular.withConfig((RestangularConfigurer) => {
    console.log('setting up AuthRestangular');
    RestangularConfigurer.setDefaultHeaders({
      'x-access-token': authService.getToken()
    });
    console.log('did set up AuthRestangular');

  });
}
