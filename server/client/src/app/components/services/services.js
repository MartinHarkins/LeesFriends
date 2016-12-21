"use strict";
var core_1 = require("@angular/core");
var ServicesComponent = (function () {
    function ServicesComponent() {
    }
    ServicesComponent.prototype.ngOnInit = function () {
        this.transportationService = {
            url: 'assets/images/services/transportation.jpg',
            title: 'Transportation',
            description: 'Patients, many of whom are weak and in pain, may spend long, hard hours getting to and from doctor’s offices, laboratories, radiation oncology centers, and hospitals for treatments. Our two vehicles and volunteer drivers, who often use their own cars, provide patients with needed transportation.'
        };
        this.oneOnOneService = {
            url: 'assets/images/services/one-on-one.jpg',
            title: 'One on One',
            description: 'We offer person to person help and needed emotional and practical help to cancer patients and their families who are facing the crisis of diagnosis and treatment of cancer. The patient and their family may be suddenly faced with a host of emotional traumas. We provide trained, caring volunteers to help in such time of trouble. A sympathetic listener, a place to turn for advice, a moment of cheer and supportiveness, a friendly face and a caring attitude can do much to tell patients and their families, "You are not alone!" This program is what separates us from other health-care support organizations, our one-on-one support is the hallmark of this special organization.'
        };
        this.basicsService = {
            url: 'assets/images/services/basics.jpg',
            title: 'Basic Medical Supplies',
            description: 'Many patients undergoing cancer treatments are hard pressed for even such basic necessities as food and clothing. In case of hardships, we help coordinate services that meet basic human needs.'
        };
        console.log('created transportationService');
    };
    ServicesComponent = __decorate([
        core_1.Component({
            selector: 'services',
            styleUrls: ['../../gunny-styles.scss'],
            templateUrl: './services.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ServicesComponent);
    return ServicesComponent;
}());
exports.ServicesComponent = ServicesComponent;
//# sourceMappingURL=services.js.map