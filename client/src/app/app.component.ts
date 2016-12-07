/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <div class="container main">
      <header></header>
  
      <main>
        <router-outlet></router-outlet>
      </main>
  
      <div class="footer">
        <div class="row margin-top-lg">
          <div class="col-md-4"></div>
          <div class="col-md-4  text-center font-size-md">
            <p>All Services are Free of Charge</p>
            7400 Hampton Boulevard<br/>
            Room 201<br/>
            Norfolk, VA. 23505<br/>
            757-440-7501<br/>
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
    </div>
`
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
