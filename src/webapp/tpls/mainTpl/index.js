import React, { Component } from 'react';
import { Layout, Icon } from "antd";
import { connect } from "react-redux";
import TopNav from "../../components/topNav";
import SideNav from "../../components/sideNav";
import Foot from '../../components/footer'
import * as global from "../../pages/global/action";
import { bindActionCreators } from "redux";
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class MainTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getNavData({});
  }
  componentWillReceiveProps(nextProps) {}


  render() {
    const {  navData,match, location } = this.props;
    return (
      <Layout>
      <TopNav />
      <Layout>
        <SideNav location={location}  sideData={navData}/>
        <Layout className="layout" >
          {this.props.children}
        </Layout>
      </Layout>
      <Foot/>
    </Layout>
    );
  }
}
