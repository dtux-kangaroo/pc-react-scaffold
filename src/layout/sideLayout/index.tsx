import * as React from 'react';
import { Layout } from "antd";
import { connect } from "react-redux";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';
import { bindActionCreators } from "redux";
import './style.scss';

interface IProps {
  getNavData:(params:any) => void,
  navData:{
    topNav:Array<string>,
    sideNav:Array<string>,
  },
  location:any,
  history:any
}
interface IState{
  loading:boolean
}
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class SideLayout extends React.Component<IProps,IState> {
  constructor(IProps:any) {
    super(IProps);
  }
  state:IState={
    loading:false
}
  componentDidMount() {
    this.props.getNavData({});
  }
  componentWillReceiveProps(nextProps) {}


  render() {
    const {  navData, location,history } = this.props;
    return (
        <Layout className="side-layout">
        <ErrorBoundary>
          <SideBar location={location} history={history} navData={navData.sideNav}/>
          <Layout>
            <TopBar location={location}  />
            <div className="content">{this.props.children}</div>
            <Foot/>
          </Layout>
          </ErrorBoundary>
        </Layout>
    );
  }
}
