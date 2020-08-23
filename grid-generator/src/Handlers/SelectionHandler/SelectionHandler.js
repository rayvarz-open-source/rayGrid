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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectionHandler = exports.createUncheckedChangeCallBack = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function createUncheckedChangeCallBack(gridElement, selectedItems, currentPageData, keyFieldName) {
    var skipUncheck = false;
    function addSelectedItem(data) {
        if (!selectedItems.value
            .map(function (s) { return s[keyFieldName.value]; })
            .includes(data[keyFieldName.value])) {
            skipUncheck = true;
            selectedItems.next(__spreadArrays(selectedItems.value, [data]));
        }
    }
    function removeSelectedItem(data) {
        skipUncheck = true;
        selectedItems.next(selectedItems.value.filter(function (v) { return v[keyFieldName.value] != data[keyFieldName.value]; }));
    }
    // handles select all and select none
    gridElement.onSelectedChange(function (data) {
        if (data.length === 0)
            currentPageData.value.forEach(function (v) { return removeSelectedItem(v); });
        else
            data.forEach(function (v) { return addSelectedItem(v); });
    });
    function updateDataManger(model, checked) {
        var table = gridElement.tableRef;
        if (table == null)
            console.warn("gridElement.tableRef is null");
        table === null || table === void 0 ? void 0 : table.dataManager.changeRowSelected(checked, [
            model.tableData.id,
        ]);
        table === null || table === void 0 ? void 0 : table.setState(table.dataManager.getRenderState(), function () {
            return table.onSelectionChange(model);
        });
    }
    function updateDataManagerStateWithNewValue(value) {
        if (skipUncheck)
            return;
        var table = gridElement.tableRef;
        if (table == null)
            return;
        table.dataManager.data
            .filter(function (v) {
            return v.tableData.checked === true &&
                !value
                    .map(function (i) { return i[keyFieldName.value]; })
                    .includes(v[keyFieldName.value]);
        })
            .forEach(function (item) { return updateDataManger(item, false); });
    }
    selectedItems.subscribe({
        next: function (v) {
            updateDataManagerStateWithNewValue(v);
            skipUncheck = false;
        },
    });
    return function handleCheckedChanged(model, checked) {
        updateDataManger(model, checked);
        if (checked)
            addSelectedItem(model);
        else
            removeSelectedItem(model);
    };
}
exports.createUncheckedChangeCallBack = createUncheckedChangeCallBack;
exports.selectionHandler = function (props, observables) {
    var optionsObservable = rxjs_1.combineLatest(observables.gridOptions, props.options.enableSelection).pipe(operators_1.map(function (_a) {
        var options = _a[0], isSelectionEnabled = _a[1];
        var onCheckedChanged = createUncheckedChangeCallBack(props.elements.grid, props.controllers.selectionController, props.controllers.currentPageDataController, props.controllers.keyFieldName);
        return __assign(__assign({}, options), { selection: isSelectionEnabled, showTextRowsSelected: false, selectionProps: function (rowData) {
                return {
                    onChange: function (e) { return onCheckedChanged(rowData, e.target.checked); },
                };
            } });
    }));
    return __assign(__assign({}, observables), { gridOptions: optionsObservable });
};
