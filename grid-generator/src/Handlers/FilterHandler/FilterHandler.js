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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterHandler = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var GridGenerator_1 = require("../../GridGenerator");
var Field_1 = require("../../Models/Field");
var FilterRowView_1 = __importDefault(require("./FilterRowView"));
exports.filterHandler = function (props, observables) {
    var componentOverride = observables.componentsOverride.pipe(operators_1.map(function (v) {
        return __assign(__assign({}, v), { FilterRow: FilterRowView_1.default });
    }));
    var localizationSnapshot;
    props.options.localization.subscribe(function (v) { return (localizationSnapshot = v); });
    var colDefinitionHandler = observables.columnDefinitions.pipe(operators_1.map(function (_a) {
        var cols = _a[0], schema = _a[1];
        var newCols = cols.map(function (col) {
            var field = col.fieldDefinition;
            var filters = schema.filters.filter(function (filter) { return filter.fieldName === field.fieldName; });
            var defaultFilter = filters.find(function (v) { return v.isDefault && v.fieldName === field.fieldName; });
            var canFilter = filters.length > 0 && defaultFilter != null;
            if (field.type.name === Field_1.FieldSchemaTypeName.List &&
                props.options.listFilterDataSource == null)
                canFilter = false;
            return __assign(__assign({}, col), { field: field.fieldName, filter: defaultFilter, dataSource: props.options.listFilterDataSource, filterPlaceholder: filters.length > 0 ? filters[0].fieldName : " ", filtering: canFilter, showListFilterModal: function (onSelect) {
                    var _a;
                    if (props.options.listFilterDataSource == null)
                        return;
                    var source = (_a = field.type.source) !== null && _a !== void 0 ? _a : defaultFilter === null || defaultFilter === void 0 ? void 0 : defaultFilter.source;
                    props.elements.listFilterModal.child(GridGenerator_1.GridGenerator({
                        dataSource: function (options) {
                            var _a, _b, _c, _d, _e;
                            if (props.options.listFilterDataSource == null)
                                throw new TypeError("options.listFilterDataSource does not have value.");
                            return props.options.listFilterDataSource(__assign(__assign({}, options), { url: (_a = source === null || source === void 0 ? void 0 : source.address) !== null && _a !== void 0 ? _a : "", filters: __spreadArrays(((_b = options.filters) !== null && _b !== void 0 ? _b : []), ((_c = source === null || source === void 0 ? void 0 : source.request.filters) !== null && _c !== void 0 ? _c : [])), sorts: __spreadArrays(((_d = options.sorts) !== null && _d !== void 0 ? _d : []), ((_e = source === null || source === void 0 ? void 0 : source.request.sorts) !== null && _e !== void 0 ? _e : [])) }));
                        },
                        options: {
                            listFilterDataSource: props.options.listFilterDataSource,
                            localization: props.options.localization,
                        },
                        controllers: {
                            customActionsController: new rxjs_1.BehaviorSubject([
                                {
                                    icon: "check",
                                    isFreeAction: false,
                                    tooltip: localizationSnapshot === null || localizationSnapshot === void 0 ? void 0 : localizationSnapshot.select,
                                    onClick: function (_event, model) {
                                        if (source == null)
                                            throw new TypeError("source");
                                        onSelect({
                                            key: model[source.keyFieldName],
                                            value: model[source.valueFieldName],
                                        });
                                        props.elements.listFilterModal.openContainer.next(false);
                                    },
                                },
                            ]),
                        },
                    }));
                    //
                    props.elements.listFilterModal.openContainer.next(true);
                } });
        });
        return [newCols, schema];
    }));
    return __assign(__assign({}, observables), { componentsOverride: componentOverride, columnDefinitions: colDefinitionHandler });
};
