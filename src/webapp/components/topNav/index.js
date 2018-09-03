import React from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Dropdown, Menu,Avatar } from 'antd';
import classnames from 'classnames';
import { Link,NavLink } from "react-router-dom";
const { Header } = Layout;
import './style.scss'
import pic from '../../assets/img/self.png'

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps);
  }
  componentDidMount() {}

  logout() {
    this.props.history.push('/auth/login');
  }


  render() {
    const { navData, location, userData } = this.props;
    let menuKeys=location.pathname.match(/\/\w*/g);
    const topMenu=(
      <Menu  mode="horizontal"
        selectedKeys={[menuKeys[0]]}
        style={{ verticalAlign: 'middle',display: 'inline-block',lineHeight: '60px', background:'#1A76D2'}} >
        {navData.length?
          navData.map((item,idx)=>(
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
                <span>退出</span>
              </Menu.Item>
      </Menu>
    )
    return <Header className="top-nav">
      <div className="logo">
        <Link to="/index">
          <img src={ FRONT_CONF.COMPANY_LOGO } alt="logo"/>
        </Link>
      </div>
      <div className="top-nav-left">
       {topMenu}
      </div>
      <div className="top-nav-right">
        <Dropdown overlay={selfMenu}>
              <div className="right user-moudle" style={{height:52}}>
                  <Link to={{ pathname: '/pageMembers/memberInfo' }}>
                      <Avatar icon="user" />
                      <span className="name"> kangaroo</span>
                  </Link>
              </div> 
        </Dropdown>
      </div>
    </Header>
  }
}
