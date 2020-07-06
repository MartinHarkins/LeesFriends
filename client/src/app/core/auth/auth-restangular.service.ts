import {Restangular} from "ngx-restangular";
import {AuthService} from "./auth.service";
import {InjectionToken} from "@angular/core";

/**
 * A restangular service configured to connect to authenticated apis.
 */
export const authRestangular = new InjectionToken('AuthRestangular');

export function AuthRestangularFactory(restangular: Restangular, authService: AuthService) {
  return restangular.withConfig((restangularConfigurer) => {
    console.log('setting up AuthRestangular');
    restangularConfigurer.setDefaultHeaders({
      'x-access-token': authService.getToken()
    });
    console.log('did set up AuthRestangular');

  });
}
