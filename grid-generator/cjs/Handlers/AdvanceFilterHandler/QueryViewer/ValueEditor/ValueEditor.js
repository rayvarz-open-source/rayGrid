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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueEditor = void 0;
var React = __importStar(require("react"));
var Field_1 = require("../../../../Models/Field");
var BitValueEditor_1 = require("./BitValueEditor");
var DateValueEditor_1 = require("./DateValueEditor");
var InputValueEditor_1 = require("./InputValueEditor");
var LocalListValueEditor_1 = require("./LocalListValueEditor");
function ValueEditor(props) {
    switch (props.expression.extras.field.type.name) {
        case Field_1.FieldSchemaTypeName.Bit:
            return React.createElement(BitValueEditor_1.BitValueEditor, { expression: props.expression });
        case Field_1.FieldSchemaTypeName.Barcode:
            return React.createElement(InputValueEditor_1.InputValueEditor, { expression: props.expression, type: 'text' });
        case Field_1.FieldSchemaTypeName.GregorianDateTime:
        case Field_1.FieldSchemaTypeName.PersianDate:
            return React.createElement(DateValueEditor_1.DateValueEditor, { expression: props.expression });
        case Field_1.FieldSchemaTypeName.String:
            return React.createElement(InputValueEditor_1.InputValueEditor, { expression: props.expression, type: 'text' });
        case Field_1.FieldSchemaTypeName.Money:
            return React.createElement(InputValueEditor_1.InputValueEditor, { expression: props.expression, type: 'number' });
        case Field_1.FieldSchemaTypeName.List:
            return null;
        case Field_1.FieldSchemaTypeName.LocalList:
            return React.createElement(LocalListValueEditor_1.LocalListValueEditor, { expression: props.expression });
        case Field_1.FieldSchemaTypeName.Int:
            return React.createElement(InputValueEditor_1.InputValueEditor, { expression: props.expression, type: 'number' });
        default:
            return null;
    }
}
exports.ValueEditor = ValueEditor;
