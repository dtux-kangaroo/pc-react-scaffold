
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, 'dist');
const  theme = require('../antd-theme.js');

module.exports = function makeWebpackConfig() {
  
  let config = {mode:"production"};
  config.entry = {
    vendor: ['react', 'react-dom', 'react-router','moment'],
    app: [path.resolve(__dirname, '../src/webapp/app.js')],
  };

  config.output =  {
    path: buildPath,
    publicPath: '/',
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[chunkhash].js"
  };

  config.module = {
    rules: [{
      test: /\.js|jsx$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.(less|css)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        "css-loader",
        "less-loader?{modifyVars:"+JSON.stringify(theme)+"}"
      ],
     }
    , {
      test: /\.(scss|sass)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, 
    {
      test: /\.(woff|woff2|svg|ttf|eot)$/,
      use:['file-loader?name=fonts/[hash:8].[name].[ext]']
    },
    {
      test: /\.(png|jpg|jpeg|gif)(\?[tv]=[\d.]+)*$/,
      use: ['file-loader?limit=8192&name=images/[hash:8].[name].[ext]']
    },
    {
      test: /\.ejs$/,
      use: ["ejs-loader"]
    }, {
      test: /\.(js|ts)$/,
      use: ["strip-loader?strip[]=debug,strip[]=console.log"],
      exclude: /node_modules/
    },
    ]
  };
  config.optimization= {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, 
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ],
    splitChunks:{
      chunks: 'async',
      minSize:10000,
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
  config.plugins = [
    new webpack.DefinePlugin({__PRODUCTION: JSON.stringify(true)}),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ];
  config.plugins.push(
    new CopyWebpackPlugin([ 
      { from: path.resolve(rootPath, './src/webapp/config'),to:"./conf"},
      {from: path.resolve(__dirname, '../mock'),to:"./mock"},
      {from: path.resolve(rootPath, './src/webapp/assets/img'),to:"./images"},
      {from: path.resolve(rootPath, './src/webapp/assets/libs'),to:"./libs"}
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      　filename: "css/[name].[chunkhash:8].css",
      　chunkFilename: "css/[id].css"
     }),
    new HtmlWebpackPlugin({
      title:"use plugin",
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/webapp.ejs'),
      hash: false,
      chunksSortMode:"none",
      assets: {
        favicon: '/images/favicon.ico',
        config_js: '/conf/conf.prod.js'
      }
     })
  );
  config.performance={
    hints: false
  };
  config.externals = {
    'FRONT_CONF': 'FRONT_CONF'
  };
  return config;
}();

