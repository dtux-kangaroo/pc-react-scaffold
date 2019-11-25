import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from './store';
import Routers from './router/index';
import zhCN from 'antd/es/locale/zh_CN';
import "assets/css/antd.less";
import 'assets/css/global.scss'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    )
  }
}
render(
  <ConfigProvider locale={zhCN}><App /></ConfigProvider>,
  document.getElementById('root')
)
