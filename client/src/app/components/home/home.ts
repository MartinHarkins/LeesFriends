import {Component} from "@angular/core";

@Component({
  selector: 'home',
  template: '<our-mission></our-mission>'
})
export class HomeComponent {
  constructor() {}

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
