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
exports.commandHandler = void 0;
var operators_1 = require("rxjs/operators");
var Commands_1 = require("./Commands");
exports.commandHandler = function (props, observables) {
    props.controllers.commandController
        .pipe(operators_1.filter(function (command) { return command.name !== Commands_1.GridCommandName.Nop; }))
        .subscribe(function (command) {
        switch (command.name) {
            case Commands_1.GridCommandName.RefreshCurrentPage:
                props.elements.grid.tableRef && props.elements.grid.tableRef.onQueryChange();
                break;
            case Commands_1.GridCommandName.SetCurrentPage:
                props.elements.grid.tableRef && props.elements.grid.tableRef.onChangePage(null, parseInt(command.param || 0));
                break;
        }
    });
    return __assign({}, observables);
};
