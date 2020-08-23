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
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var React = __importStar(require("react"));
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var AdvanceFilterContext_1 = require("./AdvanceFilterContext");
var useItemStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        container: {
            display: 'flex',
            padding: 3,
            paddingLeft: 5,
            paddingRight: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(244,244,244,0.5)',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.1)',
            },
        },
        titleContainer: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
        },
        label: {
            color: theme.palette.text.primary,
            fontSize: 14,
            display: 'inline-block',
            marginLeft: theme.direction == 'rtl' ? 0 : 5,
            marginRight: theme.direction != 'rtl' ? 0 : 5,
            verticalAlign: 'middle',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
        },
        icon: {
            color: 'rgba(0,0,0,0.19)',
        },
        prefixIcon: {
            color: 'rgba(0,0,0,0.19)',
            fontSize: '1.2rem',
        },
    });
});
function getNoAnimationStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    return __assign(__assign({}, style), { 
        // cannot be 0, but make it super tiny
        transitionDuration: "0.001s" });
}
function Item(props) {
    var classes = useItemStyles();
    var _a = React.useState(false), hover = _a[0], setHover = _a[1];
    var createChild = function (provided, snapshot, isClone) {
        if (isClone === void 0) { isClone = false; }
        return (React.createElement("div", __assign({ ref: isClone ? undefined : provided.innerRef }, (isClone ? {} : provided.draggableProps), (isClone ? {} : provided.dragHandleProps), { onMouseOver: function () { return setHover(true); }, onMouseOut: function () { return setHover(false); }, className: classes.container, style: getNoAnimationStyle(provided.draggableProps.style, snapshot) }),
            React.createElement("div", { className: classes.titleContainer },
                React.createElement(core_1.Icon, { className: classes.prefixIcon }, props.item.icon),
                React.createElement(core_1.Typography, { className: classes.label }, props.item.title)),
            React.createElement(core_1.Icon, { style: { opacity: hover ? 1 : 0 }, className: classes.icon }, 'add')));
    };
    return (React.createElement(react_beautiful_dnd_1.Draggable, { key: props.item.id + 'dKey', draggableId: props.item.id + 'dId', index: props.item.id }, function (provided, snapshot) { return (React.createElement(React.Fragment, null,
        createChild(provided, snapshot),
        snapshot.isDragging && (React.createElement("div", { style: { display: 'none!important', transform: 'none!important' } }, createChild(provided, snapshot, true))))); }));
}
var useItemHeaderStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        label: {
            color: theme.palette.primary.contrastText,
            fontSize: 14,
            display: 'inline-block',
            marginLeft: theme.direction == 'rtl' ? 0 : 5,
            marginRight: theme.direction != 'rtl' ? 0 : 5,
            cursor: 'default',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
        },
        icon: {
            display: 'inline-block',
            marginTop: 1,
            color: theme.palette.primary.contrastText,
        },
        container: {
            backgroundColor: theme.palette.primary.main,
            padding: 3,
            paddingLeft: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 5,
            // transition: "200ms",
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        rippleStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'start',
        },
    });
});
function ItemHeader(props) {
    var classes = useItemHeaderStyles();
    var _a = React.useState(true), open = _a[0], setOpen = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onClick: function () { return setOpen(!open); }, className: classes.container },
            React.createElement(core_1.ButtonBase, { className: classes.rippleStyle },
                React.createElement(core_1.Icon, { style: { transform: "rotate(" + (open ? 90 : 0) + "deg)" }, className: classes.icon }, 'keyboard_arrow_right'),
                React.createElement(core_1.Typography, { className: classes.label }, props.item.title))),
        open && (React.createElement(react_beautiful_dnd_1.Droppable, { isDropDisabled: true, droppableId: "sourceDroppable" }, function (provided, _snapshot) { return (React.createElement("div", { ref: provided.innerRef },
            props.item.children.map(function (item, i) { return (React.createElement(Item, { item: item, key: "key_" + i })); }),
            React.createElement("div", { style: { display: 'none' } }, provided.placeholder))); }))));
}
//endregion
// search
var useSearchStyles = styles_1.makeStyles(function (_theme) {
    return styles_1.createStyles({
        box: {
            width: '100%',
            height: 30,
        },
    });
});
function Search(props) {
    var classes = useSearchStyles();
    return (React.createElement(core_1.TextField, { className: classes.box, value: props.value, onChange: function (v) { return props.onChange(v.target.value); }, variant: 'filled', placeholder: props.placeholder, inputRef: props.inputRef, inputProps: {
            style: {
                height: 30,
                padding: '0 14px',
            },
        } }));
}
// end search
var useStyles = styles_1.makeStyles(function (_theme) {
    return styles_1.createStyles({
        itemExplorer: {
            flex: 2,
            backgroundColor: 'rgba(0,0,0,0.05)',
            overflow: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar-track': {
                borderRadius: 10,
                backgroundColor: '#f3f3f3',
            },
            '&::-webkit-scrollbar': {
                width: 2.5,
                backgroundColor: '#F5F5F5',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: 10,
                backgroundColor: '#c3c3c3',
            },
        },
    });
});
function ItemExplorer(props) {
    var classes = useStyles();
    var _a = React.useState(''), value = _a[0], setValue = _a[1];
    var inputRef = React.useRef(null);
    React.useEffect(function () {
        var eventHandler = function (e) {
            if (e.key !== '/' || inputRef.current == null)
                return;
            inputRef.current.focus();
            setTimeout(function () { return setValue(''); }, 0);
        };
        window.addEventListener('keydown', eventHandler);
        return function () { return window.removeEventListener('keydown', eventHandler); };
    }, []);
    var filteredItems = React.useMemo(function () {
        return props.categories.map(function (category) {
            return __assign(__assign({}, category), { children: category.children.filter(function (v) { return v.title.toLowerCase().includes(value.toLowerCase()); }) });
        });
    }, [value, props.categories]);
    var advanceFilterContext = React.useContext(AdvanceFilterContext_1.AdvanceFilterContext);
    return (React.createElement("div", { className: classes.itemExplorer },
        React.createElement(Search, { placeholder: advanceFilterContext.contentProps.localization.searchPlaceholder, inputRef: inputRef, value: value, onChange: function (v) { return setValue(v); } }),
        filteredItems.map(function (item, i) { return (React.createElement(ItemHeader, { item: item, key: "category_" + i })); })));
}
exports.default = ItemExplorer;
