import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { Table,Row, Col } from "antd";
import * as acitons  from "./acitons"; 
import {usercln} from './constant'
import Hello from './components/Hello'
import "./style.scss";
@connect(
  state => ({ global:state.global,user:state.userList }),
  dispatch => bindActionCreators(acitons, dispatch)
)
export default class UserList extends React.PureComponent {
  componentDidMount() {
    this.props.getUserList({});
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
  
    const {userList,isLoading} = this.props.user;
    const {userData} = this.props.global;
    const {name} = userData;
    return (
      <div className="container">
       <Hello name={name}/>
       <Table rowSelection={rowSelection} bordered  rowKey="id" loading={isLoading} columns={usercln} dataSource={userList} />
      </div>
      
    );
  }
}
