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
exports.columnDefinitionHandler = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.columnDefinitionHandler = function (props, observables) {
    var colDefinitionHandler = rxjs_1.combineLatest(props.controllers.hideColumnModalHiddenFieldsController, observables.columnDefinitions).pipe(operators_1.map(function (_a) {
        var hiddenFields = _a[0], _b = _a[1], _ = _b[0], schema = _b[1];
        var cols = schema.fields
            .filter(function (field) {
            return field.isVisible &&
                field.type != null &&
                !hiddenFields.includes(field.fieldName);
        })
            .sort(function (current, next) { return next.order - current.order; })
            .reverse()
            .map(function (field) {
            return {
                title: field.title,
                fieldDefinition: field,
                field: field.fieldName,
            };
        });
        return [cols, schema];
    }));
    return __assign(__assign({}, observables), { columnDefinitions: colDefinitionHandler });
};
