import { Select as AntdSelect, SelectProps } from 'antd';
import { ReactElement, Ref } from 'react';
import { PinYinFuzzSearchOption } from '@dpdfe/tools/dist/pinyin_search';
import { RefSelectProps } from 'rc-select';
import { SelectValue } from 'antd/lib/select';
declare type AntSelectType = typeof AntdSelect;
declare const SelectRef: <VT extends SelectValue = SelectValue>(props: SelectProps<VT> & {
    ref?: Ref<RefSelectProps>;
} & PinYinFuzzSearchOption<VT>) => ReactElement;
declare type MyAntSelectType = typeof SelectRef & AntSelectType;
declare const Select: MyAntSelectType;
export default Select;
export { Select };
