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
exports.GridGenerator = exports.DEFAULT_GRID_OPTIONS = exports.makeDefaultBuilders = exports.defaultLocalization = void 0;
var flmc_lite_renderer_1 = require("@rayflmc/flmc-lite-renderer");
var ContainerElement_1 = require("@rayflmc/flmc-lite-renderer/build/form/elements/container/ContainerElement");
var GridElement_1 = require("@rayflmc/flmc-lite-renderer/build/form/elements/grid/GridElement");
var ModalElement_1 = require("@rayflmc/flmc-lite-renderer/build/form/elements/modal/ModalElement");
var React = __importStar(require("react"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var BaseGridGenerator_1 = require("./BaseGridGenerator");
var AdvanceFilterView_1 = require("./Handlers/AdvanceFilterHandler/AdvanceFilterView");
var Commands_1 = require("./Handlers/CommandHandler/Commands");
var CustomActionPosition_1 = require("./Handlers/CustomActionHandler/CustomActionPosition");
var Handlers_1 = require("./Handlers/Handlers");
var Filter_1 = require("./Models/Filter");
exports.defaultLocalization = {
    create: "Create",
    delete: "Delete",
    errorFetchingSchema: "Error fetching schema",
    loading: "Loading...",
    advanceFilter: {
        and: "And",
        closeBracket: ")",
        openBracket: "(",
        or: "Or",
        actionTooltip: "Advance filter",
        andOperator: "And operator",
        apply: "Apply",
        cancel: "Cancel",
        fieldSectionHeader: "Fields",
        filterTypeTranslator: Filter_1.getFilterSchemaTypeName,
        generalSectionHeader: "General",
        orOperator: "Or operator",
        searchPlaceholder: 'Press "/" to search',
    },
    materialTable: {
        grouping: {
            groupedBy: "Grouped By:",
            placeholder: "Drag headers here to group by",
        },
        pagination: {
            labelDisplayedRows: "{from}-{to} of {count}",
            labelRowsPerPage: "Rows per page:",
            labelRowsSelect: "rows",
        },
        toolbar: {},
        header: {},
        body: {
            filterRow: {},
            editRow: {
                saveTooltip: "Save",
                cancelTooltip: "Cancel",
                deleteText: "Are you sure you want to delete this row?",
            },
            addTooltip: "Add",
            deleteTooltip: "Delete",
            editTooltip: "Edit",
        },
    },
    refresh: "Refresh",
    retry: "Retry",
    select: "Select",
    edit: "Edit",
    columnVisibility: "Hide/Show Columns",
    columnVisibilityTitle: "Hide/Show Columns",
};
exports.makeDefaultBuilders = function (controllers, gridOptions) {
    var windowResizeEvent = rxjs_1.merge(rxjs_1.of([window.innerHeight, window.innerWidth]), rxjs_1.fromEvent(window, "resize").pipe(operators_1.map(function () { return [window.innerHeight, window.innerWidth]; })));
    return {
        containerBuilder: function () { return new ContainerElement_1.ContainerElement(); },
        gridBuilder: function () { return new GridElement_1.GridElement(); },
        listFilterModalBuilder: function () {
            return new ModalElement_1.ModalElement()
                .minWidth(windowResizeEvent.pipe(operators_1.map(function (_a) {
                var _height = _a[0], width = _a[1];
                return width * 0.7;
            })))
                .maxHeight(windowResizeEvent.pipe(operators_1.map(function (_a) {
                var height = _a[0], _width = _a[1];
                return height;
            })))
                .maxWidth(windowResizeEvent.pipe(operators_1.map(function (_a) {
                var _height = _a[0], width = _a[1];
                return width;
            })))
                .noBackdropClickClose(false)
                .visibleHeader(false)
                .noEscapeKeyDownClose(false)
                .noPadding(true);
        },
        hideColumnModalBuilder: function () {
            return new ModalElement_1.ModalElement()
                .minWidth(windowResizeEvent.pipe(operators_1.map(function (_a) {
                var _height = _a[0], width = _a[1];
                return width * 0.7;
            })))
                .maxHeight(windowResizeEvent.pipe(operators_1.map(function (_a) {
                var height = _a[0], _width = _a[1];
                return height;
            })))
                .maxWidth(windowResizeEvent.pipe(operators_1.map(function (_a) {
                var _height = _a[0], width = _a[1];
                return width;
            })))
                .noBackdropClickClose(false)
                .noEscapeKeyDownClose(false);
        },
        documentListModalBuilder: function () {
            return new ModalElement_1.ModalElement()
                .noBackdropClickClose(false)
                .noEscapeKeyDownClose(false);
        },
        documentListContainerBuilder: function () {
            return new ContainerElement_1.ContainerElement().direction(flmc_lite_renderer_1.ContainerDirection.Row);
        },
        advanceFilterViewBuilder: function (props) {
            return flmc_lite_renderer_1.Raw(function (_) { return (React.createElement(AdvanceFilterView_1.AdvanceFilterView, { open: props.open, contentProps: props.contentProps })); });
        },
        observablesBuilder: function () {
            return {
                onRowClick: new rxjs_1.BehaviorSubject(undefined),
                actionDefinitions: new rxjs_1.BehaviorSubject([]).asObservable(),
                columnDefinitions: rxjs_1.combineLatest(new rxjs_1.BehaviorSubject([]), controllers.schemaController),
                componentsOverride: new rxjs_1.BehaviorSubject({}).asObservable(),
                datasource: new rxjs_1.BehaviorSubject([]).asObservable(),
                rowActionDefinitions: new rxjs_1.BehaviorSubject({}).asObservable(),
                gridOptions: new rxjs_1.BehaviorSubject(gridOptions).asObservable(),
                title: new rxjs_1.BehaviorSubject("").asObservable(),
                localizationDefinition: new rxjs_1.BehaviorSubject({}).asObservable(),
            };
        },
    };
};
exports.DEFAULT_GRID_OPTIONS = {
    actionsColumnIndex: -1,
    filtering: true,
    padding: "dense",
    pageSize: 5,
    initialPage: 0,
    pageSizeOptions: [5, 10, 20, 25, 50],
    debounceInterval: 0.7,
    loadingType: "linear",
};
function GridGenerator(props) {
    // handle default values
    var _a;
    var controllers = {
        schemaController: props.controllers && props.controllers.schemaController
            ? props.controllers.schemaController
            : new rxjs_1.BehaviorSubject({ fields: [], sorts: [], filters: [] }),
        filtersController: props.controllers && props.controllers.filtersController
            ? props.controllers.filtersController
            : new rxjs_1.BehaviorSubject([]),
        sortsController: props.controllers && props.controllers.sortsController
            ? props.controllers.sortsController
            : new rxjs_1.BehaviorSubject([]),
        paginationController: props.controllers && props.controllers.paginationController
            ? props.controllers.paginationController
            : new rxjs_1.BehaviorSubject({ totalPage: 0, totalRow: 0 }),
        commandController: props.controllers && props.controllers.commandController
            ? props.controllers.commandController
            : new rxjs_1.BehaviorSubject(Commands_1.GridCommands.nop),
        selectionController: props.controllers && props.controllers.selectionController
            ? props.controllers.selectionController
            : new rxjs_1.BehaviorSubject([]),
        currentPageDataController: props.controllers && props.controllers.currentPageDataController
            ? props.controllers.currentPageDataController
            : new rxjs_1.BehaviorSubject([]),
        customActionsController: props.controllers && props.controllers.customActionsController
            ? props.controllers.customActionsController
            : new rxjs_1.BehaviorSubject([]),
        containerController: props.controllers && props.controllers.containerController
            ? props.controllers.containerController
            : new rxjs_1.BehaviorSubject([]),
        keyFieldName: props.controllers && props.controllers.keyFieldName
            ? props.controllers.keyFieldName
            : new rxjs_1.BehaviorSubject(""),
        hideColumnModalHiddenFieldsController: props.controllers &&
            props.controllers.hideColumnModalHiddenFieldsController
            ? props.controllers.hideColumnModalHiddenFieldsController
            : new rxjs_1.BehaviorSubject([]),
        advanceFiltersController: props.controllers && props.controllers.advanceFiltersController
            ? props.controllers.advanceFiltersController
            : new rxjs_1.BehaviorSubject([]),
        advanceFilterContentPropsController: props.controllers && props.controllers.advanceFilterContentPropsController
            ? props.controllers.advanceFilterContentPropsController
            : new rxjs_1.BehaviorSubject({
                currentFilters: [],
                schema: { fields: [], filters: [], sorts: [] },
                localization: exports.defaultLocalization.advanceFilter,
                onApply: function (_) { },
                onCancel: function () { },
            }),
        advanceFilterOpenController: props.controllers && props.controllers.advanceFilterOpenController
            ? props.controllers.advanceFilterOpenController
            : new rxjs_1.BehaviorSubject(false),
    };
    var options = {
        noExport: props.options && props.options.noExport
            ? props.options.noExport
            : new rxjs_1.BehaviorSubject(false),
        noHideColumnModel: props.options && props.options.noHideColumnModel
            ? props.options.noHideColumnModel
            : new rxjs_1.BehaviorSubject(false),
        noRefresh: props.options && props.options.noRefresh
            ? props.options.noRefresh
            : new rxjs_1.BehaviorSubject(false),
        listFilterDataSource: props.options && props.options.listFilterDataSource
            ? props.options.listFilterDataSource
            : undefined,
        inlineEditCallBack: props.options && props.options.inlineEditCallBack
            ? props.options.inlineEditCallBack
            : undefined,
        customActionsPosition: props.options && props.options.customActionsPosition
            ? props.options.customActionsPosition
            : new rxjs_1.BehaviorSubject(CustomActionPosition_1.CustomActionPosition.End),
        enableSelection: props.options && props.options.enableSelection
            ? typeof props.options.enableSelection === "boolean"
                ? new rxjs_1.BehaviorSubject(props.options.enableSelection)
                : props.options.enableSelection
            : new rxjs_1.BehaviorSubject(false),
        localization: props.options && props.options.localization
            ? props.options.localization
            : new rxjs_1.BehaviorSubject(exports.defaultLocalization),
    };
    var defaultBuilders = exports.makeDefaultBuilders(controllers, props.options && props.options.defaultGridOptions
        ? props.options.defaultGridOptions
        : exports.DEFAULT_GRID_OPTIONS);
    var builders = {
        listFilterModalBuilder: props.builders && props.builders.listFilterModalBuilder
            ? props.builders.listFilterModalBuilder
            : defaultBuilders.listFilterModalBuilder,
        containerBuilder: props.builders && props.builders.containerBuilder
            ? props.builders.containerBuilder
            : defaultBuilders.containerBuilder,
        gridBuilder: props.builders && props.builders.gridBuilder //
            ? props.builders.gridBuilder
            : defaultBuilders.gridBuilder,
        observablesBuilder: props.builders && props.builders.observablesBuilder
            ? props.builders.observablesBuilder
            : defaultBuilders.observablesBuilder,
        hideColumnModalBuilder: props.builders && props.builders.hideColumnModalBuilder
            ? props.builders.hideColumnModalBuilder
            : defaultBuilders.hideColumnModalBuilder,
        documentListContainerBuilder: props.builders && props.builders.documentListContainerBuilder
            ? props.builders.documentListContainerBuilder
            : defaultBuilders.documentListContainerBuilder,
        documentListModalBuilder: props.builders && props.builders.documentListModalBuilder
            ? props.builders.documentListModalBuilder
            : defaultBuilders.documentListModalBuilder,
        advanceFilterViewBuilder: props.builders && props.builders.advanceFilterViewBuilder
            ? props.builders.advanceFilterViewBuilder
            : defaultBuilders.advanceFilterViewBuilder,
    };
    var handlers = (_a = props.handlers) !== null && _a !== void 0 ? _a : new rxjs_1.BehaviorSubject(Handlers_1.defaultHandlers);
    return BaseGridGenerator_1.BaseGridGenerator({
        controllers: controllers,
        options: options,
        dataSource: props.dataSource,
        builders: builders,
        handlers: handlers,
    });
}
exports.GridGenerator = GridGenerator;
