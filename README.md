# antd-react-components

antd react 组件库拓展

## antd-pinyin-select

-   二次封装 antd 的 Select 组件，支持拼音模糊搜索

### 安装

    npm install --save @dpdfe/antd-pinyin-select babel-plugin-import

### 使用方式

1. 正常使用，拥有完整 antd Select 定义

    `import {Select} from '@dpdfe/antd-pinyin-select';`

2. 改造已有项目

    无需修改代码，在 babelrc 中更改 Select 的引入位置即可

    ```javascript
    // file: babel.config.js
    {
        "plugins":[
            [
                "import",
                {
                    "libraryName": "antd",
                    "style": true,
                    customName: (name, file) => {

                        if (name === 'select') {
                            return '@dpdfe/antd-pinyin-select/es/select';
                        }

                        return `antd/es/${name}`;
                    },
                }
            ]
        ]
    }

    ```

## rc-pinyin-select

-   改造 antd Select 依赖的 rc-select，使 Select 支持拼音搜索

### 安装

    npm install --save @dpdfe/rc-pinyin-select

### 使用方式

配置webpack的alias    


    // file: webpack.config.js
    {
        resolve: {
            alias: {
                'rc-select': '@dpdfe/rc-pinyin-select',
            }
        }
    }


