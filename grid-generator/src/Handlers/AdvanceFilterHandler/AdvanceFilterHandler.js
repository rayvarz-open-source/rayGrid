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
exports.advanceFilterHandler = void 0;
var operators_1 = require("rxjs/operators");
var Commands_1 = require("../CommandHandler/Commands");
exports.advanceFilterHandler = function (props, observables) {
    if (typeof props.dataSource !== 'function')
        return observables;
    var localization;
    props.options.localization.subscribe(function (v) { return (localization = v); });
    var openAdvanceFilter = function () {
        props.controllers.advanceFilterContentPropsController.next({
            currentFilters: JSON.parse(JSON.stringify(props.controllers.advanceFiltersController.value)),
            schema: props.controllers.schemaController.value,
            localization: localization.advanceFilter,
            onApply: function (filters) {
                props.controllers.advanceFiltersController.next(filters);
                props.controllers.advanceFilterOpenController.next(false);
                props.controllers.commandController.next(Commands_1.GridCommands.setCurrentPage(0));
                props.controllers.commandController.next(Commands_1.GridCommands.refresh);
            },
            onCancel: function () { return props.controllers.advanceFilterOpenController.next(false); },
        });
        props.controllers.advanceFilterOpenController.next(true);
    };
    var actions = observables.actionDefinitions.pipe(operators_1.map(function (v) {
        return __spreadArrays(v, [
            {
                icon: 'filter_list',
                isFreeAction: true,
                tooltip: localization.advanceFilter.actionTooltip,
                onClick: function (_event, _data) { return openAdvanceFilter(); },
            },
        ]);
    }));
    return __assign(__assign({}, observables), { actionDefinitions: actions });
};
