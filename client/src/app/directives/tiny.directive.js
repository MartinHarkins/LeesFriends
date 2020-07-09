"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinymceEditorDirective = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng2_datepicker_1 = require("ng2-datepicker");
var moment = require("moment");
//This is needed to update the tinymce editor when the model gets changed
var CUSTOM_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TinymceEditorDirective; }),
    multi: true
};
var TinymceEditorDirective = /** @class */ (function () {
    function TinymceEditorDirective() {
        this.val = "";
        //All the options needed for tinymce editor
        this.options = {
            plugins: [
                'link image code'
            ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            image_advtab: true,
            // Specify custom formats to fix alignment issues.
            'formats': {
                'alignleft': { 'selector': 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table', attributes: { "align": 'left' }, styles: { textAlign: 'left' } },
                'aligncenter': { 'selector': 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', attributes: { "align": 'center' }, styles: { display: 'block', margin: '0px auto', textAlign: 'center' } },
                'alignright': { 'selector': 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table', attributes: { "align": 'right' }, styles: { textAlign: 'right' } },
                'alignfull': { 'selector': 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table', attributes: { "align": 'justify' }, styles: { textAlign: 'justify' } }
            }
        };
        //registerOnChange, registerOnTouched, writeValue are methods need to be implemented for the interface ControlValueAccessor
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
    }
    TinymceEditorDirective_1 = TinymceEditorDirective;
    TinymceEditorDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TinymceEditorDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    //This method is called whenever model gets updated
    TinymceEditorDirective.prototype.writeValue = function (value) {
        this.val = value;
        //This check is necessary because, this method gets called before editor gets initialised. Hence undefined/null pointer exceptions gets thrown
        var selector = tinymce.get(this.selector);
        if (selector && value !== undefined && value !== null) {
            if (selector.getContent() !== value) {
                selector.setContent(value, { format: 'raw' });
            }
        }
    };
    //Update the component tree only when blur event happens. Otherwise following bug will occur.
    //Cursor position changes to 0 or the begining of the editor after every event.
    TinymceEditorDirective.prototype.valueChange = function () {
        var currentContent = tinymce.activeEditor.getContent();
        // checking here because we're getting called twice: 'change' event and 'keyup' event
        if (this.val !== currentContent) {
            this.val = currentContent;
            this.onChange(this.val);
        }
    };
    TinymceEditorDirective.prototype.ngAfterViewInit = function () {
        var that = this;
        var options = this.options;
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
    };
    /**
     * Make sure to destroy the relevant editor
     */
    TinymceEditorDirective.prototype.ngOnDestroy = function () {
        tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.selector);
    };
    /**
     * Build a {@link DateModel} from a js date object
     *
     * @param format
     * @param date
     * @returns {DateModel}
     */
    TinymceEditorDirective.buildDateModel = function (format, date) {
        return TinymceEditorDirective_1.buildDateModelFromMoment(format, moment(date));
    };
    /**
     *  Build a date model from a moment date object
     *
     * @param format desired format
     * @param momentDate the moment date
     * @returns {DateModel}
     */
    TinymceEditorDirective.buildDateModelFromMoment = function (format, momentDate) {
        return new ng2_datepicker_1.DateModel({
            day: momentDate.date() + '',
            month: momentDate.month() + '',
            year: momentDate.year() + '',
            momentObj: momentDate,
            formatted: momentDate.format(format)
        });
    };
    var TinymceEditorDirective_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TinymceEditorDirective.prototype, "selector", void 0);
    TinymceEditorDirective = TinymceEditorDirective_1 = __decorate([
        core_1.Directive({
            inputs: ['tinyEditor'],
            selector: '[tinyEditor]',
            providers: [CUSTOM_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [])
    ], TinymceEditorDirective);
    return TinymceEditorDirective;
}());
exports.TinymceEditorDirective = TinymceEditorDirective;
//# sourceMappingURL=tiny.directive.js.map