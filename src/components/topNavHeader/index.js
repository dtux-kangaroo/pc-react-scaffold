import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Dropdown, Menu, Layout, Avatar } from 'antd';
import { globalAction } from '@/pages/global/redux/action';
import { getCookie } from '../../utils/cookieUtils';
import './style.scss';
const { Header } = Layout;

const mapStateToProps = (state) => ({
  navData: state.global
})
const mapDispatchToProps = (dispatch) => ({
  updateNavs(navs, submenu) {
    dispatch(globalAction.updateNavs(navs, submenu))
  }
})

class TopNav extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    username: ''
  }
  componentDidMount() {
    let path = window.location.hash;
    let { navs } = this.props.navData;
    let subnav = [];
    for (let nav of navs) {
      if (path.indexOf(nav.type) > -1) {
        nav.checked = true;
        subnav = nav.children;
      }
    }
    const username = getCookie('dt_username');
    this.setState({
      username: username
    })
    this.props.updateNavs(navs, subnav);
  }
  buildTopNavs = () => {
    let path = window.location.hash;
    let { navs } = this.props.navData;
    let sk = [];
    for (let index in navs) {
      if (path.indexOf(navs[index].type) > -1) {
        sk.push(index + '');
      }
    }
    return <Menu onClick={this.handleClick} selectedKeys={sk} mode="horizontal" theme="dark">
      {navs.map((nav, index) => {
        return <Menu.Item key={index}>
          <Link to={nav.url}>{nav.name}</Link>
        </Menu.Item>
      })}
    </Menu>
  }

  render() {
    const { username } = this.state;
    const menu = (
      <Menu style={{ width: 180 }}>
        <Menu.Item key="1"><Avatar icon="user" size="small" />&nbsp;{username.length <= 17 ? username : username.substring(0, 16) + '...'}</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3"><Icon type="user" />个人信息</Menu.Item>
        {/* <Menu.Item key="4"><Icon type="unlock" />重置密码</Menu.Item> */}
        {/* <Menu.Item key="5"><Icon type="security-scan" />用户管理</Menu.Item> */}
        {/* <Menu.Divider /> */}
        <Menu.Item key="7"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );

    return (
      <Header className="yux-header fix-header clearfix">
        <div className="logo f-fl" id="logo">
          <Link to="/analyse/visitor">
            <img src={PARAMSCONF.COMPANYLOGO} alt="logo" />
            <h1>{PARAMSCONF.TITLE}</h1>
          </Link>
        </div>
        <div className="main-menu f-fl" style={{ marginLeft: 16 }}>
          {this.buildTopNavs()}
        </div>
        <div className="f-fr right-menu">
          <Menu mode="horizontal">
            <Menu.Item key="4" className="logout">
              <Dropdown
                overlay={menu}
              >
                <a href="javascript:;">&nbsp;
                  <Avatar icon="user" />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)
