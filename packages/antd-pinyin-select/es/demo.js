import 'antd/es/select/style/index';
import { useLayoutEffect, useRef } from 'react';
import { Select as ASelect } from 'antd';
import React from 'react';
import { Select } from './select';
var Option = Select.Option,
    OptGroup = Select.OptGroup;
var provinces = '北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区'.split(',');
var options = provinces.map(function (p) {
  return {
    value: p,
    label: p
  };
});

function Demo() {
  var ref1 = useRef(null);
  var ref2 = useRef(null);
  useLayoutEffect(function () {
    console.log(ref1.current);
    console.log(ref2.current);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "App",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    showSearch: true,
    ref: ref1,
    placeholder: "\u5305\u88C5\u8FC7\u7684Select",
    style: {
      marginRight: 20,
      width: 240
    }
  }, provinces.map(function (value, index) {
    return /*#__PURE__*/React.createElement(Option, {
      value: value,
      key: value
    }, value, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'red'
      }
    }, "(", value.split('').reverse().join(''), ")"), "\u652F\u6301jsx");
  })), /*#__PURE__*/React.createElement(ASelect, {
    showSearch: true,
    ref: ref2,
    placeholder: "\u539F\u59CBSelect",
    style: {
      marginRight: 20,
      width: 240
    }
  }, provinces.map(function (value) {
    return /*#__PURE__*/React.createElement(ASelect.Option, {
      value: value,
      key: value
    }, value);
  })));
}

export default Demo;