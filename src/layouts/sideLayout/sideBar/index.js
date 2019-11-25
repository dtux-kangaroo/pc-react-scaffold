import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from "react-router";
const { SubMenu } = Menu;
const { Sider } = Layout;
import { Link } from "react-router-dom";
import './style.scss'

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
    selectedKeys: [],
    openKeys: ["/analyse"],
    sideData: []
  }

  componentDidMount () {
  }

  logout () {
    this.props.history.push('/auth/login');
  }
  linkToPath = (url) => {
    this.props.history.push(url);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  openKeys = (keys) => {
    const { setOpenKeys } = this.props;
    this.setState({ openKeys: keys })
    //setOpenKeys(keys);
  }
  renderMenu = (data, authCode) => {
    if (data.children.length) {
      return authCode.includes(data.permissionCode) && <SubMenu key={data.permissionUrl} title={<span>{data.permissionIcon && <i style={{ paddingRight: "5px" }} className={`iconfont icon${data.permissionIcon}`}></i>}<span>{data.permissionName}</span></span>}>
        {
          data.children.map((d, i) => this.renderMenu(d, authCode))
        }
      </SubMenu>
    } else {
      return (authCode || []).includes(data.permissionCode) && <Menu.Item key={data.permissionUrl}>
        {data.permissionIcon && <i style={{ paddingRight: "5px" }} className={`iconfont icon${data.permissionIcon}`} onClick={this.linkToPath.bind(this, data.permissionUrl)}></i>}
        <span><Link to={data.permissionUrl}>{data.permissionName}</Link></span>
      </Menu.Item>
    }
  }
  render () {
    const { location, navData, authCode } = this.props;
    let menuKeys = location.pathname.match(/(\/[a-z]+)/g) || [];
    return <Sider width={200} className="side-nav" style={{ background: 'rgba(0, 21, 41, 1)', overflow: 'auto' }}
      trigger={null}
      collapsible
      collapsed={this.state.collapsed}
    >
      {
        PARAMSCONF.NAV_STRETCH && <div className="fold-btn">
          <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle.bind(this)} />
        </div>
      }
      <Menu
        selectedKeys={[menuKeys.length > 3 ? menuKeys.slice(0, 3).join('') : location.pathname]}
        openKeys={this.state.openKeys}
        onOpenChange={this.openKeys.bind(this)}
        mode="inline"
        theme="dark"
        className='side-menu'
      >
        {navData.map((menu) => (this.renderMenu(menu, authCode)))}
      </Menu>
    </Sider>
  }
}