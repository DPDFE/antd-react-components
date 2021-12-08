import React from 'react';
import {pinYinFuzzSearch} from '@dpdfe/tools';
import {Select as AntdSelect, SelectProps} from 'antd';
import {RefSelectProps} from 'rc-select';
import {SelectValue} from 'antd/lib/select';

const {Option, OptGroup, SECRET_COMBOBOX_MODE_DO_NOT_USE} = AntdSelect;

type AntSelectType = typeof AntdSelect;

interface Props extends SelectProps<SelectValue> {}

const InternalSelect = (props: Props, ref: React.Ref<RefSelectProps>) => {
    // 用来存储匹配后的结果, 减少重复匹配的工作量
    let input_res_map = new Map<string, any[]>();

    React.useEffect(() => {
        input_res_map = new Map<string, any[]>();

        return () => {
            input_res_map = new Map<string, any[]>();
        };
    }, [props]);

    const dropdownRenderer = React.useCallback(
        (originNode: React.ReactElement) => {
            const input = originNode.props.searchValue;

            const is_group_option =
                originNode.props.flattenOptions.length !==
                originNode.props.options.length;

            // 如果有groupOption的层级，暂不支持
            if (input === '' || is_group_option) {
                return originNode;
            }

            let res: any[] = [];

            if (input_res_map.has(input)) {
                res = input_res_map.get(input)!;
            } else {
                const optionFilterProp = props?.optionFilterProp
                    ? props.optionFilterProp
                    : 'label';

                const is_children = !props.options;

                res = pinYinFuzzSearch(input, originNode.props.options, {
                    textProvider: (item: any) =>
                        is_children ? item.children : item[optionFilterProp],
                });

                input_res_map.set(input, res);
            }

            return React.cloneElement(originNode, {
                options: res,
                flattenOptions: res.map((o) => ({
                    ...originNode.props.flattenOptions.find(
                        (fo: any) => fo.key === (o.key ? o.key : o.value),
                    ),
                })),
            });
        },
        [props],
    );

    return (
        <AntdSelect
            ref={ref}
            filterOption={false}
            dropdownRender={dropdownRenderer}
            {...props}
        ></AntdSelect>
    );
};

const SelectRef = React.forwardRef(InternalSelect) as <
    VT extends SelectValue = SelectValue,
>(
    props: SelectProps<VT> & {ref?: React.Ref<RefSelectProps>},
) => React.ReactElement;

const Select: AntSelectType = SelectRef as AntSelectType;

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;

export default Select;
export {Select};
