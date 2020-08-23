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
exports.hideColumnsModalHandler = exports.setupHideColumnModal = void 0;
var flmc_lite_renderer_1 = require("@rayflmc/flmc-lite-renderer");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function chunk(array, size) {
    var chunkedArr = [];
    for (var i = 0; i < array.length; i++) {
        var last = chunkedArr[chunkedArr.length - 1];
        if (!last || last.length === size) {
            chunkedArr.push([array[i]]);
        }
        else {
            last.push(array[i]);
        }
    }
    return chunkedArr;
}
function setupHideColumnModal(schema, hiddenFields) {
    function createControllerForField(field, hiddenFieldsSnapshot) {
        var subject = new rxjs_1.BehaviorSubject(!hiddenFieldsSnapshot.includes(field.fieldName));
        // update schema if value changed
        subject.pipe(operators_1.skip(1), operators_1.first()).subscribe(function (isChecked) {
            if (!isChecked)
                hiddenFields.next(__spreadArrays(hiddenFields.value, [field.fieldName]));
            else
                hiddenFields.next(__spreadArrays(hiddenFields.value.filter(function (v) { return v !== field.fieldName; })));
        });
        return subject;
    }
    function createCheckboxElements(snapshot, hiddenFiels) {
        var elements = [];
        var chunkedFields = chunk(snapshot.fields.filter(function (v) { return v.isVisible; }), 3);
        for (var index = 0; index < chunkedFields.length; index++) {
            var chunk_1 = chunkedFields[index];
            var children = chunk_1.map(function (field) {
                return flmc_lite_renderer_1.SelectBox(createControllerForField(field, hiddenFiels), true)
                    .label(field.title || field.fieldName)
                    .variant(flmc_lite_renderer_1.SelectBoxVariant.CheckBox);
            });
            if (index === chunkedFields.length - 1 &&
                index > 0 &&
                chunk_1.length < chunkedFields[index - 1].length) {
                var numberOfPlaceholderElements = chunkedFields[index - 1].length - chunk_1.length;
                for (var i = 0; i < numberOfPlaceholderElements; i++)
                    children.push(flmc_lite_renderer_1.Container([]));
            }
            elements.push(flmc_lite_renderer_1.Container(children)
                .flex(children.map(function (_) { return 1; }))
                .direction(flmc_lite_renderer_1.ContainerDirection.Row));
        }
        return elements;
    }
    return flmc_lite_renderer_1.Container(rxjs_1.combineLatest(schema, hiddenFields).pipe(operators_1.map(function (_a) {
        var schemaSnapshot = _a[0], hiddenFieldsSnapshot = _a[1];
        return __spreadArrays(createCheckboxElements(schemaSnapshot, hiddenFieldsSnapshot));
    })));
}
exports.setupHideColumnModal = setupHideColumnModal;
exports.hideColumnsModalHandler = function (props, observables) {
    var openHideColumnsModal = function (localization) {
        props.elements.hideColumnModal.childContainer.next(setupHideColumnModal(props.controllers.schemaController, props.controllers.hideColumnModalHiddenFieldsController));
        props.elements.hideColumnModal.titleContainer.next(localization.columnVisibilityTitle);
        props.elements.hideColumnModal.openContainer.next(true);
    };
    var actions = rxjs_1.combineLatest(observables.actionDefinitions, props.options.localization).pipe(operators_1.map(function (_a) {
        var actionDefs = _a[0], localization = _a[1];
        return __spreadArrays(actionDefs, [
            {
                icon: "visibility",
                isFreeAction: true,
                tooltip: localization.columnVisibility,
                onClick: function (_event, _data) { return openHideColumnsModal(localization); },
            },
        ]);
    }));
    props.controllers.schemaController.subscribe(function (v) {
        props.controllers.hideColumnModalHiddenFieldsController.next(v.fields
            .filter(function (f) { return f.isVisible && !f.isVisibleDefault; })
            .map(function (f) { return f.fieldName; }));
    });
    return __assign(__assign({}, observables), { actionDefinitions: actions });
};
