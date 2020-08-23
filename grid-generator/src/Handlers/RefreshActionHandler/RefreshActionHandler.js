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
exports.refreshActionHandler = void 0;
var operators_1 = require("rxjs/operators");
var Commands_1 = require("../CommandHandler/Commands");
var rxjs_1 = require("rxjs");
exports.refreshActionHandler = function (props, observables) {
    var localization;
    props.options.localization.subscribe(function (v) { return (localization = v); });
    var actions = rxjs_1.combineLatest(observables.actionDefinitions, props.options.noRefresh).pipe(operators_1.map(function (_a) {
        var actions = _a[0], isNoRefresh = _a[1];
        if (isNoRefresh)
            return actions;
        return __spreadArrays(actions, [
            {
                icon: 'refresh',
                isFreeAction: true,
                tooltip: localization.refresh,
                onClick: function () { return props.controllers.commandController.next(Commands_1.GridCommands.refresh); },
            },
        ]);
    }));
    return __assign(__assign({}, observables), { actionDefinitions: actions });
};
