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
exports.InputValueEditor = void 0;
var core_1 = require("@material-ui/core");
var React = __importStar(require("react"));
var useForceUpdate_1 = require("../../../../Utils/useForceUpdate");
function InputValueEditor(props) {
    var forceUpdate = useForceUpdate_1.useForceUpdate();
    React.useEffect(function () {
        // handle null values
        props.expression.value = props.expression.value == null ? '' : props.expression.value;
    }, [props.expression]);
    var onChange = function (value) {
        props.expression.value = value;
        forceUpdate();
    };
    return (React.createElement(core_1.TextField, { value: props.expression.value == null ? '' : props.expression.value, onChange: function (v) { return onChange(v.target.value); }, variant: 'filled', type: props.type, inputProps: {
            style: {
                height: 20,
                maxWidth: 100,
                padding: '0 14px',
            },
        } }));
}
exports.InputValueEditor = InputValueEditor;
