import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'admin',
  styles: [`
    ul.menu {
      list-style: none;
      margin: 0;
      padding: 0;
    }
 `],
  template: `
<div class="container-fluid">
    <div class="col-lg-1">
        <ul class="menu">
            <li>
               <a [routerLink]="['events']"><h2>Events</h2></a>
            </li>
            <li class="margin-top-md">
                <button type="button" class="btn btn-default" (click)="logout()">Logout</button>
            </li>
        </ul>
    </div>
    <div class="col-lg-11">
        <router-outlet></router-outlet>
    </div>
</div>
`
})
export class AdminComponent {
  constructor(private router: Router, private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
