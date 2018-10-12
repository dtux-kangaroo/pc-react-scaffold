import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import { NavLink } from "react-router-dom";
import './style.scss'

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

@connect(
  state => ({ ...state.global })
)
export default class SiderLayout extends React.Component {
  state = {
    collapsed: false,
    selectedKeys:[],
    openKeys:[],
    sideData:[]
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const {location,navData,children}=this.props;
    const {sideNav} = navData;
    const menuKeys=location.pathname.match(/\/\w*/g),openKeys=menuKeys;
    return (
      <BasicLayout className="layout-sider">
        <Sider className="sider" width={200}
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
          >
          {
            FRONT_CONF.NAV_STRETCH && <div className="fold-btn"> 
              <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}onClick={this.toggle.bind(this)}/>
            </div>
          }
          <Menu
              selectedKeys={[location.pathname]}
              defaultOpenKeys={openKeys}
              mode="inline"
              className='side-menu'
            >
            {
              sideNav.map((item, idx) => (
                item.children.length ?
                  <SubMenu key={item.permissionUrl} title={<span><Icon type="mail" /><span>{item.permissionName}</span></span>}>
                    {
                      item.children.map((dataItem) => (
                        dataItem.children.length?<SubMenu key={dataItem.permissionUrl} title={<span><Icon type="appstore" /><span>{item.permissionName}</span></span>}>
                          {
                            dataItem.children.map((childItem) => (
                              <Menu.Item key={childItem.permissionUrl}>
                                <span><NavLink to={childItem.permissionUrl}>{childItem.permissionName}</NavLink></span>
                              </Menu.Item>
                            ))
                          }
                        </SubMenu> :
                          <Menu.Item key={dataItem.permissionUrl}>  
                            <span><NavLink to={dataItem.permissionUrl}>{dataItem.permissionName}</NavLink></span>
                          </Menu.Item>
                      ))
                    }
                  </SubMenu> :
                  <Menu.Item key={item.permissionUrl}>
                  <Icon type="pie-chart" />
                  <span><NavLink to={item.permissionUrl}>{item.permissionName}</NavLink></span>
                  </Menu.Item>
              ))
            }
            </Menu>
        </Sider>
        <Content className="content">{children}</Content>
      </BasicLayout>
    )
  }
}
