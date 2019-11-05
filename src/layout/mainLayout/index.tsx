import * as React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import TopBar from "./topBar";
import SideBar from "./sideBar";
//import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from "@/components/ErrorBoundary";

import { bindActionCreators } from "redux";
import "./style.scss";
const { Header } = Layout;
interface IProps {
  getUserData: (params: any) => void;
  getNavData: (params: any) => void;
  navData: {
    topNav: Array<string>;
    sideNav: any;
  };
  userData: any;
  location:any
  history: any;
}
interface IState {
  loading: boolean;
}

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class MainLayout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  state: IState = {
    loading: false
  };
  componentDidMount() {
    this.props.getUserData({});
    this.props.getNavData({})
  }
  componentWillReceiveProps(nextProps) {}
  render() {
    const { navData, history,location, userData } = this.props;
    return (
      <Layout className="main-layout">
        <ErrorBoundary>
          <Header>
            <TopBar
              location={location}
              navData={navData.topNav}
              userData={userData}
            />
          </Header>
          <Layout className="top-layout">
            <SideBar location={location} history={history} navData={navData.sideNav} />
            <Layout>
              <div className="yux-content">{this.props.children}</div>
              {/* <Foot/> */}
            </Layout>
          </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
