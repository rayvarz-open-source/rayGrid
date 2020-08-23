"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcFilter = exports.getFilterSchemaTypeName = exports.FilterSchemaType = void 0;
var FilterSchemaType;
(function (FilterSchemaType) {
    FilterSchemaType["LIKE"] = "like";
    FilterSchemaType["EQUAL_BY"] = "equalBy";
    FilterSchemaType["AND"] = "AND";
    FilterSchemaType["OR"] = "OR";
    FilterSchemaType["NOT_EQUAL_BY"] = "notEqualBy";
    FilterSchemaType["NOT_LIKE"] = "notLike";
    FilterSchemaType["LESS_THAN"] = "lessThan";
    FilterSchemaType["LESS_THAN_OR_EQUAL"] = "lessThanOrEqual";
    FilterSchemaType["GREATER_THAN"] = "greaterThan";
    FilterSchemaType["GREATER_THAN_OR_EQUAL"] = "greaterThanOrEqual";
})(FilterSchemaType = exports.FilterSchemaType || (exports.FilterSchemaType = {}));
function getFilterSchemaTypeName(type) {
    switch (type) {
        case FilterSchemaType.AND:
            return 'And';
        case FilterSchemaType.OR:
            return 'Or';
        case FilterSchemaType.EQUAL_BY:
            return 'Equal to';
        case FilterSchemaType.LIKE:
            return 'Similar to';
        case FilterSchemaType.NOT_EQUAL_BY:
            return 'Not equal to';
        case FilterSchemaType.NOT_LIKE:
            return 'Not similar to';
        case FilterSchemaType.LESS_THAN:
            return 'Less than';
        case FilterSchemaType.LESS_THAN_OR_EQUAL:
            return 'Less than or equal to';
        case FilterSchemaType.GREATER_THAN:
            return 'Greater than';
        case FilterSchemaType.GREATER_THAN_OR_EQUAL:
            return 'Greater than or equal to';
        default:
            return '';
    }
}
exports.getFilterSchemaTypeName = getFilterSchemaTypeName;
function funcFilter(name) {
    return name;
}
exports.funcFilter = funcFilter;
