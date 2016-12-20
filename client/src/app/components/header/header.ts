import {Component} from "@angular/core";

@Component({
  selector: 'header',
  template: `
      <div class="container-fluid header margin-bottom-lg">
        <div class="row">
          <ul class="menu">
            <li class="margin-top-lg"><a [routerLink]=" './services' "><h2>Services</h2></a></li>
            <li class="margin-top-sm"><a [routerLink]=" './our-mission' "><h2>Our Mission</h2></a></li>
            <li class="margin-top-md"><a [routerLink]=" './history' "><h2>History</h2></a></li>
            <li>
              <a [routerLink]=" './home' ">
                <h1 class="title">
                  Lee's Friends
                </h1>
              </a>
            </li>
            <li class="margin-top-md"><a [routerLink]=" './events' "><h2>Events</h2></a></li>
            <li class="margin-top-sm"><a [routerLink]=" './awards' "><h2>Awards</h2></a></li>
            <li class="margin-top-md"><a [routerLink]=" './about-us' "><h2>About Us</h2></a></li>
            <li class="margin-top-lg"><a [routerLink]=" './faq' "><h2>FAQ</h2></a></li>
          </ul>
        </div>  
        <div class="row">
            <div class="pull-right more">
                <a [routerLink]=" './contact-us' ">Contact Us</a>
            </div>
        </div>
      </div>
    `,
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
}
