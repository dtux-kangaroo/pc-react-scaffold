import * as React from 'react';
import { Layout, Menu, Icon, Avatar,Dropdown } from "antd";
import { Link} from "react-router-dom";
//import { getCookie,delAllCookies } from '@/utils/cookieUtils';
import './style.scss';
declare var  frontConf
const { Header } = Layout;
import { API } from '@/api'
interface IProps {
    navData:any,
    location:any,
    userData:any
  }
  interface IState{
    username:any
  }
export default class TopBar extends  React.Component<IProps,IState>{
    constructor(IProps:any) {
        super(IProps);
    }
    state:IState={
        username:'admin'
    }
  componentDidMount(){
    // const username = getCookie('dt_username');
    // this.setState({
    //   username
    // })
  }
  handleItem=(item)=>{
    if(item.key==2){
        //window.location.href=PARAMSCONF.UIC_HOST;
    }else if(item.key==3){
      this.logout();
    }
  }
  logout=()=>{
    API.logOut({})
    .then(ret=>{
      if(ret.success){
        //delAllCookies();
        //window.location.href=PARAMSCONF.UIC_HOST;
      }
    })
  }
  redirectTop=(item, key)=>{
    // const { navData, authCode } = this.props;
    // navData.forEach(nav=>{
    //   if(item.key==nav.permissionUrl){
    //     redirectTop(nav.children,authCode);
    //     return;
    //   }
    // })
  }
  render() {
    const { navData,location } = this.props;
    let menuKeys = location.pathname.split("/");
    const topMenu = (
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[`/${menuKeys[1]}`, menuKeys.join("/")]}
        onClick={this.redirectTop.bind(this)}
      >
        {navData.map((item, idx) =>
            (
             <Menu.Item  key={item.permissionUrl}>
                <Link to={item.permissionUrl}>{item.permissionName}</Link>
              </Menu.Item>
            )
        )}
      </Menu>
    );
    const selfMenu=(
        <Menu onClick={this.handleItem.bind(this)}>
            <Menu.Item key="1"> <Icon type="user" style={{margin: '0 3px'}} />{this.state.username}</Menu.Item>
            <Menu.Item key="2"> <Icon type="team" style={{margin: '0 3px'}} />用户中心</Menu.Item>
            <Menu.Item key="3"><Icon type="logout" style={{margin: '0 3px'}} />退出登录</Menu.Item>
        </Menu>);
    return (
      <Header className="top-bar">
        <div className="logo fl">
            <Link to="/analyse/visitor">
                <img src={frontConf.COMPANY_LOGO} alt="logo" />
                <h1>{frontConf.TITLE}</h1>
            </Link>
        </div>
        <div className="fl top-bar-nav">{topMenu}</div>
        <div className="fr top-bar-right">
            <Dropdown overlay={selfMenu}>
               <Avatar icon="user"/>  
            </Dropdown>
        </div>
      </Header>
    );
  }
}
