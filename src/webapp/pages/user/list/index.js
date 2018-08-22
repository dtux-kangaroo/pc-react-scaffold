import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { Link } from "react-router";
import { Layout, Menu, Breadcrumb,Table,Row, Col } from "antd";
import * as list  from "./aciton"; 
import { isEmpty } from "lodash";
import moment from "moment";
moment.locale("zh-cn");
import {usercln} from './constant'
import assign from "object-assign";
import { ChinaMap2d } from 'easyv-components/src/components/chinaMap2d/index.jsx';
import { config } from 'easyv-components/src/components/chinaMap2d/js/config';
import childrenConfig from 'easyv-components/src/components/chinaMap2d/js/children';
import "./style.scss";


const { Header, Content, Footer } = Layout;
@connect(
  state => ({ ...state.userList }),
  dispatch => bindActionCreators({ ...list}, dispatch)
)
export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList:[],
      isLoad:true
    };
  }
  componentDidMount() {
    this.props.getUserList({});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userList.reload){
      this.setState({userList:nextProps.userList.data,isLoad:false});
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', 
        name: record.name,
      }),
    };
   const{userList,isLoad}=this.state;
    return (
       <Row>
         <Col style={{height:'500px'}}>
          <ChinaMap2d
            configuration={config.configuration}
            childrenConfig={childrenConfig}
          /></Col>
       </Row>
    );
  }
}
