import {useState, useRef, useLayoutEffect} from 'react';
import React from 'react';
import {Select} from './select';
import {Select as ASelect} from 'antd';
import 'antd/es/select/style/index';
import {RefSelectProps} from 'rc-select';

const {Option, OptGroup} = Select;

const provinces =
    '北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区'.split(
        ',',
    );
const options = provinces.map((p) => ({
    value: p,
    label: p,
}));

function Demo() {
    const ref1 = useRef<RefSelectProps>(null);
    const ref2 = useRef<RefSelectProps>(null);
    useLayoutEffect(() => {
        console.log(ref1.current);
        console.log(ref2.current);
    });

    return (
        <div className="App" style={{width: '100%', height: '100%'}}>
            <Select
                showSearch
                ref={ref1}
                placeholder="包装过的Select"
                style={{marginRight: 20, width: 240}}
                // options={options}
                // optionFilterProp="label"
            >
                {provinces.map((value, index) => {
                    return (
                        <Option value={value} key={value}>
                            {index % 5 === 0 ? (
                                <span>
                                    {value}
                                    <span style={{color: 'red'}}>
                                        ({value.split('').reverse().join('')})
                                    </span>
                                    支持jsx
                                </span>
                            ) : (
                                value
                            )}
                        </Option>
                    );
                })}
                {/* <OptGroup label="Manager">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </OptGroup>
                <OptGroup label="Engineer">
                    <Option value="Yiminghe">yiminghe</Option>
                </OptGroup> */}
            </Select>

            <ASelect
                showSearch
                ref={ref2}
                placeholder="原始Select"
                style={{marginRight: 20, width: 240}}
            >
                {provinces.map((value) => {
                    return (
                        <ASelect.Option value={value} key={value}>
                            {value}
                        </ASelect.Option>
                    );
                })}
            </ASelect>
        </div>
    );
}

export default Demo;
