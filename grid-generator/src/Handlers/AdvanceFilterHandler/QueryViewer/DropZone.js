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
exports.DropZone = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var React = __importStar(require("react"));
var AdvanceFilterContext_1 = require("../AdvanceFilterContext");
function MouseOverDetector(_a) {
    var children = _a.children;
    var _b = React.useState(false), hover = _b[0], setHover = _b[1];
    return (React.createElement("div", { onMouseEnter: function () { return setHover(true); }, onMouseLeave: function () { return setHover(false); } }, children(hover)));
}
//
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        container: {
            backgroundColor: theme.palette.primary.main,
            padding: 3,
            transition: '300ms',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            borderRadius: 5,
        },
        icon: {
            color: theme.palette.primary.contrastText,
            transition: '300ms',
        },
    });
});
function DropZone(props) {
    var classes = useStyles();
    return (React.createElement(AdvanceFilterContext_1.AdvanceFilterContext.Consumer, null, function (value) { return (React.createElement(MouseOverDetector, null, function (isOver) {
        if (isOver && !value.isDragging) {
            /* dropped */ value.onDropped(props.id);
        }
        var styles = {
            width: value.isDragging ? (isOver ? 180 : 22) : 0,
            height: value.isDragging ? 22 : 0,
            transform: value.isDragging && isOver ? 'scale(1.5, 1.5)' : 'scale(1,1)',
            opacity: (isOver && value.isDragging ? 0.3 : 0) + (value.isDragging ? 0.3 : 0),
        };
        return (React.createElement("div", { className: classes.container, style: __assign(__assign({}, styles), { marginLeft: value.isDragging ? 5 : 0, marginRight: value.isDragging ? 5 : 0 }) },
            React.createElement(core_1.Icon, { className: classes.icon, style: { opacity: value.isDragging ? 1.0 : 0.0 } }, 'keyboard_arrow_down')));
    })); }));
}
exports.DropZone = DropZone;
