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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGridGenerator = void 0;
var operators_1 = require("rxjs/operators");
function BaseGridGenerator(props) {
    // elements
    var containerElement = props.builders
        .containerBuilder()
        .children(props.controllers.containerController);
    var gridElement = props.builders.gridBuilder();
    var hideColumnModalElement = props.builders.hideColumnModalBuilder();
    var documentListContainer = props.builders.documentListContainerBuilder();
    var listFilterModal = props.builders.listFilterModalBuilder();
    var documentListModal = props.builders
        .documentListModalBuilder()
        .child(documentListContainer);
    var advanceFilterModalElement = props.builders.advanceFilterViewBuilder({
        open: props.controllers.advanceFilterOpenController,
        contentProps: props.controllers.advanceFilterContentPropsController,
    });
    var elements = {
        elements: {
            container: containerElement,
            grid: gridElement,
            hideColumnModal: hideColumnModalElement,
            documentListContainer: documentListContainer,
            documentListModal: documentListModal,
            listFilterModal: listFilterModal,
            advanceFilterModalView: advanceFilterModalElement,
        },
    };
    props.controllers.containerController.next([
        gridElement,
        hideColumnModalElement,
        documentListModal,
        listFilterModal,
        advanceFilterModalElement,
    ]);
    // attribute observables
    var baseObservables = props.builders.observablesBuilder();
    var observables = props.handlers.pipe(operators_1.map(function (handlers) {
        var obs = baseObservables;
        // run handlers
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var handler = handlers_1[_i];
            obs = handler(__assign(__assign({}, props), elements), obs);
        }
        return obs;
    }));
    // connect grid to observables
    gridElement
        .columnDefinitions(observables.pipe(operators_1.flatMap(function (x) { return x.columnDefinitions.pipe(operators_1.map(function (v) { return v[0]; })); })))
        .actionDefinitions(observables.pipe(operators_1.flatMap(function (x) { return x.actionDefinitions; })))
        .componentsOverride(observables.pipe(operators_1.flatMap(function (x) { return x.componentsOverride; })))
        .datasource(observables.pipe(operators_1.flatMap(function (x) { return x.datasource; })))
        .rowActionDefinitions(observables.pipe(operators_1.flatMap(function (x) { return x.rowActionDefinitions; })))
        .gridOptions(observables.pipe(operators_1.flatMap(function (x) { return x.gridOptions; })))
        .title(observables.pipe(operators_1.flatMap(function (x) { return x.title; })))
        .onRowClick(observables.pipe(operators_1.flatMap(function (x) { return x.onRowClick; })))
        .localizationDefinition(observables.pipe(operators_1.flatMap(function (x) { return x.localizationDefinition; })));
    return containerElement;
}
exports.BaseGridGenerator = BaseGridGenerator;
