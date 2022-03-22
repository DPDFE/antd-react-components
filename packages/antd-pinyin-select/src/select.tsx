import {Select as AntdSelect, SelectProps} from 'antd';
import React, {
    ReactElement,
    Ref,
    cloneElement,
    forwardRef,
    isValidElement,
    useCallback,
    useEffect,
} from 'react';

import {PinYinFuzzSearchOption} from '@dpdfe/tools/dist/pinyin_search';
import {RefSelectProps} from 'rc-select';
import {SelectValue} from 'antd/lib/select';
import {pinYinFuzzSearch} from '@dpdfe/tools';
import {renderToString} from 'react-dom/server';

const {Option, OptGroup, SECRET_COMBOBOX_MODE_DO_NOT_USE} = AntdSelect;

type AntSelectType = typeof AntdSelect;

interface Props
    extends SelectProps<SelectValue>,
        PinYinFuzzSearchOption<SelectValue> {}

const InternalSelect = (props: Props, ref: Ref<RefSelectProps>) => {
    // 用来存储匹配后的结果, 减少重复匹配的工作量
    let input_res_map = new Map<string, any[]>();

    useEffect(() => {
        input_res_map = new Map<string, any[]>();

        return () => {
            input_res_map = new Map<string, any[]>();
        };
    }, [props]);

    const dropdownRenderer = useCallback(
        (originNode: ReactElement) => {
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
                    textProvider: props?.textProvider
                        ? props.textProvider
                        : (item: any) =>
                              is_children
                                  ? convertJsxToString(item.children)
                                  : convertJsxToString(item[optionFilterProp]),
                    sort: props?.sort ? props.sort : 'AUTO',
                    multiple: props?.multiple ? props.multiple : 'ANY',
                    separator: props?.separator ? props.separator : ' ',
                });

                input_res_map.set(input, res);
            }

            return cloneElement(originNode, {
                options: res,
                flattenOptions: res.map(o => ({
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

/**
 * 转化option里潜在的 ReactElement| ReactElement[] 为string，避免报错
 * @param origin_input - option
 */
function convertJsxToString(
    origin_input: string | ReactElement | ReactElement[],
): string {
    let node_children = [] as any[];

    if (Array.isArray(origin_input)) {
        node_children = origin_input;
    } else {
        node_children = [origin_input];
    }

    const string_input = node_children
        .map(child => {
            if (isValidElement(child)) {
                const html = renderToString(child) || '';
                return new DOMParser().parseFromString(html, 'text/html')
                    .documentElement.textContent;
            }
            return child;
        })
        .join('');

    return string_input;
}

const SelectRef = forwardRef(InternalSelect) as <
    VT extends SelectValue = SelectValue
>(
    props: SelectProps<VT> & {
        ref?: Ref<RefSelectProps>;
    } & PinYinFuzzSearchOption<VT>,
) => ReactElement;

type MyAntSelectType = typeof SelectRef & AntSelectType;

const Select: MyAntSelectType = SelectRef as MyAntSelectType;

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;

export default Select;
export {Select};
