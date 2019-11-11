import * as React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import ErrorBoundary from "@/components/errorBoundary";
import * as _ from 'lodash';
import { bindActionCreators } from "redux";

import * as global from "pages/global/action";
import TopBar from "./topBar";
import SideBar from "./sideBar";
import "./style.scss";
import memoize from '@/utils/memoize';

interface PermissionCode {
  parentPermissionCode?: string;
  permissionCode: string;
}

interface PermissionNav {
  children: PermissionNav[];
  gmtCreate?: string;
  id?: number;
  isMenu?: number;
  level?: number;
  parentId?: number;
  permissionCode: string;
  PermissionIcon?: string;
  permissionName: string;
  permisionUrl: string;
  sort?: number;
}

/**
 * 扁平化权限码，去重
 * @param permissions 权限码数组（后端返回）
 */
const flatPermissionCodes = (permissions: PermissionCode[]) => {
  const permissionSet = new Set();
  for (let i = 0; i < permissions.length; i++) {
    permissions[i].permissionCode && permissionSet.add(permissions[i].permissionCode);
    permissions[i].parentPermissionCode && permissionSet.add(permissions[i].parentPermissionCode);
  }
  return [...permissionSet];
}

/**
 * 生成菜单权限树
 * @param permissionNavs 菜单树
 * @param permisionCodeArr 扁平化权限码
 */
const genPermissionMenu = memoize((permissionNavs: PermissionNav[], permisionCodeArr: string[]): PermissionNav[] {
  permissionNavs = permissionNavs.filter(item => permisionCodeArr.find(code => code === item.permissionCode));
  permissionNavs.forEach(item => item.children = genPermissionMenu(item.children, permisionCodeArr));
  return permissionNavs;
})

const test = (fn: Function, ...args:any[]) => {
  const start: Date = new Date();
  const value = fn(...args);
  const end: Date = new Date();
  console.log((fn.name || 'Anonymous function') + `run costs ${end.valueOf() - start.valueOf()}ms`)
  return value;
}

const { Header } = Layout;
interface IProps {
  getUserData: (params: any) => void;
  getNavData: (params: any) => void;
  openKeys: string[];
  updateOpenKeys: Function;
  navData: PermissionNav[];
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

  static getDerivedStateFromProps(nextProps) {
    const permissionCode: PermissionCode[] = nextProps.permissionCode;
    const navData: PermissionNav[] = _.cloneDeep(nextProps.navData);
    const permissionCodeArr = flatPermissionCodes(permissionCode);
    const filterNav: PermissionNav[] = test(genPermissionMenu, navData, permissionCodeArr);
    return {
      permissionNavs: filterNav
    }
  }

  componentDidMount () {
    this.props.getUserData({});
    this.props.getNavData({});
  }

  render() {
    const { history, location, userData, openKeys, updateOpenKeys } = this.props;
    const { permissionNavs } = this.state;
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
            <SideBar
              location={location}
              history={history}
              navData={currentTopNav}
              openKeys={openKeys}
              updateOpenKeys={updateOpenKeys}
            />
            <Layout>
              <div className="yux-content">{this.props.children}</div>
            </Layout>
          </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
