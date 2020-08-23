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
exports.customRowRendererHandler = void 0;
var flmc_lite_renderer_1 = require("@rayflmc/flmc-lite-renderer");
var operators_1 = require("rxjs/operators");
var CustomCellRenderers_1 = require("./CustomCellRenderers");
exports.customRowRendererHandler = function (props, observables) {
    var handleDocumentList = function (documents) {
        props.elements.documentListContainer.childrenContainer.next(documents.map(function (document) {
            return flmc_lite_renderer_1.Image(document.original)
                .height(250)
                .width(250)
                .scale(flmc_lite_renderer_1.ImageScaleType.Contain);
        }));
        props.elements.documentListModal.openContainer.next(true);
    };
    var colDefinitionHandler = observables.columnDefinitions.pipe(operators_1.map(function (_a) {
        var cols = _a[0], definitions = _a[1];
        var newCols = cols.map(function (col) {
            var field = col.fieldDefinition;
            var renderer = CustomCellRenderers_1.handleCustomComponentRenderer(field, {
                onImageListClick: function (documents) { return handleDocumentList(documents); },
            });
            return __assign(__assign({}, col), { render: renderer });
        });
        return [newCols, definitions];
    }));
    return __assign(__assign({}, observables), { columnDefinitions: colDefinitionHandler });
};
