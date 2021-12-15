import {useLayoutEffect, useRef, useState} from 'react';
import {options} from './data';
import {Cascader} from 'antd';
import type {
    ShowSearchType,
    FieldNames,
    DataNode,
} from 'rc-cascader/lib/interface';
import {pinYinFuzzSearch} from '@dpdfe/tools';
import PinyinMatch from 'pinyin-match';
import 'antd/es/cascader/style/index';

import './App.css';
import {CascaderRef} from 'antd/lib/cascader';

function highlightKeyword(
    str: string,
    lowerKeyword: string,
    prefixCls: string | undefined,
) {
    const cells = str
        .toLowerCase()
        .split(lowerKeyword)
        .reduce(
            (list, cur, index) =>
                index === 0 ? [cur] : [...list, lowerKeyword, cur],
            [],
        );
    const fillCells: React.ReactNode[] = [];
    let start = 0;

    cells.forEach((cell, index) => {
        const end = start + cell.length;
        let originWorld: React.ReactNode = str.slice(start, end);
        start = end;

        if (index % 2 === 1) {
            originWorld = (
                <span
                    className={`${prefixCls}-menu-item-keyword`}
                    key="seperator"
                >
                    {originWorld}
                </span>
            );
        }

        fillCells.push(originWorld);
    });

    return fillCells;
}

let path_list: DataNode[][] = [];
let match_list = new Map<string, Map<string, boolean>>();
let has_path_list = false;

const defaultSearchRender: ShowSearchType['render'] = (
    inputValue,
    path,
    prefixCls,
    fieldNames,
) => {
    const optionList: React.ReactNode[] = [];

    // We do lower here to save perf
    const lower = inputValue.toLowerCase();

    has_path_list = true;

    path.forEach((node, index) => {
        if (index !== 0) {
            optionList.push(' / ');
        }

        let label = (node as any)[fieldNames.label!];
        const type = typeof label;
        if (type === 'string' || type === 'number') {
            label = highlightKeyword(String(label), lower, prefixCls);
        }

        optionList.push(label);
    });
    return optionList;
};

let searchConfig: ShowSearchType = {
    render: defaultSearchRender,
    filter(input, path) {
        if (!has_path_list) {
            // 未缓存过全部path_list
            const res = pinYinFuzzSearch(input, path, {
                textProvider(dn) {
                    return dn.label!.toString();
                },
            });

            path_list.push(path);
            return res.length === 0;
        }

        if (!match_list.has(input)) {
            // 没有input的缓存
            const now = performance.now();
            const match_result = new Map<string, boolean>();

            const res = pinYinFuzzSearch(input, path_list, {
                textProvider(dn) {
                    return dn.map((item) => item.label).join('');
                },
            });
            res.forEach((item) => {
                match_result!.set(item.map((i) => i.label).join('-'), true);
            });

            console.log(performance.now() - now);
            match_list.set(input, match_result);
        }

        const match_result = match_list.get(input);

        const string_path = path.map((i) => i.label).join('-');

        return match_result!.has(string_path);
    },
    limit: Infinity,
};

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
