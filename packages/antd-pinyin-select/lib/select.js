"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Select = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _tools = require("@dpdfe/tools");

var _server = require("react-dom/server");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Option = _antd.Select.Option,
    OptGroup = _antd.Select.OptGroup,
    SECRET_COMBOBOX_MODE_DO_NOT_USE = _antd.Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;

var InternalSelect = function InternalSelect(props, ref) {
  // 用来存储匹配后的结果, 减少重复匹配的工作量
  var input_res_map = new Map();
  (0, _react.useEffect)(function () {
    input_res_map = new Map();
    return function () {
      input_res_map = new Map();
    };
  }, [props]);
  var dropdownRenderer = (0, _react.useCallback)(function (originNode) {
    var input = originNode.props.searchValue;
    var is_group_option = originNode.props.flattenOptions.length !== originNode.props.options.length; // 如果有groupOption的层级，暂不支持

    if (input === '' || is_group_option) {
      return originNode;
    }

    var res = [];

    if (input_res_map.has(input)) {
      res = input_res_map.get(input);
    } else {
      var optionFilterProp = (props === null || props === void 0 ? void 0 : props.optionFilterProp) ? props.optionFilterProp : 'label';
      var is_children = !props.options;
      res = (0, _tools.pinYinFuzzSearch)(input, originNode.props.options, {
        textProvider: (props === null || props === void 0 ? void 0 : props.textProvider) ? props.textProvider : function (item) {
          return is_children ? convertJsxToString(item.children) : convertJsxToString(item[optionFilterProp]);
        },
        sort: (props === null || props === void 0 ? void 0 : props.sort) ? props.sort : 'AUTO',
        multiple: (props === null || props === void 0 ? void 0 : props.multiple) ? props.multiple : 'ANY',
        separator: (props === null || props === void 0 ? void 0 : props.separator) ? props.separator : ' '
      });
      input_res_map.set(input, res);
    }

    return /*#__PURE__*/(0, _react.cloneElement)(originNode, {
      options: res,
      flattenOptions: res.map(function (o) {
        return _objectSpread({}, originNode.props.flattenOptions.find(function (fo) {
          return fo.key === (o.key ? o.key : o.value);
        }));
      })
    });
  }, [props]);
  return /*#__PURE__*/_react.default.createElement(_antd.Select, _extends({
    ref: ref,
    filterOption: false,
    dropdownRender: dropdownRenderer
  }, props));
};
/**
 * 转化option里潜在的 ReactElement| ReactElement[] 为string，避免报错
 * @param origin_input - option
 */


function convertJsxToString(origin_input) {
  var node_children = [];

  if (Array.isArray(origin_input)) {
    node_children = origin_input;
  } else {
    node_children = [origin_input];
  }

  var string_input = node_children.map(function (child) {
    if ( /*#__PURE__*/(0, _react.isValidElement)(child)) {
      var html = (0, _server.renderToString)(child) || '';
      return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;
    }

    return child;
  }).join('');
  return string_input;
}

var SelectRef = /*#__PURE__*/(0, _react.forwardRef)(InternalSelect);
var Select = SelectRef;
exports.Select = Select;
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;
var _default = Select;
exports.default = _default;