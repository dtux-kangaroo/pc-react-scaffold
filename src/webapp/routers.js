import React from "react";
import { Route, Router, Switch,Redirect } from "react-router-dom";
import Loadable from 'react-loadable'
import Loading from './components/loading'
//import GlobalTpl from "./tpls/globalTpl";
import AuthTpl from "./tpls/authTpl"
const GlobalTpl = Loadable({loader: () => import('./tpls/globalTpl'),loading: Loading})
import createHistory from "history/createBrowserHistory";
//import createHistory from "history/createHashHistory";
const history = createHistory(); //暂无使用


export default class Routers extends React.Component {
  
  render() {
    return (
      <Router history={history}>
       <Switch>
        <Route  path='/app' component={GlobalTpl}></Route>
        <Route  path='/auth' component={AuthTpl}></Route>
        <Redirect to="/app/noexist" /> 
			</Switch> 
      </Router>
    );
  }
}
