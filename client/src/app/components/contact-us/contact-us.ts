import {Component, OnInit} from "@angular/core";

class LatLng {
  constructor(public lat: number, public lng: number) {
  }
}

@Component({
  selector: 'contact-us',
  templateUrl: 'contact-us.html',
  styles: [`
   .sebm-google-map-container {
     height: 300px;
     color: black;
   }
  `]
})
export class ContactUsComponent implements OnInit {
  coords: LatLng;

  constructor() {
  }

  ngOnInit() {
    this.coords = new LatLng(36.912586, -76.305237);
  }
}
