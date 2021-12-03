"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _select = require("./select");

var _antd = require("antd");

require("antd/es/select/style/index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Option = _select.Select.Option,
    OptGroup = _select.Select.OptGroup;
var provinces = '北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区'.split(',');
var options = provinces.map(function (p) {
  return {
    value: p,
    label: p
  };
});

function Demo() {
  var ref1 = (0, _react.useRef)(null);
  var ref2 = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    console.log(ref1.current);
    console.log(ref2.current);
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_select.Select, {
    showSearch: true,
    ref: ref1,
    placeholder: "\u5305\u88C5\u8FC7\u7684Select",
    style: {
      marginRight: 20,
      width: 240
    }
  }, provinces.map(function (value) {
    return /*#__PURE__*/_react.default.createElement(Option, {
      value: value,
      key: value
    }, value);
  })), /*#__PURE__*/_react.default.createElement(_antd.Select, {
    showSearch: true,
    ref: ref2,
    placeholder: "\u539F\u59CBSelect",
    style: {
      marginRight: 20,
      width: 240
    }
  }, provinces.map(function (value) {
    return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
      value: value,
      key: value
    }, value);
  })));
}

var _default = Demo;
exports.default = _default;