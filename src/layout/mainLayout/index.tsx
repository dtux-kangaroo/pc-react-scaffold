import * as React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import TopBar from "./topBar";
import SideBar from "./sideBar";
//import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from "@/components/errorBoundary";
import * as _ from 'lodash';

import { bindActionCreators } from "redux";
import "./style.scss";
import { API } from '../../api/index';
const { Header } = Layout;
interface IProps {
  getUserData: (params: any) => void;
  getNavData: (params: any) => void;
  navData: any;
  userData: any;
  location:any
  history: any;
}
interface IState {
  loading: boolean;
  permissionCodeArr: any[];
  permissionNavs: any[];
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
    loading: false,
    permissionNavs: [],
    permissionCodeArr: [],
  };

  static getDerivedStateFromProps(nextProps, state) {
    const navData = _.cloneDeep(nextProps.navData);
    const { permissionCodeArr } = state;
    let filterNav = navData.map(nav => {
      console.log(nav);
      nav.children = nav.children.filter(sub => permissionCodeArr.find(code => code === sub.permissionCode))
      return nav
    })
    return {
      permissionNavs: filterNav
    }
  }

  componentDidMount () {
    this.props.getUserData({});
    this.props.getNavData({});
    API.findUserPermissionCodes({})
      .then(({ success, message, data }) => {
        if (success) {
          console.log(data);
          let permissionCodes = new Set();
          data.forEach(permission => {
            permission.parentPermissionCode && permissionCodes.add(permission.parentPermissionCode);
            permissionCodes.add(permission.permissionCode);
          })
          // console.log(permissionCodes);
          const permissionCodeArr = [...permissionCodes];
          // console.log(permissionArr)
          // let filterNav = navData.map(nav => {
          //   console.log(nav);
          //   nav.children = nav.children.filter(sub => permissionCodeArr.find(code => code === sub.permissionCode))
          //   return nav
          // })
          this.setState({ permissionCodeArr });
        }
      })
  }

  render() {
    const { history,location, userData } = this.props;
    const { permissionNavs } = this.state;
    console.log(permissionNavs)
    const currentTopNav = permissionNavs.find(nav => new RegExp(nav.permissionUrl).test(location.pathname))
    return (
      <Layout className="main-layout">
        <ErrorBoundary>
          <Header>
            <TopBar
              location={location}
              navData={permissionNavs}
              userData={userData}
            />
          </Header>
          <Layout className="top-layout">
            <SideBar location={location} history={history} navData={currentTopNav} />
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
