## 从一个空目录建立webpack+react+typescript+eslint脚手架

### 更新日志
```
1. 初步生成parcel
2. 引入typescript react react-dom antd less babel相关实现antd按需加载基础页面
3. 移植react-ts-eslint-wp4中业务组件相关代码（差个svg渲染失败问题未解决）
```
### 后续计划
```

```
### 涉及的内容大致包含：
```
```
### 目录结构
```
├── dist                    生产目录
├── public                  外部资源文件目录-会随着生产过程复制到dist目录下
├── src                     项目主体
│   ├── assets                  内部资源文件
│   ├── interfaces              接口定义文件
│   ├── model                   Model层数据处理 
│   ├── service                 数据请求处理
│   ├── types                   .d.ts 声明文件
│   ├── utils                   工具文件目录
│   └── pages                   业务组件
├── .prettierrc.js          代码格式化配置文件
├── postcss.config.js       POSTCSS配置文件
└── tsconfig.json           指定了用来编译这个项目的根文件和编译选项。
```