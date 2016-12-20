import {Component, EventEmitter, Output, Input, ChangeDetectorRef, OnInit, ElementRef} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {DatePickerOptions, DateModel} from "ng2-datepicker";
import {Event} from "../../models/event";
import {EventsService} from "../../services/events.service";
import {TinymceEditorDirective} from "../../directives/tiny.directive";
import * as _ from "lodash";
import {HasChanges} from "../../core/has-changes.interface";
import {RxUtils} from "../../core/utils/RxUtils";

@Component({
  selector: 'event-editor',
  templateUrl: 'event-editor.html',
  styleUrls: ['./event-editor.scss']
})
export class EventEditorComponent implements OnInit, HasChanges {
  @Output() onEventAdded = new EventEmitter<Event>();
  @Output() onEventUpdated = new EventEmitter<Event>();
  @Output() onEditCancel = new EventEmitter<void>();

  @Input() event?: Event;

  private originalEvent: Event;

  eventEditForm: FormGroup;

  // Date wrapper used by ng2-datepicker
  tinyDateModel: DateModel;
  datepickerOptions: DatePickerOptions;

  private message: string;

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

    // Clone object in order to check for changes later.
    this.originalEvent = Event.clone(this.event);

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

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

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

    if (newEvent.published) {
      this.message = 'Saving draft ...';
    } else {
      this.message = 'Publishing event ...';
    }

    // TODO: handle errors
    RxUtils.ensureMinDuration(this.service.addEvent(newEvent), 1000)
      .subscribe(() => {
        this.onEventAdded.emit(newEvent);

        // Clear the form
        that.event = null;
        that.reset();
      }, err => {
        console.error('Error adding event', err);
        this.message = 'Sorry, we could not save the event.';
      });
  }

  /**
   * Send the updated event
   *
   * @param event the updated event
   */
  private update(event: Event): void {
    this.message = 'Updating event ...';

    // TODO: handle errors properly
    RxUtils.ensureMinDuration(this.service.updateEvent(event), 1000)
      .subscribe(updatedEvent => this.onEventUpdated.emit(updatedEvent),
        err => {
          console.error('Error updating event', err);
          this.message = 'Sorry, we could not update the event.';
        });
  }

  hasChanges(): boolean {
    return !(_.isEqual(this.originalEvent.title, this.event.title)
    && _.isEqual(this.originalEvent.date, this.event.date)
    && _.isEqual(this.originalEvent.content, this.event.title));

  }
}
