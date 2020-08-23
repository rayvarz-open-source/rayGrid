"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableLocalizationHandler = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.tableLocalizationHandler = function (props, observables) {
    var localization = rxjs_1.combineLatest(props.options.localization, observables.localizationDefinition).pipe(operators_1.map(function (_a) {
        var option = _a[0], def = _a[1];
        return __assign(__assign({}, def), option.materialTable);
    }));
    return __assign(__assign({}, observables), { localizationDefinition: localization });
};
