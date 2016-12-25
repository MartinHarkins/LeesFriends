import {Component} from "@angular/core";

@Component({
  selector: 'header',
  template: `
      <div class="container-fluid header">
        <div class="row menu">
          <div class="menu-group menu-group-left">
            <div class="menu-item margin-top-lg"><a [routerLink]=" './services' " routerLinkActive="active-link"><h2>Services</h2></a></div>
            <div class="menu-item margin-top-sm"><a [routerLink]=" './our-mission' " routerLinkActive="active-link"><h2>Our Mission</h2></a></div>
            <div class="menu-item margin-top-md"><a [routerLink]=" './history' " routerLinkActive="active-link"><h2>History</h2></a></div>
          </div>
          <div class="menu-group menu-group-center" >
              <a [routerLink]=" './home' " routerLinkActive="active-link">
              <h1 class="title">
                Lee's Friends
              </h1>
            </a>
            <h3 class="subtitle">Helping People Live With Cancer</h3>
          </div>
          <div class="menu-group menu-group-right">
            <div class="menu-item margin-top-md"><a [routerLink]=" './events' " routerLinkActive="active-link"><h2>Events</h2></a></div>
            <div class="menu-item margin-top-sm"><a [routerLink]=" './awards' " routerLinkActive="active-link"><h2>Awards</h2></a></div>
            <div class="menu-item margin-top-md"><a [routerLink]=" './about-us' " routerLinkActive="active-link"><h2>About Us</h2></a></div>
            <div class="menu-item margin-top-lg"><a [routerLink]=" './faq' " routerLinkActive="active-link"><h2>FAQ</h2></a></div>
          </div>
        </div>  
        <div class="row">
            <div class="pull-right more">
                <a [routerLink]=" './contact-us' " routerLinkActive="active-link"><h5>Contact Us</h5></a>
            </div>
        </div>
      </div>
    `,
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
}
