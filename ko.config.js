const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isProd = process.env.NODE_ENV == "production";
module.exports = context => {
  // const { webpack } = context;
  return {
    server: {
      host: "0.0.0.0",
      port: "8080"
    },
    proxy: [
      {
        path: ["/log/api/v2/**"],
        target: 'http://172.16.10.91:8856',
        changeOrigin: true
      }
    ],
    dll: [
      "react",
      "react-dom",
      "react-router",
      "moment",
      "mirror-creator",
      "lodash",
      "echarts",
      "echarts-wordcloud"
    ],
    webpack: {
      entry: {
        index: path.resolve(__dirname, "src/index.js")
      },
      module: {
        rules: []
      },
      plugins: [
        new CopyWebpackPlugin([
          { from: path.resolve(__dirname, "public/config"), to: "config" },
          { from: path.resolve(__dirname, "public/mock"), to: "mock" },
          { from: path.resolve(__dirname, "public/assets"), to: "assets" }
        ])
      ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, 'src'),
          assets: path.resolve(__dirname, 'public/assets'),
          components: path.resolve(__dirname, 'src/components/'),
          pages: path.resolve(__dirname, 'src/pages/'),
          utils: path.resolve(__dirname, 'src/utils/'),
          constants: path.resolve(__dirname, 'src/constants/'),
          layouts: path.resolve(__dirname, 'src/layouts/')
        }
      },
      externals: {
        PARAMSCONF: "PARAMSCONF"
      }
    }
  };
};
