"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialTableFilterToGridFilter = exports.isFilterChanged = void 0;
var Field_1 = require("../../Models/Field");
function isFilterChanged(oldFilters, newFilters) {
    if (oldFilters.length != newFilters.length)
        return true;
    var _loop_1 = function (filter) {
        if (oldFilters.filter(function (v) { return v.fieldName === filter.fieldName && v.type === filter.type && v.value === filter.value; })
            .length === 0)
            return { value: true };
    };
    for (var _i = 0, newFilters_1 = newFilters; _i < newFilters_1.length; _i++) {
        var filter = newFilters_1[_i];
        var state_1 = _loop_1(filter);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return false;
}
exports.isFilterChanged = isFilterChanged;
function materialTableFilterToGridFilter(filters, schema) {
    return filters
        .filter(function (v) { return v.value != null; })
        .map(function (filter) {
        var fieldName = filter.column.field;
        var field = schema.fields.find(function (field) { return field.fieldName == fieldName; });
        if (field == null)
            throw new TypeError("Cannot find a field with field name of " + fieldName + " in schema");
        var filterDef = schema.filters.find(function (filter) { return filter.isDefault && filter.fieldName === field.fieldName; });
        if (filterDef == null)
            throw new TypeError("Cannot find a default filter with field name of " + field.fieldName);
        var value = null;
        if (field.type.name == Field_1.FieldSchemaTypeName.Int && !isNaN(filter.value))
            value = parseInt(filter.value);
        else if (field.type.name == Field_1.FieldSchemaTypeName.Bit)
            value = filter.value === 'checked';
        else
            value = filter.value;
        return {
            fieldName: filterDef.fieldName,
            type: filterDef.type,
            value: value,
        };
    });
}
exports.materialTableFilterToGridFilter = materialTableFilterToGridFilter;
