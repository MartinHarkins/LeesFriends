import {Event} from "../../models/event";
import {Component, Input} from "@angular/core";
import * as moment from "moment";

@Component({
  selector: 'event-item',
  styles: [`
    .event-item {
        padding: 10px;
        padding-bottom: 5px;
    }
    
    // Styles needed to correct tinymce alignment
    /deep/ .content img[align="center"] {
          display: block;
          margin-left: auto;
          margin-right: auto;
    }
    /deep/ .content *[align="left"] {
        text-align: left;
    }
    /deep/ .content *[align="center"] {
        text-align: center;
    }
    /deep/ .content *[align="right"] {
        text-align: right;
    }
    /deep/ .content *[align="justify"] {
        text-align: justify;
    }
`],
  template: `
<div class="event-item">
  <h5><span *ngIf="!event.published" class="text-warning">DRAFT - </span>{{event.title}} - {{formattedDate}}</h5>
  <div class="content margin-top-sm" [innerHTML]="event.content"></div>
</div>`
})
export class EventItemComponent {
  @Input() event: Event;

  formattedDate: string;

  constructor() {
  }

  ngOnInit() {
    console.log('Event:', this.event);

    // TODO: export date format. (create date utils)
    this.formattedDate = moment(this.event.date).format('MM/DD/YYYY');
  }
}
