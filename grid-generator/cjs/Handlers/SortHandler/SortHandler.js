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
exports.sortHandler = void 0;
var operators_1 = require("rxjs/operators");
var Sort_1 = require("../../Models/Sort");
exports.sortHandler = function (_props, observables) {
    var colDefinitionHandler = observables.columnDefinitions.pipe(operators_1.map(function (_a) {
        var cols = _a[0], schema = _a[1];
        var newCols = cols.map(function (col) {
            var field = col.fieldDefinition;
            var sorts = schema.sorts.filter(function (sort) {
                return sort.fieldName == field.fieldName && sort.type == Sort_1.SortSchemaType.All;
            });
            return __assign(__assign({}, col), { sorting: sorts.length > 0 });
        });
        return [newCols, schema];
    }));
    return __assign(__assign({}, observables), { columnDefinitions: colDefinitionHandler });
};
