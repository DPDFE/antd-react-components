"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Select = void 0;

var _react = _interopRequireDefault(require("react"));

var _tools = require("@dpdfe/tools");

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  _react.default.useEffect(function () {
    input_res_map = new Map();
    return function () {
      input_res_map = new Map();
    };
  }, [props]);

  var dropdownRenderer = _react.default.useCallback(function (originNode) {
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
          return is_children ? item.children : item[optionFilterProp];
        },
        sort: (props === null || props === void 0 ? void 0 : props.sort) ? props.sort : 'AUTO',
        multiple: (props === null || props === void 0 ? void 0 : props.multiple) ? props.multiple : 'ANY',
        separator: (props === null || props === void 0 ? void 0 : props.separator) ? props.separator : ' '
      });
      input_res_map.set(input, res);
    }

    return /*#__PURE__*/_react.default.cloneElement(originNode, {
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

var SelectRef = /*#__PURE__*/_react.default.forwardRef(InternalSelect);

var Select = SelectRef;
exports.Select = Select;
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;
var _default = Select;
exports.default = _default;