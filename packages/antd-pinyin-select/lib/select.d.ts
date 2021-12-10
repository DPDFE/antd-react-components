import React from 'react';
import { Select as AntdSelect, SelectProps } from 'antd';
import { RefSelectProps } from 'rc-select';
import { SelectValue } from 'antd/lib/select';
import { PinYinFuzzSearchOption } from '@dpdfe/tools/dist/pinyin_search';
declare type AntSelectType = typeof AntdSelect;
declare const SelectRef: <VT extends SelectValue = SelectValue>(props: SelectProps<VT> & {
    ref?: React.Ref<RefSelectProps>;
} & PinYinFuzzSearchOption<VT>) => React.ReactElement;
declare type MyAntSelectType = typeof SelectRef & AntSelectType;
declare const Select: MyAntSelectType;
export default Select;
export { Select };
