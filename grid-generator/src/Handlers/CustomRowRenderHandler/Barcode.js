// @ts-nocheck
/* eslint-disable */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Barcode = void 0;
var JsBarcode = __importStar(require("jsbarcode"));
var PropTypes = __importStar(require("prop-types"));
var React = __importStar(require("react"));
var getDOMNode;
// Super naive semver detection but it's good enough. We support 0.12, 0.13
// which both have getDOMNode on the ref. 0.14 and 15 make the DOM node the ref.
var version = React.version.split(/[.-]/);
if ((version[0] === '0' && version[1] === '13') || version[1] === '12') {
    getDOMNode = function (ref) { return ref.getDOMNode(); };
}
else {
    getDOMNode = function (ref) { return ref; };
}
var Barcode = /** @class */ (function (_super) {
    __extends(Barcode, _super);
    function Barcode(props) {
        var _this = _super.call(this, props) || this;
        _this.update = _this.update.bind(_this);
        return _this;
    }
    Barcode.prototype.shouldComponentUpdate = function (nextProps) {
        var _this = this;
        return Object.keys(Barcode.propTypes).some(function (k) { return _this.props[k] !== nextProps[k]; });
    };
    Barcode.prototype.componentDidMount = function () {
        this.update();
    };
    Barcode.prototype.componentDidUpdate = function () {
        this.update();
    };
    Barcode.prototype.update = function () {
        var renderElement = getDOMNode(this.refs.renderElement);
        try {
            new JsBarcode(renderElement, this.props.value, Object.assign({}, this.props));
        }
        catch (e) {
            // prevent stop the parent process
            window.console.error(e);
        }
    };
    Barcode.prototype.render = function () {
        if (this.props.renderer === 'svg') {
            return React.createElement("svg", { ref: "renderElement" });
        }
        else if (this.props.renderer === 'canvas') {
            return React.createElement("canvas", { ref: "renderElement" });
        }
        else if (this.props.renderer === 'img') {
            return React.createElement("img", { ref: "renderElement" });
        }
    };
    return Barcode;
}(React.Component));
exports.Barcode = Barcode;
Barcode.propTypes = {
    value: PropTypes.string.isRequired,
    renderer: PropTypes.string,
    format: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    displayValue: PropTypes.bool,
    fontOptions: PropTypes.string,
    font: PropTypes.string,
    textAlign: PropTypes.string,
    textPosition: PropTypes.string,
    textMargin: PropTypes.number,
    fontSize: PropTypes.number,
    background: PropTypes.string,
    lineColor: PropTypes.string,
    margin: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
};
Barcode.defaultProps = {
    format: 'CODE128',
    renderer: 'svg',
    width: 2,
    height: 25,
    displayValue: true,
    fontOptions: '',
    font: 'monospace',
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 14,
    background: '#ffffff',
    lineColor: '#000000',
    margin: 10,
};
