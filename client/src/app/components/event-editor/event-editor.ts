import {Event} from "../../models/event";
import {Component, EventEmitter, Output, Input, ChangeDetectorRef} from "@angular/core";
import {EventsService} from "../../services/events.service";
import {DatePickerOptions, DateModel} from "ng2-datepicker";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import * as moment from "moment";
import {Subscription} from "rxjs";

@Component({
  selector: 'event-editor',
  templateUrl: 'event-editor.html',
  styleUrls: ['./event-editor.scss']
})
export class EventEditorComponent {
  @Output() onEventAdded = new EventEmitter<Event>();
  @Output() onEventUpdated = new EventEmitter<Event>();
  @Output() onEditCancel = new EventEmitter<void>();

  @Input() event?: Event;
  dateModel: DateModel;

  eventEditForm: FormGroup;

  datepickerOptions: DatePickerOptions;
  editing = false;
  submitted = false;

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef, private service: EventsService) {
  }

  ngOnInit() {
    let d: any;
    if (this.event) {
      this.editing = true;
      d = moment(this.event.date);
    } else {
      this.event = new Event('', '', new Date());
      d = moment();
    }

    this.dateModel = new DateModel({
      day: d.date() + '',
      month: d.month() + '',
      year: d.year() + '',
      momentObj: d,
      formatted: d.format('MM/DD/YYYY')
    });

    this.datepickerOptions = new DatePickerOptions({
      format: 'MM/DD/YYYY'
    });

    this.buildForm();
  }

  valueChangeSubscription: Subscription;
  buildForm(): void {
    this.eventEditForm = this.fb.group({
      'title': [this.event.title, [Validators.required]],
      'date': [this.event.date, [Validators.required]],
      'content': [this.event.content, [Validators.required]]
    });

    this.valueChangeSubscription = this.eventEditForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any): void {
    if (!this.eventEditForm) return;
    const form = this.eventEditForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';

      const control = form.get(field);

      console.log(field, {value: control.value, dirty: control.dirty, valid: control.valid});

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

    console.log('detectChanges...');
    this.changeDetectorRef.detectChanges();
  }

  formErrors = {
    'title': '',
    'date': '',
    'content': ''
  };

  validationMessages = {
    'title': {
      'required': 'Name is required.'
    },
    'date': {
      'required': 'Power is required.'
    },
    'content': {
      'required': 'Content is required.'
    }
  };

  onSubmit(): void {
    this.event.date = this.dateModel.momentObj.toDate();

    if (!this.editing) {
      this.add(this.event);
    } else {
      this.update(this.event);
    }
  }

  private add(newEvent: Event): void {
    // TODO: handle errors
    this.service.addEvent(newEvent)
      .subscribe(() => this.onEventAdded.emit(newEvent));
  }

  private update(event: Event): void {
    this.service.updateEvent(event)
      .subscribe(updatedEvent => this.onEventUpdated.emit(updatedEvent),
        err => console.error('Error updating event', err));
  }

  get diagnostic(): string {
    return JSON.stringify(this.event);
  }

  onCancel() {
    // Needed to prevent onValueChanged() to be called anymore.
    // `this.changeDetectorRef.detectChanges();` crashes the dom if tinymce is destroyed when it's called.
    this.valueChangeSubscription.unsubscribe();

    this.onEditCancel.emit();
  }
}
