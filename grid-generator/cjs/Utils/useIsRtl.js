"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsRtl = void 0;
var styles_1 = require("@material-ui/styles");
function useIsRtl() {
    var theme = styles_1.useTheme();
    return theme == null ? false : theme.direction == 'rtl';
}
exports.useIsRtl = useIsRtl;
