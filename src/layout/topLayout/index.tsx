import * as React from 'react';
import { Layout } from "antd";
import { connect } from "react-redux";
import TopBar from "./topBar";
import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';
import { bindActionCreators } from "redux";
import './style.scss';

interface IProps {
  getNavData:(params:any) => void,
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
    const {  location } = this.props;
    return (
        <Layout className="top-layout">
          <ErrorBoundary>
          <TopBar location={location}/>
          <Layout>
            <div className="content">
              {this.props.children}
            </div>
            <Foot/>
          </Layout>
          </ErrorBoundary>
        </Layout>
    );
  }
}
