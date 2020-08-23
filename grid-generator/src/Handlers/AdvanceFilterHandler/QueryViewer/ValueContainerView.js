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
exports.ValueContainerView = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var React = __importStar(require("react"));
//
var useValueContainer = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        valueContainer: {
            backgroundColor: 'rgba(0,0,0,0.09)',
            paddingLeft: 5,
            paddingRight: 5,
            marginLeft: 5,
            marginRight: 5,
            transition: '300ms',
            '&:hover': {
                paddingRight: theme.direction == 'rtl' ? 0 : 20,
                paddingLeft: theme.direction != 'rtl' ? 0 : 20,
            },
        },
        editIcon: {
            fontSize: '1rem',
            position: 'absolute',
            right: theme.direction == 'rtl' ? undefined : 3,
            left: theme.direction != 'rtl' ? undefined : 3,
            transition: '150ms',
        },
    });
});
function ValueContainerView(props) {
    var classes = useValueContainer();
    var _a = React.useState(false), hover = _a[0], setHover = _a[1];
    return (React.createElement(core_1.ButtonBase, { onMouseEnter: function () { return setHover(true); }, onMouseLeave: function () { return setHover(false); }, className: classes.valueContainer, onClick: props.onClick },
        React.createElement(core_1.Typography, { variant: "body2" }, props.value),
        React.createElement(core_1.Icon, { className: classes.editIcon, style: { opacity: hover ? 0.5 : 0.0, transitionDelay: hover ? '150ms' : '0ms' } }, 'edit')));
}
exports.ValueContainerView = ValueContainerView;
