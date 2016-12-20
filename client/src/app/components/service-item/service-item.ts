import {Input, Component} from "@angular/core";
import {Service} from "../../models/service";

@Component({
  selector: 'service-item',
  template: `
<div class="service-item">
  <div class="image-container margin-bottom-sm">
    <img alt="{{service.title}}" src="{{service.url}}" class="img-thumbnail" [fadeIn]/>
  </div>
  <h3>{{service.title}}</h3>
  <p>{{service.description}}</p>
</div>
`,
  styleUrls: [ '../../gunny-styles.scss', './service-item.scss']
})
export class ServiceItemComponent {
  @Input() service: Service;
}
