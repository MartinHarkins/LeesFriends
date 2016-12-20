import {Component} from "@angular/core";

@Component({
  selector: 'footer',
  styleUrls: ['footer.scss'],
  template: `
    <div class="footer container-fluid margin-top-lg padding-bottom-md free-of-charge">
      <div class="row font-size-md">
        All Services are Free of Charge
      </div>
    </div>
    <div class="footer container margin-top-md margin-bottom-md">
      <div class="row center-block font-size-md">
        <div class="pull-left address-phone">
            <div><i class="fa fa-map-marker" aria-hidden="true"></i> 7400 Hampton Boulevard, Room 201, Norfolk, VA. 23505</div>
            <div class="phone"><i class="fa fa-phone" aria-hidden="true"></i> <a href="mailto:7574407501">757-440-7501</a></div>
        </div>
        <div class="pull-right">
            <a [routerLink]="'./admin'">admin</a>            
        </div>
      </div>
    </div>
   
`
})
export class FooterComponent {

}
