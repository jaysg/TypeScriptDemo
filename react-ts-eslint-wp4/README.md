## 从一个空目录建立webpack+react+typescript+eslint脚手架

### 更新日志

1. 引入antd 并按需加载 使用babel-plugin-import 相关配置查看官方文档
2. 引入axios 完成接口调用 login & 获得设备列表
3. 使用react hooks完成数据展示
4. 11/25 封装request/axios请求库

### 后续计划

- 优化service和model的结构 
- 上线打包测试
- 开发一个简单的大屏页面，测试postcss的性能和展示效果
- 欢迎补充

### 涉及的内容大致包含：

1. webpack的配置
2. 对静态资源（图片，模板等）的处理
3. 使react项目支持typescript，eslint，prettier等工具
4. 优化webpack配置，减小代码的体积
5. 支持不同的css预处理器（less，sass等）
6. 一套好用的样式方案
7. 使项目支持多个环境切换（开发，测试，预发布，生产等）
8. 使用规则来自动约束代码规范
9. 优化开发体验
10. 一些优化项目性能的建议

### 一些需要注意的事情
1. git commit 报错 原因：Commitlint提交日志检查

    - 常用的type类别
    - upd：更新某功能（不是 feat, 不是 fix）
    - feat：新功能（feature）
    - fix：修补bug
    - docs：文档（documentation）
    - style： 格式（不影响代码运行的变动）
    - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    - test：增加测试
    - chore：构建过程或辅助工具的变动

    - git commit -m 'feat: 增加 xxx 功能'
    - git commit -m 'bug: 修复 xxx 功能'

### 其他

1. 为什么没用redux，引用大佬的一句话：“如果你不知道是否需要 Redux，那就是不需要它。”。在目前的架构中，组件状态共享，跨组件状态控制等常见redux的应用场景react hooks也能轻而易举的实现，that is why。