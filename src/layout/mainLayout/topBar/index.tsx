import * as React from 'react';
import { Layout, Dropdown, Menu,Icon,Modal } from 'antd';
import { Link,NavLink } from "react-router-dom";
const { Header } = Layout;
//sconst SubMenu = Menu.SubMenu;
const person=require('assets/imgs/yonghutouxiang.png')
declare var  frontConf
import ModifyPwd from './components/modifyPwd'
import {API} from 'api/index'
import './style.scss';
interface IProps {
  topNav:any,
  userData:any,
  history:any
}
interface IState{
  loading:boolean,
  visible:boolean
}
export default class TopBar extends React.Component<IProps,IState> {
  constructor(IProps:any) {
    super(IProps);
  }
  state:IState={
    visible:false,
    loading:false
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props !== nextProps;
  // }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps);
  }
  componentDidMount() {}

  logout=()=>{
    API.logoutUsingGet()
    .then(ret=>{
      this.props.history.push('/login');
    })
  }
  openModel=()=>{
    this.setState({visible:true});
  }
  closeModel=(flag:any)=>{
    if(flag!=1){
      this.logout();
    }
    this.setState({visible:false});
  }

  render() {
    const { userData } = this.props;
    const {visible}=this.state;
    //console.log();
    //let menuKeys=location.pathname.match(/\/\w*/g);
    // const topMenu=(
    //   <Menu  mode="horizontal"
    //     theme="dark"
    //     selectedKeys={[menuKeys[0]]}
    //     style={{ verticalAlign: 'middle',lineHeight: '62px',width:"360px"}} >
    //     {topNav.length?
    //       topNav.map((item,idx)=>(
    //         item.children.length?
    //       <SubMenu title={<span>{item.permissionName}</span>}>
    //        { item.children.map((child,kc)=>(
    //           <Menu.Item key={child.permissionUrl.match(/\/\w*/g)[0]}>  
    //             <NavLink to={child.permissionUrl}>{child.permissionName}</NavLink>
    //           </Menu.Item>
    //         ))}
    //         </SubMenu>
    //         :
    //         <Menu.Item key={item.permissionUrl.match(/\/\w*/g)[0]}>  
    //           <NavLink to={item.permissionUrl}>{item.permissionName}</NavLink>
    //         </Menu.Item>
    //       )):<Icon type="appstore" />
    //     }
    // </Menu>
    // );
    const selfMenu=(
      <Menu >
        <Menu.Item key="1">
          <NavLink to='/user'>用户管理</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <span onClick={this.openModel}>修改密码</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span onClick={this.logout}>退出</span>
        </Menu.Item>
      </Menu>
    )
    return(<Header>
       <div className="top-bar">
       <div className="logo">
        <Link to="/">
          <img src={ frontConf.COMPANY_LOGO } alt="logo"/>
        </Link>
      </div>
      <div className="fl top-bar-title">
        <Link to="/">
          杭州西湖风景名胜区云数据中心
        </Link>
       {/* {topMenu} */}
      </div>
      <div className="fr">
        <Dropdown overlay={selfMenu}>
          <div className="right user-moudle" style={{height:52}}>
              <img src={person}></img>
              <span className="name">{userData.userAccount}  </span> 
              <Icon type="down" />
          </div> 
        </Dropdown>
      </div>
      </div>
      <Modal visible={visible} footer={null} onCancel={this.closeModel.bind(this,1)}>
       <ModifyPwd userData={userData} cancel={this.closeModel}></ModifyPwd>
      </Modal>
     </Header>
    )
  }
}
