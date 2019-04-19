const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (context) => {
  // const { webpack } = context;
  return {
    server: {
      "host": '127.0.0.1',
      "port": "8090"
    },
    proxy: [{
      "path": '/api/v1/**',
      "target": 'http://172.16.8.194:9999', //http://172.16.8.194:9999/
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
      externals :{
        'FRONT_CONF': 'FRONT_CONF',
      }
    }
  };
};