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
exports.FilterExpressionView = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var React = __importStar(require("react"));
var useForceUpdate_1 = require("../../../Utils/useForceUpdate");
var AdvanceFilterContext_1 = require("../AdvanceFilterContext");
var ValueContainerView_1 = require("./ValueContainerView");
var ValueEditor_1 = require("./ValueEditor/ValueEditor");
var useExpressionStyle = styles_1.makeStyles(function (_theme) {
    return styles_1.createStyles({
        container: {
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: 3,
            paddingLeft: 5,
            paddingRight: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            transition: '300ms',
        },
        deleteButton: {
            padding: 0,
            transition: '100ms',
        },
    });
});
function FilterExpressionView(props) {
    var classes = useExpressionStyle();
    var expression = props.expression;
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var forceUpdate = useForceUpdate_1.useForceUpdate();
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }
    function handleItemClick(_value, index) {
        handleClose();
        props.expression.type = props.expression.extras.filters[index].type;
        forceUpdate();
    }
    var _b = React.useState(false), hover = _b[0], setHover = _b[1];
    var _c = React.useState(null), timeoutId = _c[0], setTimeoutId = _c[1];
    return (React.createElement(AdvanceFilterContext_1.AdvanceFilterContext.Consumer, null, function (value) {
        var _a;
        return (React.createElement("div", { style: { display: 'flex' } },
            React.createElement("div", { className: classes.container, onMouseEnter: function () {
                    if (timeoutId != null) {
                        clearTimeout(timeoutId);
                        setTimeoutId(null);
                    }
                    setHover(true);
                }, onMouseLeave: function () {
                    setTimeoutId(setTimeout(function () { return setHover(false); }, 500));
                } },
                React.createElement(core_1.Typography, { variant: "body2" }, expression.extras.field.title),
                React.createElement(ValueContainerView_1.ValueContainerView, { value: (_a = value.contentProps) === null || _a === void 0 ? void 0 : _a.localization.filterTypeTranslator(expression.type), onClick: handleClick }),
                React.createElement(ValueEditor_1.ValueEditor, { expression: props.expression }),
                React.createElement(core_1.IconButton, { onClick: function () { return value.onDelete(props.expression.path); }, className: classes.deleteButton, style: {
                        opacity: hover ? 0.7 : 0.0,
                        transitionDelay: hover ? '150ms' : '0ms',
                        width: hover ? '1rem' : '0rem',
                    } },
                    React.createElement(core_1.Icon, { style: { fontSize: '1rem' } }, 'close')),
                React.createElement(core_1.Menu, { id: "type_select_" + expression.fieldName + "_" + expression.path, anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, props.expression.extras.filters.map(function (item, i) {
                    var _a;
                    return (React.createElement(core_1.MenuItem, { key: "option_" + i, onClick: function (e) { return handleItemClick(e, i); }, value: item.type }, (_a = value.contentProps) === null || _a === void 0 ? void 0 : _a.localization.filterTypeTranslator(item.type)));
                })))));
    }));
}
exports.FilterExpressionView = FilterExpressionView;
