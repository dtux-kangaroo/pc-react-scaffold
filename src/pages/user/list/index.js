import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Table,Row, Col } from "antd";
import * as list  from "./aciton";
import moment from "moment";
moment.locale("zh-cn");
import {usercln} from './constant';
import "./style.scss";

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
      <div className="container">
       <Row>
         <Col><Table rowSelection={rowSelection} bordered  rowKey="id"    loading={isLoad} columns={usercln} dataSource={userList} /></Col>
       </Row>
      </div>
      
    );
  }
}
