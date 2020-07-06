"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxUtils = void 0;
var rxjs_1 = require("rxjs");
var RxUtils = /** @class */ (function () {
    function RxUtils() {
    }
    /**
     * Delay the output of a source observable
     * <p>
     *     This is to prevent events occurring too fast, causing glitch looking changes in the UI (too fast for human to see)
     * </p>
     * @param obs the source observable
     * @param minDuration the duration in milliseconds
     * @returns {Observable<T>} an observable emitting the same output as the source
     */
    RxUtils.ensureMinDuration = function (obs, minDuration) {
        return rxjs_1.Observable.zip(obs, rxjs_1.Observable.timer(minDuration))
            .map(function (vals) { return vals[0]; });
    };
    return RxUtils;
}());
exports.RxUtils = RxUtils;
//# sourceMappingURL=RxUtils.js.map