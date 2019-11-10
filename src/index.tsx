import * as React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import Routers from './router/index'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import "assets/styles/index.scss";
import "assets/styles/antd.less";
import store from './store';
import  '@babel/polyfill'
// import { API } from './api/index';

class App extends React.Component{
	
	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	render():JSX.Element{
		return(
			<Provider store={store}>
				<Routers />
			</Provider>
		)
	}
}
render(<LocaleProvider locale={zh_CN}><App/></LocaleProvider>,document.getElementById('root'))

