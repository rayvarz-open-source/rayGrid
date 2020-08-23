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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineEditHandler = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Field_1 = require("../../Models/Field");
var InlineEditRowView_1 = __importDefault(require("./InlineEditRowView"));
exports.inlineEditHandler = function (props, observables) {
    if (props.options.inlineEditCallBack == null)
        return observables;
    var rowActionDefinitionObservable = observables.rowActionDefinitions.pipe(operators_1.map(function (v) {
        return __assign(__assign({}, v), { isEditable: function (_data) { return props.options.inlineEditCallBack != null; }, onRowUpdate: props.options.inlineEditCallBack == null
                ? undefined
                : function (oldData, newData) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (props.options.inlineEditCallBack == null)
                                    throw new TypeError("options.inlineEditCallBack cannot be null");
                                return [4 /*yield*/, props.options.inlineEditCallBack(oldData, newData)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } });
    }));
    var onRowClick = new rxjs_1.BehaviorSubject(function (_event, data, _hd) {
        if (props.elements.grid.tableRef == null)
            return;
        props.elements.grid.tableRef.dataManager.changeRowEditing(data, "update");
        props.elements.grid.tableRef.setState(__assign(__assign({}, props.elements.grid.tableRef.dataManager.getRenderState()), { showAddRow: false }));
    });
    var componentOverride = observables.componentsOverride.pipe(operators_1.map(function (v) {
        return __assign(__assign({}, v), { EditRow: InlineEditRowView_1.default });
    }));
    var colDefinitionHandler = rxjs_1.combineLatest(props.controllers.hideColumnModalHiddenFieldsController, observables.columnDefinitions).pipe(operators_1.map(function (_a) {
        var _hiddenFields = _a[0], _b = _a[1], cols = _b[0], schema = _b[1];
        var newCols = cols.map(function (col) {
            var field = col.fieldDefinition;
            var isEditable = field.isEditable
                ? "always"
                : "never";
            if (![
                Field_1.FieldSchemaTypeName.List,
                Field_1.FieldSchemaTypeName.LocalList,
                Field_1.FieldSchemaTypeName.Bit,
                Field_1.FieldSchemaTypeName.String,
                Field_1.FieldSchemaTypeName.Int,
                Field_1.FieldSchemaTypeName.Money,
            ].includes(field.type.name))
                isEditable = "never";
            return __assign(__assign({}, col), { editable: isEditable });
        });
        return [newCols, schema];
    }));
    return __assign(__assign({}, observables), { rowActionDefinitions: rowActionDefinitionObservable, onRowClick: onRowClick, componentsOverride: componentOverride, columnDefinitions: colDefinitionHandler });
};
