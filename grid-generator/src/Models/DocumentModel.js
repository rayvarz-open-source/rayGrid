"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentViewModel = void 0;
var DocumentViewModel = /** @class */ (function () {
    function DocumentViewModel(docModel, isDeleted, isNew) {
        this.result = docModel.result;
        this.message = docModel.message;
        this.id = docModel.id;
        this.original = docModel.original;
        this.thumb = docModel.thumb;
        this.blurred = docModel.blurred;
        this.isDeleted = isDeleted;
        this.isNew = isNew;
    }
    return DocumentViewModel;
}());
exports.DocumentViewModel = DocumentViewModel;
