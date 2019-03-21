const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const serverConfig = require('./server');

module.exports = (context) => {
  // const { webpack } = context;
  return {
    server: {
      "host": serverConfig.host,
      "port": serverConfig.port
    },
    proxy: [{
      "path": '/api/v1/**',
      "target": 'http://172.16.8.194:8891',
      "changeOrigin": true
    }],
    dll:[],
    webpack: {
      //  entry: {
      //  index:path.resolve(__dirname,'src/index.tsx')
      //  },
      output: {},
      module: {
        rules: []
      },
      plugins:[
        new CopyWebpackPlugin([ 
            {from: path.resolve(__dirname,'public/config'),to:'config'},
            {from: path.resolve(__dirname,'public/mock'),to:'mock'},
            {from: path.resolve(__dirname,'public/assets'),to:'assets'},
          ]),
      ],
      // resolve: {
      //       alias: {
      //       "@": path.resolve(__dirname, 'src'),
      //       assets: path.resolve(__dirname, 'public/assets'),
      //       components: path.resolve(__dirname, 'src/components'),
      //       pages: path.resolve(__dirname, 'src/pages'),
      //       api: path.resolve(__dirname, 'src/api'),
      //       utils: path.resolve(__dirname, 'src/utils'),
      //       constants: path.resolve(__dirname, 'src/constants'),
      //       layout: path.resolve(__dirname, 'src/layout')
      //     }
      // },
      externals :{
        'FRONT_CONF': 'FRONT_CONF',
      }
    }
  };
};