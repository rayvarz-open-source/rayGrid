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
exports.QueryView = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var React = __importStar(require("react"));
var AdvanceFilterContext_1 = require("../AdvanceFilterContext");
var ExpressionView_1 = require("./ExpressionView");
var useQueryViewStyle = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        container: {
            flex: 9,
            flexDirection: 'column',
            display: 'flex',
        },
        actionBarContainer: {
            backgroundColor: 'rgba(0,0,0,0.05)',
            width: '100%',
            display: 'flex',
            flexDirection: 'row-reverse',
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 10,
            paddingLeft: 10,
        },
        queryContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            overflow: 'auto',
            overflowX: 'auto',
            flexWrap: 'wrap',
            padding: 25,
            alignContent: 'baseline',
            alignItems: 'center',
            userSelect: 'none',
            '&::-webkit-scrollbar-track': {
                borderRadius: 10,
                backgroundColor: '#f3f3f3',
            },
            '&::-webkit-scrollbar': {
                width: 4,
                backgroundColor: '#F5F5F5',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: 10,
                backgroundColor: theme.palette.primary.main,
                opacity: 0.4,
            },
        },
    });
});
function QueryView(props) {
    var _a, _b;
    var classes = useQueryViewStyle();
    var advanceFilterContext = React.useContext(AdvanceFilterContext_1.AdvanceFilterContext);
    return (React.createElement("div", { className: classes.container },
        React.createElement("div", { className: classes.queryContainer },
            React.createElement(ExpressionView_1.Expression, { depth: 0, expression: props.query })),
        React.createElement("div", { className: classes.actionBarContainer },
            React.createElement(core_1.Button, { onClick: function () { var _a; return (_a = advanceFilterContext.contentProps) === null || _a === void 0 ? void 0 : _a.onApply([advanceFilterContext.rootExpression]); }, variant: 'contained', color: 'primary' }, (_a = advanceFilterContext.contentProps) === null || _a === void 0 ? void 0 : _a.localization.apply),
            React.createElement(core_1.Button, { onClick: function () { var _a; return (_a = advanceFilterContext.contentProps) === null || _a === void 0 ? void 0 : _a.onCancel(); }, variant: 'text', color: 'default', style: { marginRight: 5, marginLeft: 5 } }, (_b = advanceFilterContext.contentProps) === null || _b === void 0 ? void 0 : _b.localization.cancel))));
}
exports.QueryView = QueryView;
