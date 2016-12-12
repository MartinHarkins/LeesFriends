import {AfterViewInit, Directive, forwardRef, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {DateModel} from "ng2-datepicker";

import * as moment from 'moment';

declare const tinymce: any;

//This is needed to update the tinymce editor when the model gets changed
const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TinymceEditorDirective),
  multi: true
};

@Directive({
  inputs: ['tinyEditor'],
  selector: '[tinyEditor]',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class TinymceEditorDirective implements AfterViewInit, ControlValueAccessor {
  private val: any = "";

  //selector string: Id of the host element
  @Input() selector: string;

  //All the options needed for tinymce editor
  private options = {
    plugins: [
      'link image code'
    ],
    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
    image_advtab: true
  };

  constructor() {
  }

  //registerOnChange, registerOnTouched, writeValue are methods need to be implemented for the interface ControlValueAccessor
  onChange = (_) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  //This method is called whenever model gets updated
  writeValue(value: any): void {
    this.val = value;

    //This check is necessary because, this method gets called before editor gets initialised. Hence undefined/null pointer exceptions gets thrown
    const selector = tinymce.get(this.selector);
    if (selector && value !== undefined && value !== null) {
      if (selector.getContent() !== value) {
        selector.setContent(value, {format: 'raw'});
      }
    }
  }

  //Update the component tree only when blur event happens. Otherwise following bug will occur.
  //Cursor position changes to 0 or the begining of the editor after every event.
  valueChange() {
    const currentContent = tinymce.activeEditor.getContent();

    // checking here because we're getting called twice: 'change' event and 'keyup' event
    if (this.val !== currentContent) {
      this.val = currentContent;
      this.onChange(this.val);
    }
  }

  ngAfterViewInit() {
    let that = this;
    let options: any = this.options;

    if (this.selector) {
      options['selector'] = '#' + this.selector;
    }
    else {
      options['selector'] = ".wysiwyg";
    }

    options['height'] = 100;
    options['schema'] = "html5";
    options['theme'] = "modern";

    //write the model value to tinymce editor once gets initialised. And track input and change events
    options['init_instance_callback'] = function (editor) {
      that.writeValue(that.val);

      editor.on('change', function (e) {
        console.log('testch');
        that.valueChange();
      });
      editor.on('keyup', function (e) {
        console.log('testke');
        that.valueChange();
      });
      editor.on('PastePostProcess', function (e) {
        console.log('testpp');
        that.valueChange();
      });
    };

    tinymce.init(options);
  }

  /**
   * Make sure to destroy the relevant editor
   */
  ngOnDestroy() {
    tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.selector);
  }

  /**
   * Build a {@link DateModel} from a js date object
   *
   * @param format
   * @param date
   * @returns {DateModel}
   */
  static buildDateModel(format: string, date: Date): DateModel {
    return TinymceEditorDirective.buildDateModelFromMoment(format, moment(date));
  }

  /**
   *  Build a date model from a moment date object
   *
   * @param format desired format
   * @param momentDate the moment date
   * @returns {DateModel}
   */
  static buildDateModelFromMoment(format: string, momentDate: any): DateModel {
    return new DateModel({
      day: momentDate.date() + '',
      month: momentDate.month() + '',
      year: momentDate.year() + '',
      momentObj: momentDate,
      formatted: momentDate.format(format)
    });
  }
}
