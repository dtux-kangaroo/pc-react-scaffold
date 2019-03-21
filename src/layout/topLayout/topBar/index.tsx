import * as React from 'react';
import { Layout, Icon, Dropdown, Menu,Avatar } from 'antd';
import { Link,NavLink } from "react-router-dom";
const { Header } = Layout;
declare var  frontConf
import './style.scss'

interface IProps {
  location:any
}
interface IState{
  loading:boolean
}

export default class TopBar extends React.Component<IProps,IState> {
  constructor(IProps) {
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
        </Link>
      </div>
      <div className="fl top-bar-nav">
       <Menu  mode="horizontal"
         selectedKeys={["mail"]}
       >
         <Menu.Item key="mail" >
          <Icon type="mail" />Navigation One
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="mail" />Navigation 
        </Menu.Item>
       </Menu>
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
