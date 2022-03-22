function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Select as AntdSelect } from 'antd';
import React, { cloneElement, forwardRef, isValidElement, useCallback, useEffect } from 'react';
import { pinYinFuzzSearch } from '@dpdfe/tools';
import { renderToString } from 'react-dom/server';
var Option = AntdSelect.Option,
    OptGroup = AntdSelect.OptGroup,
    SECRET_COMBOBOX_MODE_DO_NOT_USE = AntdSelect.SECRET_COMBOBOX_MODE_DO_NOT_USE;

var InternalSelect = function InternalSelect(props, ref) {
  // 用来存储匹配后的结果, 减少重复匹配的工作量
  var input_res_map = new Map();
  useEffect(function () {
    input_res_map = new Map();
    return function () {
      input_res_map = new Map();
    };
  }, [props]);
  var dropdownRenderer = useCallback(function (originNode) {
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
      res = pinYinFuzzSearch(input, originNode.props.options, {
        textProvider: (props === null || props === void 0 ? void 0 : props.textProvider) ? props.textProvider : function (item) {
          return is_children ? convertJsxToString(item.children) : convertJsxToString(item[optionFilterProp]);
        },
        sort: (props === null || props === void 0 ? void 0 : props.sort) ? props.sort : 'AUTO',
        multiple: (props === null || props === void 0 ? void 0 : props.multiple) ? props.multiple : 'ANY',
        separator: (props === null || props === void 0 ? void 0 : props.separator) ? props.separator : ' '
      });
      input_res_map.set(input, res);
    }

    return /*#__PURE__*/cloneElement(originNode, {
      options: res,
      flattenOptions: res.map(function (o) {
        return _objectSpread({}, originNode.props.flattenOptions.find(function (fo) {
          return fo.key === (o.key ? o.key : o.value);
        }));
      })
    });
  }, [props]);
  return /*#__PURE__*/React.createElement(AntdSelect, _extends({
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
    if ( /*#__PURE__*/isValidElement(child)) {
      var html = renderToString(child) || '';
      return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;
    }

    return child;
  }).join('');
  return string_input;
}

var SelectRef = /*#__PURE__*/forwardRef(InternalSelect);
var Select = SelectRef;
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;
export default Select;
export { Select };