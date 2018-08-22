**本项目wepack4，测试通过，快来体验吧！**
#### 使用技术
```text
 热更新、ES6/7、LESS、Router4、redux、webpack4、async／await、前端node服务器，按需加载...
```
#### 客户端渲染
```
本项目是客户端渲染版本
对于 HTTP/1.1 客户端，由 webpack 打包你的应用程序会尤其强大，因为在浏览器发起一个新请求时，
它能够减少应用程序必须等待的时间。对于 HTTP/2，你还可以使用代码拆分(Code Splitting)以及通过 
webpack 打包来实现最佳优化。
```

==========================

#### 安装教程

1、 安装依赖包。
```
npm install 或者cnpm install 或者yarn(推荐)

```

2、运行脚手架。
 ```
 npm start

 ```

3、将会开启8080端口.
```
http://127.0.0.1:8080

```

4、打包发布: 默认打包后的文件统一放到dist文件夹下  

```
npm run build

```
5、code编写规则及行为规范请参考

```
https://github.com/cindyrise/doc.git

```

==============================================
### easy引入方式
2.引入组件前
```
（1）build文件夹中dev及prod文件中注释 //exclude
      rules: [{
      test: /\.js|jsx$/,
      use: ['babel-loader'],
      //exclude: /node_modules/,
    },
（2）在ejs中加入
    <script>
      window.appConfig = {
        COMPONENT_URL: 'https://easyv-develop.oss-cn-hangzhou.aliyuncs.com/components/'
      }
    </script>   
```

2.安装组件
```
yarn add ssh://git@git.dtstack.cn:10022/dtstack/easyvcomponent.git
```
3.引入组件
```
import { Text } from 'easyv-components/src/components/text/index';
import { config as textConfig } from 'easyv-components/src/components/text/js/config'; 
```
4.组件调用
```
<Text
  configuration={textConfig.configuration}
  data={[{text: 'hello, world'}]}
/>

```

===========================================


#### 项目结构

```text
├── build //webpack各种环境打包配置
├── mock //测试数据，模拟api接口
├── dist //打包后文件存放文件夹
├── src //项目的主要目录
│     │     └── webapp //webapp目录
│     │     │     ├── assets //此应用对应的静态资源
│     │     │     │     ├── img //全局静态图片目录
│     │     │     │     ├── fonts //全局字体目录
│     │     │     │     ├── lib //全局js类库地址
│     │     │     ├── pages //页面
│     │     │     ├── tpls //模板页面
│     │     │     ├── constants //全局常量
│     │     │     ├── components //全局公用组件
│     │     │     ├── utils //提供一些小工具
│     │     │     ├── app.js //应用的入口
│     │     │     └── routers.js //根路由文件
│     │     └── script //脚本目录
├── webapp.ejs //wepack打包模板文件
├── .babelrc //babel相关配置
└── package.json //node相关环境的配置文件


```
