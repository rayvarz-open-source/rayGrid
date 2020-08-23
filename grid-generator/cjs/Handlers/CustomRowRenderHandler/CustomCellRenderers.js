"use strict";
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
exports.GridImageCell = exports.handleCustomComponentRenderer = exports.formatMoney = void 0;
var core_1 = require("@material-ui/core");
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
var moment_jalali_1 = __importDefault(require("moment-jalali"));
var React = __importStar(require("react"));
var react_qrcode_logo_1 = require("react-qrcode-logo");
var Field_1 = require("../../Models/Field");
var Barcode_1 = require("./Barcode");
var momentJalali = moment_jalali_1.default;
/**
 * Number.prototype.format(n, x)
 *
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
exports.formatMoney = function (_value, n, x) {
    var value = typeof _value == 'number' ? _value : Number(_value);
    if (isNaN(value))
        throw Error("formatMoney: '" + _value + "' is not a number");
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
function handleCustomComponentRenderer(field, callbacks) {
    switch (field.type.name) {
        case Field_1.FieldSchemaTypeName.Money:
            return function (rowData) { return React.createElement("p", null, exports.formatMoney(rowData[field.fieldName], 0, 3)); };
        case Field_1.FieldSchemaTypeName.Bit:
            return function (rowData) { return React.createElement(core_1.Icon, null, rowData[field.fieldName] ? 'check' : 'close'); };
        case Field_1.FieldSchemaTypeName.PersianDate:
            return function (rowData) {
                var date = rowData[field.fieldName];
                if (!date)
                    return React.createElement("p", null, " - ");
                return React.createElement("p", null, momentJalali(new Date(date).toISOString()).format('jYYYY/jM/jD'));
            };
        case Field_1.FieldSchemaTypeName.GregorianDateTime:
            return function (rowData) {
                var date = rowData[field.fieldName];
                if (!date)
                    return React.createElement("p", null, " - ");
                return React.createElement("p", null, momentJalali(new Date(date).toISOString()).format('YYYY/M/D'));
            };
        case Field_1.FieldSchemaTypeName.Image:
            return function (rowData) {
                var document = rowData[field.fieldName] == null ? [] : [rowData[field.fieldName]];
                return React.createElement(GridImageCell, { onClick: function () { return callbacks.onImageListClick(document); }, documents: document });
            };
        case Field_1.FieldSchemaTypeName.String:
            // TODO: this is hacky! view should layout itself better
            if (!field.fieldName.toLowerCase().includes('title'))
                return undefined;
            return function (rowData) { return React.createElement("p", { style: { minWidth: 150 } }, rowData[field.fieldName]); };
        case Field_1.FieldSchemaTypeName.ImageList:
            return function (rowData) { return (React.createElement(GridImageCell, { onClick: function () { return callbacks.onImageListClick(rowData[field.fieldName]); }, documents: rowData[field.fieldName] })); };
        case Field_1.FieldSchemaTypeName.Barcode:
            return function (rowData) {
                var data = rowData[field.fieldName];
                if (data == null)
                    return React.createElement(React.Fragment, null, " ");
                return React.createElement(Barcode_1.Barcode, { value: data });
            };
        case Field_1.FieldSchemaTypeName.QRCode:
            return function (rowData) {
                var data = rowData[field.fieldName];
                if (data == null)
                    return React.createElement(React.Fragment, null, " ");
                return React.createElement(react_qrcode_logo_1.QRCode, { value: data });
            };
        case Field_1.FieldSchemaTypeName.Object:
            return function (rowData) {
                var data = rowData[field.fieldName];
                data = data == null ? {} : data;
                if (field.type.source == null)
                    throw new TypeError('field.type.source');
                data = data[field.type.source.valueFieldName];
                return React.createElement("p", null, data + ''); // convert objects to string to be a valid react node
            };
        default:
            return function (rowData) {
                var data = rowData[field.fieldName];
                data = data == null ? ' - ' : data;
                return React.createElement("p", null, data + ''); // convert objects to string to be a valid react node
            };
    }
}
exports.handleCustomComponentRenderer = handleCustomComponentRenderer;
function GridImageCell(_a) {
    var documents = _a.documents, onClick = _a.onClick;
    return (React.createElement("div", { style: {
            flexDirection: 'row',
            position: 'relative',
        } }, documents.map(function (image, index) { return (React.createElement("a", { key: index + '_GridImageCell', onClick: function () { return onClick(); } },
        React.createElement("img", { src: image.thumb, style: {
                transform: 'translateY(-25px)',
                width: 50,
                height: 50,
                borderRadius: 5,
                position: 'absolute',
                display: 'block',
                boxShadow: '1px 1px 1px white',
                transition: '0.2s',
                cursor: 'pointer',
                objectFit: 'contain',
                marginRight: index * 9,
                zIndex: index + 1000,
            } }))); })));
}
exports.GridImageCell = GridImageCell;
