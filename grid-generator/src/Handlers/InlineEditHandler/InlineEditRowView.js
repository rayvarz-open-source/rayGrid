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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setByString = exports.byString = void 0;
var core_1 = require("@material-ui/core");
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var React = __importStar(require("react"));
var Field_1 = require("../../Models/Field");
exports.byString = function (o, s) {
    if (!s) {
        return;
    }
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var x = a[i];
        if (o && x in o) {
            o = o[x];
        }
        else {
            return;
        }
    }
    return o;
};
exports.setByString = function (obj, path, value) {
    var schema = obj; // a moving reference to internal objects within obj
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    var pList = path.split('.');
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
        var elem = pList[i];
        if (!schema[elem])
            schema[elem] = {};
        schema = schema[elem];
    }
    schema[pList[len - 1]] = value;
};
var InlineEditRowView = /** @class */ (function (_super) {
    __extends(InlineEditRowView, _super);
    function InlineEditRowView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: props.data ? JSON.parse(JSON.stringify(props.data)) : _this.createRowData(),
        };
        return _this;
    }
    InlineEditRowView.prototype.createRowData = function () {
        return this.props.columns
            .filter(function (column) { return column.initialEditValue && column.field; })
            .reduce(function (prev, column) {
            prev[column.field] = column.initialEditValue;
            return prev;
        }, {});
    };
    InlineEditRowView.prototype.renderColumns = function () {
        var _this = this;
        var mapArr = this.props.columns
            .filter(function (columnDef) { return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1); })
            .sort(function (a, b) { return a.tableData.columnOrder - b.tableData.columnOrder; })
            .map(function (columnDef, index) {
            var value = typeof _this.state.data[columnDef.field] !== 'undefined'
                ? _this.state.data[columnDef.field]
                : exports.byString(_this.state.data, columnDef.field);
            var style = {};
            if (index === 0) {
                style.paddingLeft = 24 + _this.props.level * 20;
            }
            var allowEditing = false;
            if (columnDef.editable === undefined) {
                allowEditing = true;
            }
            if (columnDef.editable === 'always') {
                allowEditing = true;
            }
            if (columnDef.editable === 'onAdd' && _this.props.mode === 'add') {
                allowEditing = true;
            }
            if (columnDef.editable === 'onUpdate' && _this.props.mode === 'update') {
                allowEditing = true;
            }
            if (typeof columnDef.editable == 'function') {
                allowEditing = columnDef.editable(columnDef, _this.props.data);
            }
            if (!columnDef.field || !allowEditing) {
                var readonlyValue = _this.props.getFieldValue(_this.state.data, columnDef);
                return (React.createElement(_this.props.components.Cell, { icons: _this.props.icons, columnDef: columnDef, value: readonlyValue, key: columnDef.tableData.id, rowData: _this.props.data }));
            }
            else {
                // const {
                //   editComponent,
                //   ...cellProps ,
                // } = columnDef;
                //   const EditComponent = editComponent || this.props.components.EditField;
                return (React.createElement(TableCell_1.default, { key: columnDef.tableData.id, align: ['numeric'].includes(columnDef.type) ? 'right' : 'left' }, _this.makeEditComponent(columnDef.fieldDefinition, columnDef.tableData.id, value, function (_value) {
                    var data = __assign({}, _this.state.data);
                    var value = _value.target !== null ? _value.target.value : _value;
                    exports.setByString(data, columnDef.field, value);
                    // data[columnDef.field] = value;
                    _this.setState({ data: data });
                }, function (data) {
                    _this.setState({ data: data });
                })));
            }
        });
        return mapArr;
    };
    InlineEditRowView.prototype.makeEditComponent = function (field, key, value, onChange, _onRowDataChange) {
        if ([Field_1.FieldSchemaTypeName.String, Field_1.FieldSchemaTypeName.String].includes(field.type.name)) {
            return React.createElement(core_1.TextField, { value: value, key: key, onChange: function (value) { return onChange(value); }, type: 'text' });
        }
        else if ([Field_1.FieldSchemaTypeName.Money, Field_1.FieldSchemaTypeName.Int].includes(field.type.name)) {
            return React.createElement(core_1.TextField, { value: value, key: key, onChange: function (value) { return onChange(value); }, type: 'number' });
        }
        else if (field.type.name === Field_1.FieldSchemaTypeName.Bit) {
            return (React.createElement(core_1.Checkbox, { checked: value == true, onChange: function (_target, value) {
                    onChange(value);
                } }));
        }
        else {
            return null;
        }
    };
    InlineEditRowView.prototype.renderActions = function () {
        var _this = this;
        var localization = __assign({}, this.props.localization);
        var actions = [
            {
                icon: this.props.icons.Check,
                tooltip: localization.saveTooltip,
                onClick: function () {
                    var newData = _this.state.data;
                    delete newData.tableData;
                    _this.props.onEditingApproved(_this.props.mode, _this.state.data, _this.props.data);
                },
            },
            {
                icon: this.props.icons.Clear,
                tooltip: localization.cancelTooltip,
                onClick: function () {
                    _this.props.onEditingCanceled(_this.props.mode, _this.props.data);
                },
            },
        ];
        return (React.createElement(TableCell_1.default, { padding: "none", key: "key-actions-column", style: { width: 42 * actions.length, padding: '0px 5px' } },
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement(this.props.components.Actions, { data: this.props.data, actions: actions, components: this.props.components }))));
    };
    InlineEditRowView.prototype.getStyle = function () {
        var style = {
            // boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
            borderBottom: '1px solid red',
        };
        return style;
    };
    InlineEditRowView.prototype.render = function () {
        var localization = __assign({}, this.props.localization);
        var columns;
        if (this.props.mode === 'add' || this.props.mode === 'update') {
            columns = this.renderColumns();
        }
        else {
            var colSpan = this.props.columns.filter(function (columnDef) { return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1); }).length;
            columns = [
                React.createElement(TableCell_1.default, { padding: this.props.options.actionsColumnIndex === 0 ? 'none' : undefined, key: "key-selection-cell", colSpan: colSpan },
                    React.createElement(Typography_1.default, { variant: "h6" }, localization.deleteText)),
            ];
        }
        if (this.props.options.selection) {
            columns.splice(0, 0, React.createElement(TableCell_1.default, { padding: "none", key: "key-selection-cell" }));
        }
        if (this.props.isTreeData) {
            columns.splice(0, 0, React.createElement(TableCell_1.default, { padding: "none", key: "key-tree-data-cell" }));
        }
        if (this.props.options.actionsColumnIndex === -1) {
            columns.push(this.renderActions());
        }
        else if (this.props.options.actionsColumnIndex >= 0) {
            var endPos = 0;
            if (this.props.options.selection) {
                endPos = 1;
            }
            if (this.props.isTreeData) {
                endPos = 1;
                if (this.props.options.selection) {
                    columns.splice(1, 1);
                }
            }
            columns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActions());
        }
        // Lastly we add detail panel icon
        // if (this.props.detailPanel) {
        //   const aligment = this.props.options.detailPanelColumnAlignment;
        //   const index = aligment === "left" ? 0 : columns.length;
        //   columns.splice(index, 0, <TableCell padding="none" key="key-detail-panel-cell" />);
        // }
        this.props.columns
            .filter(function (columnDef) { return columnDef.tableData.groupOrder > -1; })
            .forEach(function (columnDef) {
            columns.splice(0, 0, React.createElement(TableCell_1.default, { padding: "none", key: 'key-group-cell' + columnDef.tableData.id }));
        });
        var _a = this.props, detailPanel = _a.detailPanel, isTreeData = _a.isTreeData, onRowClick = _a.onRowClick, onRowSelected = _a.onRowSelected, onTreeExpandChanged = _a.onTreeExpandChanged, onToggleDetailPanel = _a.onToggleDetailPanel, onEditingApproved = _a.onEditingApproved, onEditingCanceled = _a.onEditingCanceled, getFieldValue = _a.getFieldValue, rowProps = __rest(_a, ["detailPanel", "isTreeData", "onRowClick", "onRowSelected", "onTreeExpandChanged", "onToggleDetailPanel", "onEditingApproved", "onEditingCanceled", "getFieldValue"]);
        return (React.createElement(React.Fragment, null,
            React.createElement(TableRow_1.default, __assign({}, rowProps, { style: this.getStyle() }), columns)));
    };
    return InlineEditRowView;
}(React.Component));
exports.default = InlineEditRowView;
// InlineEditRowView.defaultProps = {
//   actions: [],
//   index: 0,
//   options: {},
//   path: [],
//   localization: {
//     saveTooltip: 'Save',
//     cancelTooltip: 'Cancel',
//     deleteText: 'Are you sure delete this row?',
//   }
// };
