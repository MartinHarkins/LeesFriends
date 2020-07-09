/*
 * Angular 2 decorators and services
 */
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {AppState} from "./app.service";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './index.scss'
  ],
  template: `
    <div class="content">
      <header></header>

      <main>
        <router-outlet></router-outlet>
      </main>

      <div class="push"></div>
    </div>

    <footer></footer>
  `
})
export class AppComponent implements OnInit {
  title = `Lee's Friends`;
  url = 'https://github.com/MartinHarkins/LeesFriends';

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
