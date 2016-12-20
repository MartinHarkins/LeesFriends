import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {RxUtils} from "../../core/utils/RxUtils";

@Component({
  styles: [` 
.message {
    margin-left: 1em;
    display: inline-block;
}
`],
  template: `
<div class="container">
    <div class="col-lg-3"></div>
    <div class="col-lg-6">
      <div class="row">
          <form (ngSubmit)="login()" #loginForm="ngForm">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" [(ngModel)]="username" id="username" name="username" required #usernameInput="ngModel"/>
                
                <div [hidden]="usernameInput.valid || usernameInput.pristine" class="text-danger">
                  Username is required.
                </div>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" [(ngModel)]="password" id="password" name="password" required #passwordInput="ngModel"/>
                
                <div [hidden]="passwordInput.valid || passwordInput.pristine" class="text-danger">
                  Password is required.
                </div>
              </div>

              <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Login</button>
              <div class="message">{{message}}</div>
          </form>
      </div>
    </div>
    <div class="col-lg-3"></div>
</div>`
})
export class LoginComponent implements OnInit {
  message: string;
  private username: string;
  private password: string;

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
      // Redirect the user
      this.router.navigate([redirect]);
      return;
    }
  }

  login() {
    this.message = 'Logging in ...';

    RxUtils.ensureMinDuration<boolean>(this.authService.login(this.username, this.password), 1000)
      .subscribe(isSuccessful => {
        if (!isSuccessful) {
          this.message = 'Failed to log in.';
        }

        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
          // Redirect the user
          this.router.navigate([redirect]);
        }
      }, (err) => {
        this.message = 'Failed to log in.';
        console.error('Could not log in', err);
      });
  }
}
