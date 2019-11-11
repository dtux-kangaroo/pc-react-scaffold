import * as React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import Routers from './router/index'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import "assets/styles/index.scss";
import "assets/styles/antd.less";
import store from './store';
import  '@babel/polyfill';
import { getNavData } from '@/pages/global/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPermissionCode } from './pages/global/action';

@connect(state => ({...state}), dispatch => bindActionCreators({ getNavData, getPermissionCode }, dispatch))
class App extends React.Component<any, any>{
	
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getNavData({});
		this.props.getPermissionCode({});
	}

	render():JSX.Element{
		return(
			<LocaleProvider  locale={zh_CN}>
				<Provider store={store}>
					<Routers />
				</Provider>
			</LocaleProvider>
		)
	}
}
render(<App store={store} />,document.getElementById('root'))

