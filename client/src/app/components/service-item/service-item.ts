import {Input, Component} from "@angular/core";
import {Service} from "../../models/service";

@Component({
  selector: 'service-item',
  templateUrl: './service-item.html',
  styleUrls: [ '../../gunny-styles.scss', './service-item.scss']
})
export class ServiceItemComponent {
  @Input() service: Service;
}
