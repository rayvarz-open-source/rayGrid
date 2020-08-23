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
exports.DateValueEditor = void 0;
var jalaali_1 = __importDefault(require("@date-io/jalaali"));
var moment_1 = __importDefault(require("@date-io/moment"));
var pickers_1 = require("@material-ui/pickers");
var moment_jalaali_1 = __importDefault(require("moment-jalaali"));
var React = __importStar(require("react"));
var Field_1 = require("../../../../Models/Field");
var useForceUpdate_1 = require("../../../../Utils/useForceUpdate");
moment_jalaali_1.default.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });
function DateValueEditor(props) {
    var forceUpdate = useForceUpdate_1.useForceUpdate();
    var _a = React.useState(function () {
        return props.expression.value == null ? new Date() : new Date(props.expression.value);
    }), localValue = _a[0], setLocalValue = _a[1];
    React.useEffect(function () {
        // handle null values
        props.expression.value =
            props.expression.value == null ? new Date().toISOString() : new Date(props.expression.value);
    }, [props.expression]);
    var onDateInputChange = function (date) {
        setLocalValue(date._d);
        props.expression.value = date._d.toISOString();
        forceUpdate();
    };
    var styles = { minWidth: 80, maxWidth: 100, height: 20, padding: 0 };
    return (React.createElement(pickers_1.MuiPickersUtilsProvider, { utils: props.expression.extras.field.type.name === Field_1.FieldSchemaTypeName.GregorianDateTime ? moment_1.default : jalaali_1.default },
        React.createElement(pickers_1.DatePicker, { clearable: false, format: props.expression.extras.field.type.name === Field_1.FieldSchemaTypeName.GregorianDateTime
                ? 'YYYY/MM/DD'
                : 'jYYYY/jM/jD', style: styles, inputVariant: 'filled', inputProps: {
                style: styles,
            }, value: localValue, onChange: onDateInputChange })));
}
exports.DateValueEditor = DateValueEditor;
