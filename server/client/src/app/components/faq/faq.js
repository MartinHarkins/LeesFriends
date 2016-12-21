"use strict";
var core_1 = require("@angular/core");
/**
 * Created by mharkins on 12/13/16.
 */
var FaqItem = (function () {
    function FaqItem(question, answer) {
        this.question = question;
        this.answer = answer;
    }
    return FaqItem;
}());
var FaqComponent = (function () {
    function FaqComponent() {
    }
    FaqComponent.prototype.ngOnInit = function () {
        this.faqItems = [{
                question: 'WHAT IS LEE’S FRIENDS?',
                answer: 'LEE’S FRIENDS is a support program for cancer patients and their families located in South Hampton Roads Virginia. LEE’S FRIENDS offers person-to-person help and needed emotional and practical support to cancer patients and their families who are facing the crises of diagnosis and treatment of cancer.'
            }, {
                question: 'WHO IS ELIGIBLE FOR SERVICES?',
                answer: 'LEE’S FRIENDS offers support to any cancer patient and any family member of a cancer patient who lives in the South Hampton Roads area of Virginia.'
            }, {
                question: 'WHAT SERVICES DOES LEE’S FRIENDS PROVIDE?',
                answer: "<p>One-on-One Emotional Support \u2013 LEE\u2019S FRIENDS unique person-to-person emotional support is the hallmark or our organization. The cancer patient and his or her family may be suddenly faced with a host of emotional traumas. LEE\u2019S FRIENDS provides trained, caring volunteers to help in such times of trouble. A sympathetic listener, a place to turn for advice, a moment of cheer and supportiveness, a friendly face and a caring attitude can do much to tell patients and their families \"You are not alone!\"</p>\n\n    <p>Transportation \u2013 Patients, many who are weak and in pain, may spend long hard hours getting to and from doctors\u2019 offices, laboratories, radiation oncology centers, and hospitals for treatments. LEE\u2019S FRIENDS two vehicles and volunteer drivers, who often use their own cars, provide patients with needed transportation.</p>\n\n      <p>Emergency Humanitarian Grants \u2013 Many patients undergoing cancer treatments are hard pressed to meet their financial obligations or provide such basic necessities as food and clothing. In cases of documented hardship, LEE\u2019S FRIENDS provides a one-time financial grant to a needy family or individual.</p>"
            }, {
                question: 'HOW CAN I GET A ONE-ON-ONE LEE’S FRIENDS VOLUNTEER?',
                answer: 'If you are a cancer patient or the family member of a cancer patient call the LEE’S FRIENDS office at (757) 440-7501 or e-mail Susan Lawler slawler@leesfriends.org'
            }, {
                question: 'WHO IS ELIGIBLE TO RIDE WITH LEE’S FRIENDS?',
                answer: 'Any ambulatory cancer patient who needs transportation to and from a doctors’ appointment or treatment facility is available to be transported. As long as the patient can walk by his or herself, you can get transportation from LEE’S FRIENDS.'
            }, {
                question: 'WHAT IS THE COST OF RIDING WITH LEE’S FRIENDS?',
                answer: 'Nothing. All our services are FREE.'
            }, {
                question: 'WHAT ARE THE HOURS OF THE TRANSPORTATION SERVICES?',
                answer: 'Our transportation program runs Monday through Friday. The first appointment time that we take is 9:00 a.m. and the last appointment of each day is 2:00 p.m. Return transportation is provided for all rides.'
            }, {
                question: 'HOW DO I ARRANGE TRANSPORTATION WITH LEE’S FRIENDS?',
                answer: 'Simply call the LEE’S FRIENDS office at (757) 440-7501. Calls must be received at least 24 hours in advance. It is HIGHLY RECOMMENDED that requests for transportation are made as far in advance of your appointment time as possible. The LEE’S FRIENDS transportation schedule fills up quickly. Have the following information available when you call to arrange a ride: your appointment time, your doctor’s name and the office address of your appointment/treatment.'
            }, {
                question: 'HOW DO I APPLY FOR A LEE’S FRIENDS HUMANITARIAN GRANT?',
                answer: 'Call the LEE’S FRIENDS office at (757) 440-7501 and speak with Assistant Director, Becky Ruffin. Each request for a grant is handled on a case-by-case basis. Financial hardship must be documented.'
            }, {
                question: 'DOES LEE’S FRIENDS HAVE ANY MEDICAL EQUIPMENT FOR CANCER PATIENTS?',
                answer: 'LEE’S FRIENDS has walkers, wheelchairs, potty chairs and shower seats for cancer patients. These are offered to cancer patients free of charge and are available for pick-up at the LEE’S FRIENDS offices at 7400 Hampton Blvd, Room 201, Norfolk 23505. Call the office to arrange a time for pick up of equipment.'
            }, {
                question: 'DOES LEE’S FRIENDS HAVE ANY WRITTEN INFORMATION ON CANCER?',
                answer: 'Yes, LEE’S FRIENDS has an extensive resource center filled with disease-specific printed materials. Our resource center also has brochures covering issues that are helpful to cancer patients such as other community resources, cookbook pamphlets and estate planning. All are available, free of charge, by either calling the office or emailing slawler@leesfriends.org. All materials are free of charge. LEE’S FRIENDS also maintains an extensive "lending library" of books and cassettes covering all aspects of cancer care.'
            }, {
                question: 'HOW CAN I BECOME A VOLUNTEER AT LEE’S FRIENDS?',
                answer: 'Contact our Patient/Volunteer Coordinator, Susan Lawler, at 757-440-7501 or e-mail slawler@leesfriends.org. All candidates to become a volunteer are required to have an interview with Susan and provide three personal references. If you are interested in driving you must have a good driving record. To become a one-on-one volunteer you must complete the LEE’S FRIENDS Volunteer Training Course.'
            }, {
                question: 'HOW CAN I MAKE A DONATION TO LEE’S FRIENDS?',
                answer: 'To make a financial contribution or memorial/honorary gift, make a check payable to LEE’S FRIENDS and mail it to LEE’S FRIENDS, 7400 Hampton Blvd, Room 201, Norfolk, VA 23505.'
            }, {
                question: 'HOW DO I CONTACT LEE’S FRIENDS?',
                answer: 'The office at LEE’S FRIENDS is located at 7400 Hampton Blvd, Room 201, Norfolk 23505. Our office hours are Monday – Friday, 9:30 a.m. until 2:00 p.m. Our phone number is 757-440-7501. LEE’S FRIENDS email address is volunteer@leesfriends.org.'
            }];
    };
    FaqComponent = __decorate([
        core_1.Component({
            selector: 'faq',
            template: "\n<div class=\"container\">\n  <div class=\"row\">\n      <h2 *ngFor=\"let faqItem of faqItems; let i = index\">\n        <a href=\"#{{'faqItem' + i}}\" pageScroll [pageScrollDuration]=\"200\">\n            {{faqItem.question}}\n        </a>\n      </h2>\n      \n      <div *ngFor=\"let faqItem of faqItems; let i = index\" id=\"{{'faqItem' + i}}\">\n        <h1>{{faqItem.question}}</h1>\n        <p>{{faqItem.answer}}</p>\n      </div>\"\n  </div>\n</div>"
        }), 
        __metadata('design:paramtypes', [])
    ], FaqComponent);
    return FaqComponent;
}());
exports.FaqComponent = FaqComponent;
//# sourceMappingURL=faq.js.map