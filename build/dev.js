
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, 'dist');
const serverConfig = require('./server.js');
const  theme = require('../antd-theme.js');
module.exports = {
  mode:"development",
  devtool: 'cheap-eval-source-map',
  entry:{
    vendor: ['react', 'react-dom', 'react-router','moment', 'echarts'],
    app: [path.resolve(__dirname, '../src/webapp/app.js')]
  },
  output: {
    path: buildPath,
    publicPath: "/",
    chunkFilename: "js/[name].[hash].js",
    filename: "js/[name].[hash].js",
},
  module: {
    rules: [{
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {}
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader?{modifyVars:"+JSON.stringify(theme)+"}"
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", //上面的简写方式
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
        use: ['file-loader?name=[name].[ext]']
      },{
        test: /\.ejs$/,
        use: ["ejs-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/webapp.ejs'),
      hash: false,
      chunksSortMode:"none",
      assets: {
        favicon: '/images/favicon.ico',
        config_js: '/conf/conf.dev.js'
      }
    }),
    new webpack.DefinePlugin({__PRODUCTION: JSON.stringify(false)}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([ 
      { from: path.resolve(rootPath, './src/webapp/config'),to:"./conf"},
      {from: path.resolve(__dirname, '../mock'),to:"./mock"},
      {from: path.resolve(rootPath, './src/webapp/assets/img'),to:"./images"},
      {from: path.resolve(rootPath, './src/webapp/assets/libs'),to:"./libs"}
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'], 
    alias: { 
      assets: path.resolve(__dirname, '../src/webapp/assets'),
      components: path.resolve(__dirname, '../src/webapp/components/'),
      pages: path.resolve(__dirname, '../src/webapp/pages/'),
      tpls: path.resolve(__dirname, '../src/webapp/tpls/')
    }
  },
  devServer: {
    host: serverConfig.host,
    port: serverConfig.port,
    contentBase: buildPath,
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    hot: true,
    inline:true,
    proxy: [{
      path: '/log/api/v2/**',
      target: 'http://log.dev.dtstack.net:81',
      changeOrigin: true
    }]
  },
  externals :{
   'FRONT_CONF': 'FRONT_CONF'
  }
};
