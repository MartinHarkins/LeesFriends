import {Component, EventEmitter, Output, Input, ChangeDetectorRef, OnInit, ElementRef} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

import {DatePickerOptions, DateModel} from "ng2-datepicker";
import * as moment from "moment";

import {Event} from "../../models/event";
import {EventsService} from "../../services/events.service";
import {TinymceEditorDirective} from "../../directives/tiny.directive";
import * as _ from 'lodash'

@Component({
  selector: 'event-editor',
  templateUrl: 'event-editor.html',
  styleUrls: ['./event-editor.scss']
})
export class EventEditorComponent implements OnInit {
  @Output() onEventAdded = new EventEmitter<Event>();
  @Output() onEventUpdated = new EventEmitter<Event>();
  @Output() onEditCancel = new EventEmitter<void>();

  @Input() event?: Event;

  eventEditForm: FormGroup;

  // Date wrapper used by ng2-datepicker
  tinyDateModel: DateModel;

  datepickerOptions: DatePickerOptions;

  isEditing = false;

  // TODO: extract
  DATE_FORMAT = 'MM/DD/YYYY';

  constructor(private fb: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private service: EventsService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    // Initialize date picker
    this.datepickerOptions = new DatePickerOptions({
      format: this.DATE_FORMAT
    });

    this.reset();
  }

  ngAfterViewInit() {
    // enable on of date field to open picker
    const hostElem = this.elementRef.nativeElement;

    const dateInput = hostElem.querySelector('.datepicker-input');
    const dateIcon = hostElem.querySelector('.datepicker-input-icon');

    dateInput.addEventListener('click', () => dateIcon.click());
    dateInput.addEventListener('keypress', event => event.preventDefault());
  }

  /**
   * Reset the form
   */
  reset() {
    // If we have an existing `event`, toggle edit state.
    if (this.event) {
      this.isEditing = true;
    } else {
      this.isEditing = false;
      this.event = new Event('', '', new Date());
    }

    this.tinyDateModel = TinymceEditorDirective.buildDateModel(this.DATE_FORMAT, this.event.date);

    this.buildForm();
  }

  // Needed to stop callbacks coming upon destroy.
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
    // Purposefully redetecting changes after the `onValueChanged` is called.
    // Reason:
    //  when the tinymce editor removes itself,
    //  the form considers it a value change,
    //  and `onValueChanged` is called at a time when the actual editor is already destroyed.
    //  > Crash
    this.changeDetectorRef.detectChanges();
  }

  formErrors = {
    'title': '',
    'date': '',
    'content': ''
  };

  validationMessages = {
    'title': {
      'required': 'Set a title for the event.'
    },
    'date': {
      'required': 'Set a date for the event.'
    },
    'content': {
      'required': 'Set a content for the event.'
    }
  };

  /**
   * Called when the form is submitted
   */
  onSaveDraft(): void {
    // Update event model
    _.assignIn(this.event, {
      date: this.tinyDateModel.momentObj.toDate(),
      published: false
    });

    if (!this.isEditing) {
      this.add(this.event);
    } else {
      this.update(this.event);
    }
  }

  onPublish(): void {
    // Update event model
    _.assignIn(this.event, {
      date: this.tinyDateModel.momentObj.toDate(),
      published: true
    });

    if (!this.isEditing) {
      this.add(this.event);
    } else {
      this.update(this.event);
    }
  }

  /**
   * Called when the use cancels
   */
  onCancel(): void {
    // Needed to prevent onValueChanged() to be called anymore.
    // `this.changeDetectorRef.detectChanges();` crashes the dom if tinymce is destroyed when it's called.
    this.valueChangeSubscription.unsubscribe();

    this.onEditCancel.emit();
  }

  /**
   * Send new event to backend
   *
   * @param newEvent the new event model
   */
  private add(newEvent: Event): void {
    const that = this;
    // TODO: handle errors
    this.service.addEvent(newEvent)
      .subscribe(() => {
        this.onEventAdded.emit(newEvent);

        // Clear the form
        that.event = null;
        that.reset();
      });
  }

  /**
   * Send the updated event
   *
   * @param event the updated event
   */
  private update(event: Event): void {
    // TODO: handle errors properly
    this.service.updateEvent(event)
      .subscribe(updatedEvent => this.onEventUpdated.emit(updatedEvent),
        err => console.error('Error updating event', err));
  }
}
