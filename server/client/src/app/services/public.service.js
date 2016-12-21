"use strict";
var core_1 = require("@angular/core");
var ng2_restangular_1 = require("ng2-restangular");
/**
 * Service used to interact with the public api
 */
var PublicService = (function () {
    function PublicService(restangular) {
        this.restangular = restangular;
    }
    /**
     * Retrieve the list of events by date
     *
     * @returns {Observable<Event[]>}
     */
    PublicService.prototype.getEventsByDateDesc = function () {
        // TODO: handle error
        // TODO: needs to send date sorting as a parameter.
        return this.restangular.all('public/events').getList();
    };
    PublicService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_restangular_1.Restangular])
    ], PublicService);
    return PublicService;
}());
exports.PublicService = PublicService;
//# sourceMappingURL=public.service.js.map