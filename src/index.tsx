import * as React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { LocaleProvider } from 'antd';
import Routers from './router/index'
import "assets/styles/index.scss";
import "assets/styles/antd.less";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store from './store';
import  '@babel/polyfill'
export const history = createHistory();

class App extends React.Component{
    
    constructor(props) {
        super(props)
    }

    render():JSX.Element{
        return(
          <Provider store={store}>
          <LocaleProvider locale={zhCN}>
            <Routers />
          </LocaleProvider>
        </Provider>
        )
    }
}
render(<App/>,document.getElementById('root'))

