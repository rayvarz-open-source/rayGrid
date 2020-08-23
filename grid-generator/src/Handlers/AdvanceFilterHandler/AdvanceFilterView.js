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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvanceFilterView = exports.AdvanceFilterViewContent = void 0;
var core_1 = require("@material-ui/core");
var React = __importStar(require("react"));
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var Field_1 = require("../../Models/Field");
var Filter_1 = require("../../Models/Filter");
var AdvanceFilterContext_1 = require("./AdvanceFilterContext");
var ItemExplorer_1 = __importDefault(require("./ItemExplorer"));
var QueryView_1 = require("./QueryViewer/QueryView");
function createExpressionFromFilter(filter, startPath, schema) {
    if ([Filter_1.FilterSchemaType.AND, Filter_1.FilterSchemaType.OR].includes(filter.type)) {
        return __assign(__assign({}, __assign(__assign(__assign({}, DEFAULT_EXPRESSION), filter), { value: filter.value.map(function (f, i) {
                var _path = __spreadArrays(startPath, [i]);
                return __assign(__assign({}, createExpressionFromFilter(f, _path, schema)), { path: _path });
            }) })), { path: startPath });
    }
    else {
        var field_1 = schema.fields.find(function (v) { return v.fieldName === filter.fieldName; });
        if (field_1)
            return __assign(__assign({}, filter), { path: startPath, extras: {
                    field: field_1,
                    filters: schema.filters.filter(function (v) { return v.fieldName === field_1.fieldName; }),
                } });
        else
            return __assign(__assign(__assign({}, DEFAULT_EXPRESSION), filter), { path: startPath });
    }
}
function getIconByFieldType(type) {
    switch (type.name) {
        case Field_1.FieldSchemaTypeName.Bit:
            return 'check_box';
        case Field_1.FieldSchemaTypeName.GregorianDateTime:
            return 'date_range';
        case Field_1.FieldSchemaTypeName.PersianDate:
            return 'date_range';
        case Field_1.FieldSchemaTypeName.Image:
            return 'image';
        case Field_1.FieldSchemaTypeName.ImageList:
            return 'image';
        case Field_1.FieldSchemaTypeName.Int:
            return 'filter_9_plus';
        case Field_1.FieldSchemaTypeName.List:
            return 'dehaze';
        case Field_1.FieldSchemaTypeName.LocalList:
            return 'dehaze';
        case Field_1.FieldSchemaTypeName.Money:
            return 'attach_money';
        case Field_1.FieldSchemaTypeName.Object:
            return 'crop_square';
        case Field_1.FieldSchemaTypeName.QRCode:
            return 'format_align_justify';
        case Field_1.FieldSchemaTypeName.Barcode:
            return 'format_align_justify';
        case Field_1.FieldSchemaTypeName.String:
            return 'subtitles';
        default:
            return 'crop_square';
    }
}
var DEFAULT_EXPRESSION = {
    fieldName: '',
    path: [],
    type: Filter_1.FilterSchemaType.AND,
    value: [],
    extras: {
        field: {
            fieldName: '',
            isEditable: false,
            isKey: false,
            isVisible: false,
            isVisibleDefault: false,
            order: 0,
            title: '',
            type: { name: Field_1.FieldSchemaTypeName.String, source: null },
        },
        filters: [],
    },
};
var AND_INDEX = -1;
var OR_INDEX = -2;
function getExpressionByPath(source, path) {
    var lastExpression = source;
    for (var _i = 0, _a = path.slice(1); _i < _a.length; _i++) {
        var index = _a[_i];
        lastExpression = lastExpression.value[index];
    }
    return lastExpression;
}
function insertInnerPath(source, expression, path) {
    var parent = getExpressionByPath(source, path);
    parent.value.push(expression);
}
function deletePath(source, path) {
    var child = getExpressionByPath(source, path);
    var parent = getExpressionByPath(source, path.slice(0, path.length - 1));
    parent.value = parent.value.filter(function (v) { return v !== child; });
}
function AdvanceFilterViewContent(props) {
    var _a = React.useState(false), isDragging = _a[0], setIsDragging = _a[1];
    var _b = React.useState(false), allowDrop = _b[0], setAllowDrop = _b[1];
    var _c = React.useState('None'), draggingItem = _c[0], setDraggingItem = _c[1];
    var _d = React.useState(DEFAULT_EXPRESSION), queryExpression = _d[0], setQueryExpression = _d[1];
    var fieldsWithFilter = React.useMemo(function () {
        return props.schema.fields.filter(function (v) { return v.title != null && props.schema.filters.find(function (v) { return v.fieldName === v.fieldName; }) != null; });
    }, [props.schema]);
    React.useEffect(function () {
        if (props.currentFilters.length === 1 && props.currentFilters[0].type === Filter_1.FilterSchemaType.AND)
            setQueryExpression(createExpressionFromFilter(props.currentFilters[0], [0], props.schema));
        else if (props.currentFilters.length === 0)
            setQueryExpression(createExpressionFromFilter(__assign({}, DEFAULT_EXPRESSION), [0], props.schema));
        else
            setQueryExpression(createExpressionFromFilter(__assign(__assign({}, DEFAULT_EXPRESSION), { value: props.currentFilters }), [0], props.schema));
        return function () { return setQueryExpression(DEFAULT_EXPRESSION); };
    }, [props.currentFilters, props.schema]);
    function onDragEnd(_result) {
        setAllowDrop(true);
        setTimeout(function () { return setAllowDrop(false); }, 300);
        setIsDragging(false);
    }
    function onDragStart(result) {
        setAllowDrop(false);
        setIsDragging(true);
        setDraggingItem(result.draggableId);
    }
    function onDropped(id) {
        if (allowDrop) {
            var index = parseInt(draggingItem.split('dId')[0]);
            var filter = void 0;
            if ([AND_INDEX, OR_INDEX].includes(index)) {
                filter = {
                    fieldName: '',
                    type: index === AND_INDEX ? Filter_1.FilterSchemaType.AND : Filter_1.FilterSchemaType.OR,
                    value: [],
                };
            }
            else {
                var field_2 = fieldsWithFilter[index];
                var firstFilter = props.schema.filters.find(function (v) { return v.fieldName === field_2.fieldName; });
                if (firstFilter == null)
                    return;
                filter = {
                    fieldName: field_2.fieldName,
                    type: firstFilter.type,
                    value: null,
                };
            }
            var path = id
                .split('#')[1]
                .split('-')
                .map(function (v) { return parseInt(v); });
            insertInnerPath(queryExpression, createExpressionFromFilter(filter, [], props.schema), path);
            setQueryExpression(createExpressionFromFilter(queryExpression, [0], props.schema));
            setAllowDrop(false);
        }
    }
    function onDelete(path) {
        deletePath(queryExpression, path);
        setQueryExpression(createExpressionFromFilter(queryExpression, [0], props.schema));
    }
    function createCategoriesFromSchema() {
        return [
            {
                title: props.localization.fieldSectionHeader,
                children: fieldsWithFilter.map(function (v, i) {
                    return {
                        title: v.title,
                        icon: getIconByFieldType(v.type),
                        id: i,
                    };
                }),
            },
        ];
    }
    return (React.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: onDragEnd, onDragStart: onDragStart },
        React.createElement(AdvanceFilterContext_1.AdvanceFilterContext.Provider, { value: { isDragging: isDragging, onDropped: onDropped, onDelete: onDelete, contentProps: props, rootExpression: queryExpression } },
            React.createElement("div", { style: { display: 'flex', flexDirection: 'row', width: '100%', height: '100%' } },
                React.createElement(ItemExplorer_1.default, { categories: __spreadArrays([
                        {
                            title: props.localization.generalSectionHeader,
                            children: [
                                { title: props.localization.orOperator, icon: 'flip_to_back', id: OR_INDEX },
                                { title: props.localization.andOperator, icon: 'flip_to_front', id: AND_INDEX },
                            ],
                        }
                    ], createCategoriesFromSchema()) }),
                React.createElement(QueryView_1.QueryView, { query: queryExpression })))));
}
exports.AdvanceFilterViewContent = AdvanceFilterViewContent;
function AdvanceFilterView(props) {
    var _a = React.useState(function () { return props.open.value; }), open = _a[0], setOpen = _a[1];
    var _b = React.useState(function () { return props.contentProps.value; }), contentProps = _b[0], setContentProps = _b[1];
    React.useEffect(function () {
        var openSub = props.open.subscribe(function (v) { return setOpen(v); });
        var contentPropsSub = props.contentProps.subscribe(function (v) { return setContentProps(v); });
        return function () {
            openSub.unsubscribe();
            contentPropsSub.unsubscribe();
        };
    }, [props.open, props.contentProps]);
    return (React.createElement(core_1.Modal, { disableEnforceFocus: true, open: open },
        React.createElement("div", { style: {
                backgroundColor: 'white',
                borderRadius: 9,
                width: window.innerWidth * 0.7,
                height: window.innerHeight * 0.75,
                margin: 'auto',
                marginTop: (window.innerHeight * 0.25) / 2,
                outline: 'none',
                overflow: 'hidden',
            } },
            React.createElement(AdvanceFilterViewContent, __assign({}, contentProps)))));
}
exports.AdvanceFilterView = AdvanceFilterView;
