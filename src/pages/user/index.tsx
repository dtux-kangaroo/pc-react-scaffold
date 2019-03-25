import * as React from "react";
import { Table, Divider, Input, Button, Modal } from "antd";
import "./style.scss";
import AddAccount from "./components/addAccount";
import ResetPwd from "./components/resetPwd";
const Search = Input.Search;

type IState = { userList: Array<object>; visible: boolean,visiblePwd:boolean};
export default class User extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      userList: [{ name: "lucy", accout: "hello", createTime: "2019-03-22" }],
      visible: false,
      visiblePwd:false
    };
  }
  onSearch = key => {
    console.log(key);
  };
  openModel = (flag:any) => {
    if(flag){
      this.setState({ visible: true });
    }else{
      this.setState({ visiblePwd: true });
    }

    this.setState({ visible: true });
  };
  closeModel = (flag:any) => {
    if(flag){
      this.setState({ visible: false });
    }else{
      this.setState({ visiblePwd: false });
    }
  };
  render() {
    const clns = [
      {
        title: "用户名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "登录账号",
        dataIndex: "accout",
        key: "accout"
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime"
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.openModel.bind(false)}>重置密码</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        )
      }
    ];
    const { userList, visible,visiblePwd} = this.state;
    return (
      <div className="user-page">
        <div className="page-title">用户管理</div>
        <div className="page-action">
          <div className="fl">
            <Search
              placeholder="请输入人员姓名或账号关键词"
              onSearch={this.onSearch}
              style={{ width: 360 }}
            />
          </div>
          <div className="fr">
            <Button type="primary" onClick={this.openModel.bind(true)}>
              创建账号
            </Button>
          </div>
        </div>
        <Table columns={clns} dataSource={userList} />
        <Modal visible={visible} footer={null} closable={false}>
          <AddAccount cancel={this.closeModel.bind(true)} />
        </Modal>
        <Modal visible={visiblePwd} footer={null} closable={false}>
          <ResetPwd cancel={this.closeModel.bind(false)} />
        </Modal>
      </div>
    );
  }
}
