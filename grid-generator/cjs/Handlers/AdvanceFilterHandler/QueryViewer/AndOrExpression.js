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
exports.AndOrExpression = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var React = __importStar(require("react"));
var Filter_1 = require("../../../Models/Filter");
var useIsRtl_1 = require("../../../Utils/useIsRtl");
var AdvanceFilterContext_1 = require("../AdvanceFilterContext");
var DropZone_1 = require("./DropZone");
var ExpressionView_1 = require("./ExpressionView");
var useAndOrStyles = styles_1.makeStyles(function (_theme) {
    return styles_1.createStyles({
        keyword: {
            fontWeight: 'bold',
            transition: '200ms',
            marginLeft: 5,
            marginRight: 5,
        },
        deleteButton: {
            padding: 0,
            transition: '100ms',
        },
        startContainer: {
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
        },
    });
});
function AndOrExpression(props) {
    var _a, _b;
    var isRtl = useIsRtl_1.useIsRtl();
    var expression = props.expression;
    var advanceFilterContext = React.useContext(AdvanceFilterContext_1.AdvanceFilterContext);
    var operatorName = expression.type === Filter_1.FilterSchemaType.AND
        ? (_a = advanceFilterContext.contentProps) === null || _a === void 0 ? void 0 : _a.localization.and : (_b = advanceFilterContext.contentProps) === null || _b === void 0 ? void 0 : _b.localization.or;
    var subExpressions = expression.value;
    var classes = useAndOrStyles();
    var _c = React.useState(false), hoverOverBrackets = _c[0], setHoverOverBrackets = _c[1];
    var createKeyword = function (value, variant) {
        if (variant === void 0) { variant = 'h6'; }
        return (React.createElement(core_1.Typography, { variant: variant, className: classes.keyword, style: { opacity: hoverOverBrackets ? 1.0 : 0.5 } }, value));
    };
    var _path = props.expression.path.join('-');
    var isRoot = props.expression.path.length === 1;
    var elementChild = function (_depth) {
        var _a, _b;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: classes.startContainer },
                createKeyword((_a = advanceFilterContext.contentProps) === null || _a === void 0 ? void 0 : _a.localization.openBracket),
                !isRoot && (React.createElement(core_1.IconButton, { onClick: function () { return advanceFilterContext.onDelete(props.expression.path); }, className: classes.deleteButton, style: {
                        opacity: hoverOverBrackets ? 0.7 : 0.0,
                        transitionDelay: hoverOverBrackets ? '150ms' : '0ms',
                        width: hoverOverBrackets ? '1rem' : '0rem',
                        height: hoverOverBrackets ? '1rem' : '0rem',
                        marginRight: isRtl ? 0 : hoverOverBrackets ? 3 : 0,
                        marginLeft: isRtl ? (hoverOverBrackets ? 3 : 0) : 0,
                    } },
                    React.createElement(core_1.Icon, { style: { fontSize: '1rem' } }, 'close')))),
            subExpressions.map(function (exp, i) { return (React.createElement(React.Fragment, { key: exp.fieldName + "_" + i },
                React.createElement(ExpressionView_1.Expression, { depth: 0, expression: exp }),
                i !== subExpressions.length - 1 && createKeyword(operatorName, 'body2'))); }),
            React.createElement(DropZone_1.DropZone, { id: "inner#" + _path }),
            createKeyword((_b = advanceFilterContext.contentProps) === null || _b === void 0 ? void 0 : _b.localization.closeBracket)));
    };
    var element;
    if (calculateExpressionDepth(expression) < 4) {
        element = React.createElement("div", { style: { flexDirection: 'row', display: 'flex', alignItems: 'center' } }, elementChild(0));
    }
    else {
        element = React.createElement("div", { style: { flexDirection: 'column', display: 'flex' } }, elementChild(props.depth + 1));
    }
    return (React.createElement("div", { onMouseEnter: function () { return setHoverOverBrackets(true); }, onMouseLeave: function () { return setHoverOverBrackets(false); }, style: {
            marginLeft: isRtl ? 0 : 15,
            marginRight: isRtl ? 15 : 0,
            backgroundColor: hoverOverBrackets ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0)',
            borderRadius: 10,
            padding: 3,
        } }, element));
}
exports.AndOrExpression = AndOrExpression;
function calculateExpressionDepth(expression) {
    if (!Array.isArray(expression.value))
        return 0;
    var depth = expression.value.length;
    var childrenDepths = expression.value.map(function (v) { return calculateExpressionDepth(v); });
    return depth + Math.max.apply(Math, childrenDepths);
}
