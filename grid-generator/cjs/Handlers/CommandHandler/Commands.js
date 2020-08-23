"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCommands = exports.GridCommandName = void 0;
var GridCommandName;
(function (GridCommandName) {
    GridCommandName["RefreshCurrentPage"] = "RefreshCurrentPage";
    GridCommandName["SetCurrentPage"] = "SetCurrentPage";
    GridCommandName["Nop"] = "Nop";
})(GridCommandName = exports.GridCommandName || (exports.GridCommandName = {}));
exports.GridCommands = {
    refresh: {
        name: GridCommandName.RefreshCurrentPage,
    },
    setCurrentPage: function (pageNo) {
        return {
            name: GridCommandName.SetCurrentPage,
            param: pageNo,
        };
    },
    nop: { name: GridCommandName.Nop },
};
