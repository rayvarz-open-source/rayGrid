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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processResultValue = exports.remoteDataSourceHandler = void 0;
var rxjs_1 = require("rxjs");
var Filter_1 = require("../../Models/Filter");
var materialTableFilterToGridFilter_1 = require("../FilterHandler/materialTableFilterToGridFilter");
exports.remoteDataSourceHandler = function (props, observables) {
    if (typeof props.dataSource !== "function")
        return observables;
    // TODO: seprate filter and sort logic
    var isSelectionEnabled = false;
    props.options.enableSelection.subscribe(function (v) { return (isSelectionEnabled = v); });
    var dataSourceFunction = props.dataSource;
    var needSchema = true;
    var cachedPageSize = 0;
    var lastFilters = null;
    var dataSourceObservable = new rxjs_1.BehaviorSubject(function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var filters, needPageSize, requestFilters, result, proccessedResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filters = materialTableFilterToGridFilter_1.materialTableFilterToGridFilter(query.filters, props.controllers.schemaController.value);
                    if (query.search) {
                        filters.push({
                            fieldName: "ALL",
                            type: Filter_1.FilterSchemaType.LIKE,
                            value: query.search,
                        });
                    }
                    needPageSize = lastFilters == null || materialTableFilterToGridFilter_1.isFilterChanged(lastFilters, filters);
                    lastFilters = filters;
                    requestFilters = __spreadArrays(filters, props.controllers.advanceFiltersController.value);
                    return [4 /*yield*/, dataSourceFunction({
                            pageNo: query.page,
                            pageSize: query.pageSize,
                            needSchema: needSchema,
                            needPagination: needPageSize,
                            sorts: query.orderBy != null
                                ? [
                                    {
                                        fieldName: query.orderBy.field,
                                        type: query.orderDirection.toUpperCase(),
                                    },
                                ]
                                : null,
                            filters: requestFilters,
                        })];
                case 1:
                    result = _a.sent();
                    props.controllers.filtersController.next(requestFilters);
                    if (needSchema) {
                        needSchema = false;
                        props.controllers.schemaController.next(result.schema);
                        props.controllers.keyFieldName.next(result.schema.fields.filter(function (v) { return v.isKey; })[0].fieldName);
                    }
                    if (needPageSize) {
                        props.controllers.paginationController.next(result.pagination);
                        cachedPageSize = result.pagination.totalRow;
                    }
                    proccessedResult = processResultValue(result.value, props.controllers.schemaController.value);
                    props.controllers.currentPageDataController.next(proccessedResult);
                    return [2 /*return*/, {
                            data: proccessedResult.map(function (v) {
                                var mixin = {};
                                if (isSelectionEnabled) {
                                    mixin = __assign(__assign({}, mixin), { tableData: {
                                            checked: props.controllers.selectionController.value.filter(function (selected) {
                                                return selected[props.controllers.keyFieldName.value] ==
                                                    v[props.controllers.keyFieldName.value];
                                            }).length > 0,
                                        } });
                                }
                                return __assign(__assign({}, v), mixin);
                            }),
                            page: needPageSize ? 0 : query.page,
                            totalCount: cachedPageSize,
                        }];
            }
        });
    }); });
    return __assign(__assign({}, observables), { datasource: dataSourceObservable });
};
function processResultValue(originalItems, schema) {
    var items = __spreadArrays(originalItems);
    // handle refrence values, e.g: @barcode
    var refrenceNames = schema.fields.map(function (field) { return "@" + field.fieldName; });
    var hasRefrenceName = function (value) {
        for (var _i = 0, refrenceNames_1 = refrenceNames; _i < refrenceNames_1.length; _i++) {
            var refrenceName = refrenceNames_1[_i];
            if (value.includes(refrenceName))
                return true;
        }
        return false;
    };
    schema.fields.forEach(function (field) {
        if (field.type &&
            field.type.source &&
            typeof field.type.source.values === "string" &&
            hasRefrenceName(field.type.source.values)) {
            // change row data with refrence value
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var row = items_1[_i];
                var col = field.type.source.values + "";
                for (var _a = 0, refrenceNames_2 = refrenceNames; _a < refrenceNames_2.length; _a++) {
                    var refrenceName = refrenceNames_2[_a];
                    col = col.replace(refrenceName, row[refrenceName.substring(1)] + "");
                }
                row[field.fieldName] = col;
            }
        }
    });
    return items;
}
exports.processResultValue = processResultValue;
