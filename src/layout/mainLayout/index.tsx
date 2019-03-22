import * as React from 'react';
import { Layout } from "antd";
import { connect } from "react-redux";
import TopBar from "./topBar/index";
//import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';

import { bindActionCreators } from "redux";
import './style.scss';
const { Header } = Layout;
interface IProps {
  getNavData:(params:any) => void,
  navData:{
    topNav:Array<string>
  },
  location:any
}
interface IState{
  loading:boolean
}


@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class MainLayout extends React.Component<IProps,IState> {
  constructor(props:IProps) {
    super(props);
  }
  state:IState={
    loading:false
  }
  componentDidMount() {
    //console.log($('#sdff').text());
    this.props.getNavData({});
  }
  componentWillReceiveProps(nextProps) {}
  render() {
    const {  navData, location } = this.props;
    return (
       <Layout className="main-layout">
       <ErrorBoundary>
        <Header><TopBar location={location}  topNav={navData.topNav} /></Header>
        <Layout className="top-layout">
          <Layout>
            <div className="content">{this.props.children}</div>
            {/* <Foot/> */}
          </Layout>
        </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
