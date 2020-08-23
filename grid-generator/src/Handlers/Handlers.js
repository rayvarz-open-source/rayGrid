"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandlers = void 0;
var AdvanceFilterHandler_1 = require("./AdvanceFilterHandler/AdvanceFilterHandler");
var ColumnDefinitionHandler_1 = require("./ColumnDefinitionHandler/ColumnDefinitionHandler");
var CommandHandler_1 = require("./CommandHandler/CommandHandler");
var CustomActionHandler_1 = require("./CustomActionHandler/CustomActionHandler");
var CustomRowRendererHandler_1 = require("./CustomRowRenderHandler/CustomRowRendererHandler");
var LocalDataSourceHandler_1 = require("./DataSourceHandler/LocalDataSourceHandler");
var RemoteDataSourceHandler_1 = require("./DataSourceHandler/RemoteDataSourceHandler");
var ExportHandler_1 = require("./ExportHandler/ExportHandler");
var FilterHandler_1 = require("./FilterHandler/FilterHandler");
var HideColumnsModalHandler_1 = require("./HideColumnsModalHandler/HideColumnsModalHandler");
var InlineEditHandler_1 = require("./InlineEditHandler/InlineEditHandler");
var RefreshActionHandler_1 = require("./RefreshActionHandler/RefreshActionHandler");
var SelectionHandler_1 = require("./SelectionHandler/SelectionHandler");
var SortHandler_1 = require("./SortHandler/SortHandler");
var TableLocalizationHandler_1 = require("./TableLocalizationHandler/TableLocalizationHandler");
exports.defaultHandlers = [
    CommandHandler_1.commandHandler,
    TableLocalizationHandler_1.tableLocalizationHandler,
    ColumnDefinitionHandler_1.columnDefinitionHandler,
    LocalDataSourceHandler_1.localDataSourceHandler,
    RemoteDataSourceHandler_1.remoteDataSourceHandler,
    SelectionHandler_1.selectionHandler,
    CustomRowRendererHandler_1.customRowRendererHandler,
    FilterHandler_1.filterHandler,
    AdvanceFilterHandler_1.advanceFilterHandler,
    SortHandler_1.sortHandler,
    ExportHandler_1.exportHandler,
    RefreshActionHandler_1.refreshActionHandler,
    HideColumnsModalHandler_1.hideColumnsModalHandler,
    CustomActionHandler_1.customActionHandler,
    InlineEditHandler_1.inlineEditHandler,
];
