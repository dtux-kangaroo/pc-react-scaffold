import * as React from 'react';
import { Layout, Dropdown, Menu,Avatar,Icon } from 'antd';
import { Link,NavLink } from "react-router-dom";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
declare var  frontConf
import './style.scss';
interface IProps {
  topNav:any,
  location:any
}
interface IState{
  loading:boolean
}
export default class TopBar extends React.Component<IProps,IState> {
  constructor(IProps:any) {
    super(IProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps);
  }
  componentDidMount() {}

  logout() {
    //
  }


  render() {
    const { topNav, location } = this.props;
    let menuKeys=location.pathname.match(/\/\w*/g);
    const topMenu=(
      <Menu  mode="horizontal"
        theme="dark"
        selectedKeys={[menuKeys[0]]}
        style={{ verticalAlign: 'middle',lineHeight: '62px'}} >
        {topNav.length?
          topNav.map((item,idx)=>(
            item.children.length?
          <SubMenu title={<span>{item.permissionName}</span>}>
           { item.children.map((child,kc)=>(
              <Menu.Item key={child.permissionUrl.match(/\/\w*/g)[0]}>  
                <NavLink to={child.permissionUrl}>{child.permissionName}</NavLink>
              </Menu.Item>
            ))}
            </SubMenu>
            :
            <Menu.Item key={item.permissionUrl.match(/\/\w*/g)[0]}>  
              <NavLink to={item.permissionUrl}>{item.permissionName}</NavLink>
            </Menu.Item>
          )):<Icon type="appstore" />
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
    return <Header className="top-bar">
      <div className="logo">
        <Link to="/index">
          <img src={ frontConf.COMPANY_LOGO } alt="logo"/>
          {frontConf.LAYOUT}
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
  }
}
