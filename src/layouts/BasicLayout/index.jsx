import React from 'react';
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { connect } from "react-redux";
import { Link,NavLink } from "react-router-dom";
import classNames from 'classnames';
import * as global from "@/store/actions";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import './style.scss';
const { Header } = Layout;

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
class BasicLayout extends React.PureComponent {
  static propTypes = {
      location: PropTypes.object.isRequired
    }
  componentDidMount() {
    const {getNavData} = this.props;
    //获取侧边栏数据
    getNavData({});
  }
  render() {
    const { navData,children,location,className } = this.props;
    const { topNav } = navData;
    const menuKeys = location.pathname.match(/\/\w*/g);
    const topMenu=(
      <Menu  mode="horizontal"
        selectedKeys={[menuKeys[0]]}
        style={{ verticalAlign: 'middle',lineHeight: '60px', background:'#1A76D2'}} >
        {topNav.length?
          topNav.map((item,idx)=>(
            <Menu.Item key={item.permissionUrl.match(/\/\w*/g)[0]}>  
                        <NavLink to={item.permissionUrl}>{item.permissionName}</NavLink>
            </Menu.Item>
          )):<Menu.Item></Menu.Item>
        }
      </Menu>
    );
    const selfMenu=(
      <Menu onClick={this.logout}>
        <Menu.Item key="1">
            <NavLink to='/login'>退出</NavLink>
        </Menu.Item>
      </Menu>
    )
    return (
       <Layout className={classNames("layout-basic",className)}>
        <Header className="header">
          <div className="logo">
            <Link to="/index">
              <img src={ FRONT_CONF.COMPANY_LOGO } alt="logo"/>
            </Link>
          </div>
          <div className="fl top-bar-nav">
            {topMenu}
          </div>
          <div className="fr">
            <Dropdown overlay={selfMenu}>
                  <div className="right user-moudle" style={{height:52}}>
                      <Link to={{ pathname: '/login' }}>
                          <Avatar icon="user" />
                          <span className="name"> kangaroo</span>
                      </Link>
                  </div> 
              </Dropdown>
          </div>
        </Header>
        <Layout className="main">{children}</Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout)