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
exports.exportHandler = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Field_1 = require("../../Models/Field");
function isExportable(field) {
    return (field.type.name != Field_1.FieldSchemaTypeName.Image &&
        field.type.name != Field_1.FieldSchemaTypeName.ImageList &&
        field.isVisible);
}
exports.exportHandler = function (props, observables) {
    var optionsObservable = rxjs_1.combineLatest(observables.gridOptions, props.options.noExport).pipe(operators_1.map(function (_a) {
        var options = _a[0], noExport = _a[1];
        return __assign(__assign({}, options), { exportButton: !noExport });
    }));
    var colDefinitionHandler = observables.columnDefinitions.pipe(operators_1.map(function (_a) {
        var cols = _a[0], schema = _a[1];
        var newCols = cols.map(function (col) {
            var field = col.fieldDefinition;
            return __assign(__assign({}, col), { export: isExportable(field) });
        });
        return [newCols, schema];
    }));
    return __assign(__assign({}, observables), { columnDefinitions: colDefinitionHandler, gridOptions: optionsObservable });
};
