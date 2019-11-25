import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import './style.scss';
import { globalAction } from '@/pages/global/redux/action';
const { Sider } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = (state) => ({
  navData: state.global
})
// const mapDispatchToProps = (dispatch) => ({
//   resetTimeFilter() {
//     dispatch(globalAction.resetTimeFilter())
//   }
// })
@connect(mapStateToProps)
export default class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.sks = [];
    this.oks = [];
    this.pathValue = window.location.hash.substring(1);
  }
  state = {
    openKeys: ["130",'140'],
    selectedKeys: [],
  }
  componentDidMount() {
    this.updateSelectMenu(this.pathValue);
  }
  componentDidUpdate() {
    if (this.pathValue != window.location.hash.substring(1)) {
      this.pathValue = window.location.hash.substring(1);
      this.updateSelectMenu(this.pathValue);
      this.props.resetTimeFilter();
    }
  }
  // 设置导航选中和展开，默认展开所有导航
  updateSelectMenu(path) {
    console.log(this.oks);
    this.oks = [];
    this.sks = [];
    const { submenu } = this.props.navData;
    if (submenu.length) {
      for (let menu of submenu) {
        this.loopNodes(menu, path);
      }
    }
    console.log('menu:', path, this.sks);
    this.setState({
      selectedKeys: this.sks
    })
  }
  // 递归遍历导航
  loopNodes(node, path) {
    if (node.children && node.children.length) {
      this.oks.push(node.id + '');
      for (let n of node.children) {
        this.loopNodes(n, path);
      }
    } else {
      // debugger;
      if (node.url == path) {
        this.sks.push(node.id + '');
      }
    }
  }
  // 递归渲染导航
  renderMenuNodes(data) {
    if (data.children && data.children.length) { // 上层导航
      return <SubMenu title={(
        <span>
          {data.icon && <i style={{paddingRight:"5px"}} className={`iconfont icon${data.icon}`}></i>}
          <span>{data.name}</span>
        </span>
      )} key={data.id}>
        {
          data.children.map((d, i) => {
            return this.renderMenuNodes(d)
          })
        }
      </SubMenu>
    } else {
      return <Menu.Item key={data.id}>
        <Link to={data.url}><i style={{paddingRight:"5px"}} className={`iconfont icon${data.icon}`}></i>{data.name}</Link>
      </Menu.Item>
    }
  }
  handleOpen=(keys)=>{
    this.setState({
      openKeys: keys,
    })
  }
  render() {
    const { openKeys, selectedKeys } = this.state;
    const { submenu } = this.props.navData;
    return (
      <Sider
        className=""
        width={200}
        trigger={null}
      >
        <Menu
          className="next-ver menu-position"
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClick={this.handleSelected}
          onOpenChange={this.handleOpen}
        >
          {submenu.map((menu, index) => {
            return this.renderMenuNodes(menu);
          })}
        </Menu>
      </Sider>
    );
  }
}
