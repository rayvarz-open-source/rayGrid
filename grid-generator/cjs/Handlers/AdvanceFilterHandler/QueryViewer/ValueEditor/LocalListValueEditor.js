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
exports.LocalListValueEditor = void 0;
var core_1 = require("@material-ui/core");
var React = __importStar(require("react"));
var useForceUpdate_1 = require("../../../../Utils/useForceUpdate");
var ValueContainerView_1 = require("../ValueContainerView");
function LocalListValueEditor(props) {
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var source = props.expression.extras.field.type.source;
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }
    function handleItemClick(_value, index) {
        handleClose();
        props.expression.value = source === null || source === void 0 ? void 0 : source.values[index][source === null || source === void 0 ? void 0 : source.keyFieldName];
        forceUpdate();
    }
    var forceUpdate = useForceUpdate_1.useForceUpdate();
    if (source == null)
        throw new Error('Invalid state');
    React.useEffect(function () {
        // handle null values
        props.expression.value =
            props.expression.value == null ? source === null || source === void 0 ? void 0 : source.values[0][source.keyFieldName] : props.expression.value;
    }, [props.expression, source.keyFieldName, source === null || source === void 0 ? void 0 : source.values]);
    var displayValue = source === null || source === void 0 ? void 0 : source.values.find(function (v) { return v[source === null || source === void 0 ? void 0 : source.keyFieldName] === props.expression.value; });
    return (React.createElement(React.Fragment, null,
        React.createElement(ValueContainerView_1.ValueContainerView, { value: displayValue == null ? ' - ' : displayValue[source === null || source === void 0 ? void 0 : source.valueFieldName], onClick: handleClick }),
        React.createElement(core_1.Menu, { id: "value_editor_" + props.expression.fieldName + "_" + props.expression.path, anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, source.values.map(function (item, i) { return (React.createElement(core_1.MenuItem, { key: item[source.keyFieldName], value: item[source.keyFieldName], onClick: function (e) { return handleItemClick(e, i); } }, item[source.valueFieldName])); }))));
}
exports.LocalListValueEditor = LocalListValueEditor;
