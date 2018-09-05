const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, 'dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const theme = require('../antd-theme.js');
module.exports = {
  mode: "production",
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'moment', 'echarts'],
    app: [path.resolve(__dirname, '../src/webapp/app.js')]
  },
  output: {
    path: buildPath,
    publicPath: "/",
    chunkFilename: "js/[name].[hash].js",
    filename: "js/[name].[hash].js",
  },
  externals:{
    'FRONT_CONF': 'FRONT_CONF',
    'stompjs':'Stomp',
    'sockjs':'SockJS'
  },
  module: {
    rules: [{
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader?{modifyVars:" + JSON.stringify(theme) + "}"
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.ejs$/,
        use: ["ejs-loader"]
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use: ['file-loader?name=fonts/[hash:8].[name].[ext]']
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?[tv]=[\d.]+)*$/,
        use: ['file-loader?limit=8192&name=images/[hash:8].[name].[ext]']
      },
      {
        test: /\.(js)$/,
        use: ["strip-loader?strip[]=debug,strip[]=console.log"],
        exclude: /node_modules/
      },
    ]
  },
  performance: { 
    hints: false, 
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 3000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor'
        },
        echarts: {
          chunks: 'all',
          name: 'echarts',
          test: /[\\/]echarts[\\/]/,
        }
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[hash].css"
    }),
    new HtmlWebpackPlugin({
      title: "use plugin",
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/webapp.ejs'),
      hash: false,
      chunksSortMode: "none",
      assets: {
        favicon: '/images/favicon.ico',
        config_js: '/conf/conf.prod.js'
      }
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(rootPath, './src/webapp/config'),
        to: "./conf"
      },
      {
        from: path.resolve(__dirname, '../mock'),
        to: "./mock"
      },
      {
        from: path.resolve(rootPath, './src/webapp/assets/img'),
        to: "./images"
      },
      {
        from: path.resolve(rootPath, './src/webapp/assets/libs'),
        to: "./libs"
      }
    ]),
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true)
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      assets: path.resolve(__dirname, '../src/webapp/assets'),
      components: path.resolve(__dirname, '../src/webapp/components/'),
      pages: path.resolve(__dirname, '../src/webapp/pages/'),
      tpls: path.resolve(__dirname, '../src/webapp/tpls/'),
      constants:path.resolve(__dirname, '../src/webapp/constants/'),
      utils:path.resolve(__dirname, '../src/webapp/utils/'),
    }
  },
  externals: {
    'FRONT_CONF': 'FRONT_CONF'
  }
};
