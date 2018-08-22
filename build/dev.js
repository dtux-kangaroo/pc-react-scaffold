const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, 'dist');
const serverConfig = require('./server.js');
const  theme = require('../antd-theme.js');

module.exports = function makeWebpackConfig() {
  let config = {mode:"development"};
  config.entry = {
    vendor: ['react', 'react-dom', 'react-router',
      'moment', 'echarts'
    ],
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${serverConfig.host}:${serverConfig.port}`,
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '../src/webapp/app.js')
    ]
  };

  config.output = {
    path: buildPath,
    publicPath: "/",
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[chunkhash].js"
  };
  config.devtool = 'cheap-eval-source-map';
  config.module = {
    rules: [{
      test: /\.js|jsx$/,
      use: ['babel-loader'],
      //exclude: /node_modules/,
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
        "style-loader",
        "css-loader",
        "sass-loader?sourceMap"
      ]
    }, 
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
      use: ['file-loader?name=[name].[ext]']
    },{
      test: /\.ejs$/,
      use: ["ejs-loader"]
    },{
      test: /\.json$/,
      loader: 'json-loader'
    }
  ]
  };
  config.resolve = {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css', '.json'],
    modules: [
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, '../node_modules'),
    ]
  };
  config.plugins=[];
  config.plugins.push(
    new CopyWebpackPlugin([ 
      { from: path.resolve(rootPath, './src/webapp/config'),to:"./conf"},
      {from: path.resolve(__dirname, '../mock'),to:"./mock"},
      {from: path.resolve(rootPath, './src/webapp/assets/img'),to:"./images"},

    ]),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.DefinePlugin({__PRODUCTION: JSON.stringify(false)}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      　filename: "css/[name].[chunkhash:8].css",
      　chunkFilename: "css/[id].css"
   　}),
   new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/webapp.ejs'),
    hash: false,
    chunksSortMode:"none",
    assets: {
      favicon: '/images/favicon.ico',
      config_js: '/conf/conf.prod.js'
    }
  }),
  );
  config.optimization = {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  };
  config.performance = {
    hints: false
  }
  config.devServer = {
    compress: true,
    hot: true,
    contentBase: buildPath,
    host: serverConfig.host,
    port: serverConfig.port,
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: [{
      path: '/log/api/v2/**',
      target: 'http://log.dev.dtstack.net:81',
      changeOrigin: true
    }]
  };
  config.externals = {
    'FRONT_CONF': 'FRONT_CONF'
  };
  return config;
}();
