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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customActionHandler = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CustomActionPosition_1 = require("./CustomActionPosition");
exports.customActionHandler = function (props, observables) {
    var actions = rxjs_1.combineLatest(props.options.customActionsPosition, props.controllers.customActionsController, observables.actionDefinitions).pipe(operators_1.map(function (_a) {
        var position = _a[0], customActions = _a[1], currentActions = _a[2];
        if (position === CustomActionPosition_1.CustomActionPosition.End)
            return __spreadArrays(currentActions, customActions);
        return __spreadArrays(customActions, currentActions);
    }));
    return __assign(__assign({}, observables), { actionDefinitions: actions });
};
