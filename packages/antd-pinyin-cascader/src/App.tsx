import {useLayoutEffect, useRef, useState} from 'react';
import {options} from './data';
import {Cascader} from 'antd';
import type {
    ShowSearchType,
    FieldNames,
    DataNode,
} from 'rc-cascader/lib/interface';
import {pinyinFuzzySearchAdvance, pinYinFuzzSearch} from '@dpdfe/tools';

import 'antd/es/cascader/style/index';

import './App.css';
import {CascaderRef} from 'antd/lib/cascader';

function highlightKeyword(
    str: string,
    position: number[],
    prefixCls: string | undefined,
) {
    const fillCells: React.ReactNode[] = [];

    for (let index = 0; index < str.length; index++) {
        let originWord: React.ReactNode = str[index];
        if (position.includes(index)) {
            originWord = (
                <span
                    className={`${prefixCls}-menu-item-keyword`}
                    key={str + index}
                >
                    {originWord}
                </span>
            );
        }
        fillCells.push(originWord);
    }

    return fillCells;
}

let path_list: DataNode[][] = [];
let match_list = new Map<
    string,
    [Map<string, boolean>, Map<string, Array<number>>]
>();
let match_position = new Map<string, Array<number>>();
const single_match_position = new Map<string | number, Array<number>>();
let single_match_num = 0;
let has_path_list = false;

//TODO: 输入全拼时高亮有问题
const defaultSearchRender: ShowSearchType['render'] = (
    inputValue,
    path,
    prefixCls,
    fieldNames,
) => {
    const optionList: React.ReactNode[] = [];
    const now = performance.now();

    // We do lower here to save perf
    const lower = inputValue.toLowerCase();

    if (!has_path_list) {
        path.forEach((node, index) => {
            if (index !== 0) {
                optionList.push(' / ');
            }

            let label = (node as any)[fieldNames.label!];
            const type = typeof label;
            if (type === 'string' || type === 'number') {
                // if (single_match_position.has(label)) {
                //     label = highlightKeyword(
                //         String(label),
                //         single_match_position.get(label)!,
                //         prefixCls,
                //     );
                // }
            }

            optionList.push(label);
        });

        if (single_match_num !== 1) {
            single_match_num--;
        } else {
            has_path_list = true;
        }
    } else {
        let is_valid_label = true;
        let label: any = path.reduce((pre, cur, index) => {
            let label = (cur as any)[fieldNames.label!];
            const type = typeof label;
            if (type === 'string' || type === 'number') {
                return index === 0 ? label : pre + ' / ' + label;
            } else {
                is_valid_label = false;
                optionList.push(label);
            }

            return pre;
        }, '');

        // label = highlightKeyword(
        //     String(label),
        //     match_position.get(label)!,
        //     prefixCls,
        // );
        optionList.push(label);
    }

    return optionList;
};

let searchConfig: ShowSearchType = {
    render: defaultSearchRender,
    filter(input, path, fieldNames) {
        if (!has_path_list) {
            // 未缓存过全部path_list
            const res = pinyinFuzzySearchAdvance(input, path, {
                textProvider(dn) {
                    return dn.label!.toString();
                },
            });

            for (const [key, value] of res.position) {
                let label = (key as any)[fieldNames.label!];
                const type = typeof label;
                if (type === 'string' || type === 'number') {
                    single_match_position.set(label, value);
                }
            }

            path_list.push(path);
            if (res.result.length > 0) {
                single_match_num++;
            }

            return res.result.length !== 0;
        }

        if (!match_list.has(input)) {
            // 没有input的缓存
            const match_result = new Map<string, boolean>();

            const res = pinyinFuzzySearchAdvance(input, path_list, {
                textProvider(dn) {
                    return dn.map((item) => item.label).join(' / ');
                },
            });
            for (const [key, value] of res.position) {
                match_position.set(
                    key.map((k) => k.label?.toString()).join(' / '),
                    value,
                );
            }

            res.result.forEach((item) => {
                match_result!.set(item.map((i) => i.label).join('-'), true);
            });

            match_list.set(input, [
                new Map(match_result),
                new Map(match_position),
            ]);
        }

        const [match_result, _match_position] = match_list.get(input)!;

        match_position = new Map(_match_position);

        const string_path = path.map((i) => i.label).join('-');

        return match_result!.has(string_path);
    },
    limit: Infinity,
};

//TODO: 卡顿
function App() {
    return (
        <Cascader
            options={options}
            placeholder="Please select"
            showSearch={searchConfig}
        />
    );
}

export default App;
