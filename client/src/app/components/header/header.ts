import {Component} from "@angular/core";

@Component({
  selector: 'header',
  template: `
      <div class="container-fluid header">
        <ul class="menu">
          <li><a [routerLink]=" './services' "><h2>Services</h2></a></li>
          <li><a [routerLink]=" './our-mission' "><h2>Our Mission</h2></a></li>
          <li><a [routerLink]=" './history' "><h2>History</h2></a></li>
          <li>
            <a [routerLink]=" './home' ">
              <h1 class="title">
                Lee's Friends
              </h1>
            </a>
          </li>
          <li><a [routerLink]=" './events' "><h2>Events</h2></a></li>
          <li><a [routerLink]=" './awards' "><h2>Awards</h2></a></li>
          <li><a [routerLink]=" './about-us' "><h2>About Us</h2></a></li>
          <li><a [routerLink]=" './faq' "><h2>FAQ</h2></a></li>
        </ul>
      </div>
    `,
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
}
