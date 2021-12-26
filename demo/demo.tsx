import {Tabs} from 'antd';
import 'antd/es/tabs/style';
import PinyinSelect from '../packages/antd-pinyin-select/src/demo';
const {TabPane} = Tabs;

const Demo = () => (
    <div style={{padding: 10}}>
        <Tabs type="card" defaultActiveKey="1">
            <TabPane tab="拼音select示例" key="1">
                <PinyinSelect />
            </TabPane>
        </Tabs>
    </div>
);
export default Demo;
