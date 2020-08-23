"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
var jalaali_1 = __importDefault(require("@date-io/jalaali"));
var moment_1 = __importDefault(require("@date-io/moment"));
var core_1 = require("@material-ui/core");
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var Input_1 = __importDefault(require("@material-ui/core/Input"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var Select_1 = __importDefault(require("@material-ui/core/Select"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var pickers_1 = require("@material-ui/pickers");
var moment_jalaali_1 = __importDefault(require("moment-jalaali"));
var React = __importStar(require("react"));
var Field_1 = require("../../Models/Field");
moment_jalaali_1.default.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });
function RemoteLookupFilter(_a) {
    var columnDef = _a.columnDef, onFilterChanged = _a.onFilterChanged;
    var _b = React.useState(''), value = _b[0], setValue = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Tooltip, { title: columnDef.filter.filterName || '' },
            React.createElement(core_1.FormControl, { style: { minWidth: 180 } },
                React.createElement(Input_1.default, { value: value, disabled: true, endAdornment: value != '' ? (React.createElement(core_1.InputAdornment, { position: "end" },
                        React.createElement(core_1.IconButton, { onClick: function () {
                                setValue('');
                                onFilterChanged(columnDef.tableData.id, null);
                            } },
                            React.createElement(core_1.Icon, null, "close")))) : undefined, startAdornment: React.createElement(core_1.InputAdornment, { position: "start" },
                        React.createElement(core_1.IconButton, { onClick: function () {
                                columnDef.showListFilterModal(function (model) {
                                    setValue(model.value);
                                    onFilterChanged(columnDef.tableData.id, model.key);
                                });
                            } },
                            React.createElement(core_1.Icon, null, "menu"))) })))));
}
var CustomFilterRowView = /** @class */ (function (_super) {
    __extends(CustomFilterRowView, _super);
    function CustomFilterRowView(props) {
        var _this = _super.call(this, props) || this;
        _this.renderRemoteLookupFilter = function (columnDef) {
            var field = columnDef.fieldDefinition;
            return React.createElement(RemoteLookupFilter, { field: field, columnDef: columnDef, onFilterChanged: _this.props.onFilterChanged });
        };
        _this.renderLocalLookupFilter = function (columnDef) {
            var filter = columnDef.fieldDefinition;
            var source = filter.type.source;
            var view = (React.createElement(core_1.Tooltip, { title: columnDef.filter.filterName || '' },
                React.createElement(core_1.FormControl, null,
                    React.createElement(Select_1.default, { value: columnDef.tableData.filterValue == null ? '' : columnDef.tableData.filterValue, onChange: function (event) { return _this.props.onFilterChanged(columnDef.tableData.id, event.target.value); }, input: React.createElement(Input_1.default, null) },
                        React.createElement(MenuItem_1.default, { value: undefined },
                            React.createElement("em", null, "-")), source === null || source === void 0 ? void 0 :
                        source.values.map(function (v) { return (React.createElement(MenuItem_1.default, { key: v[source.keyFieldName], value: v[source.keyFieldName] }, v[source.valueFieldName])); })))));
            return view;
        };
        _this.renderBooleanFilter = function (columnDef) { return (React.createElement(core_1.FormControlLabel, { control: React.createElement(Checkbox_1.default, { indeterminate: columnDef.tableData.filterValue === undefined, checked: columnDef.tableData.filterValue === 'checked', onChange: function () {
                    var val;
                    if (columnDef.tableData.filterValue === undefined) {
                        val = 'checked';
                    }
                    else if (columnDef.tableData.filterValue === 'checked') {
                        val = 'unchecked';
                    }
                    _this.props.onFilterChanged(columnDef.tableData.id, val);
                } }), label: columnDef.fieldDefinition.fieldName })); };
        _this.renderDefaultFilter = function (columnDef) {
            if (columnDef.filter == null)
                return null;
            var fieldType = columnDef.fieldDefinition.type.name;
            var isNumeric = fieldType === Field_1.FieldSchemaTypeName.Money || fieldType === Field_1.FieldSchemaTypeName.Int;
            return (React.createElement(core_1.Tooltip, { title: columnDef.filter.filterName || '' },
                React.createElement(TextField_1.default, { style: isNumeric ? { float: 'right' } : {}, type: isNumeric ? 'number' : 'text', value: columnDef.tableData.filterValue || '', onChange: function (event) {
                        _this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
                    } })));
        };
        _this.renderDateTypeFilter = function (columnDef) {
            if (columnDef.filter == null)
                return null;
            var field = columnDef.fieldDefinition;
            var onDateInputChange = function (date) { return _this.props.onFilterChanged(columnDef.tableData.id, date); };
            var value = columnDef.tableData.filterValue || null;
            return (React.createElement(pickers_1.MuiPickersUtilsProvider, { utils: field.type.name === Field_1.FieldSchemaTypeName.GregorianDateTime ? moment_1.default : jalaali_1.default },
                React.createElement(core_1.Tooltip, { title: columnDef.filter.filterName || '' },
                    React.createElement(pickers_1.DatePicker, { format: field.type.name === Field_1.FieldSchemaTypeName.GregorianDateTime ? 'YYYY/MM/DD' : 'jYYYY/jM/jD', style: { minWidth: 80 }, value: value, onChange: onDateInputChange, clearable: true }))));
        };
        return _this;
    }
    CustomFilterRowView.prototype.getComponentForColumn = function (columnDef) {
        if (columnDef.filter == null)
            return null;
        var field = columnDef.fieldDefinition;
        if (columnDef.filtering === false) {
            return null;
        }
        switch (field.type.name) {
            case Field_1.FieldSchemaTypeName.Bit:
                return this.renderBooleanFilter(columnDef);
            case Field_1.FieldSchemaTypeName.GregorianDateTime:
                return this.renderDateTypeFilter(columnDef);
            case Field_1.FieldSchemaTypeName.PersianDate:
                return this.renderDateTypeFilter(columnDef);
            case Field_1.FieldSchemaTypeName.LocalList:
                return this.renderLocalLookupFilter(columnDef);
            case Field_1.FieldSchemaTypeName.List:
                return this.renderRemoteLookupFilter(columnDef);
            default:
                return this.renderDefaultFilter(columnDef);
        }
    };
    CustomFilterRowView.prototype.render = function () {
        var _this = this;
        var columns = this.props.columns
            .filter(function (columnDef) { return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1); })
            .sort(function (a, b) { return a.tableData.columnOrder - b.tableData.columnOrder; })
            .map(function (columnDef) { return (React.createElement(TableCell_1.default, { key: columnDef.tableData.id, style: __assign(__assign({}, _this.props.filterCellStyle), columnDef.filterCellStyle) }, _this.getComponentForColumn(columnDef))); });
        if (this.props.selection) {
            columns.splice(0, 0, React.createElement(TableCell_1.default, { padding: "none", key: "key-selection-column" }));
        }
        if (this.props.emptyCell && this.props.hasActions) {
            if (this.props.actionsColumnIndex === -1) {
                columns.push(React.createElement(TableCell_1.default, { key: "key-action-column" }));
            }
            else {
                var endPos = 0;
                if (this.props.selection) {
                    endPos = 1;
                }
                columns.splice((this.props.actionsColumnIndex || 0) + endPos, 0, React.createElement(TableCell_1.default, { key: "key-action-column" }));
            }
        }
        if (this.props.hasDetailPanel) {
            columns.splice(0, 0, React.createElement(TableCell_1.default, { padding: "none", key: "key-detail-panel-column" }));
        }
        if (this.props.isTreeData === true) {
            columns.splice(0, 0, React.createElement(TableCell_1.default, { padding: "none", key: 'key-tree-data-filter' }));
        }
        this.props.columns
            .filter(function (columnDef) { return columnDef.tableData.groupOrder > -1; })
            .forEach(function (columnDef) {
            columns.splice(0, 0, React.createElement(TableCell_1.default, { padding: "checkbox", key: 'key-group-filter' + columnDef.tableData.id }));
        });
        return React.createElement(TableRow_1.default, { style: { height: 10 } }, columns);
    };
    return CustomFilterRowView;
}(React.Component));
exports.default = CustomFilterRowView;
