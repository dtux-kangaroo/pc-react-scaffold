import * as React from "react";
import { Table, Divider, Input, Button, Modal, message } from "antd";
import "./style.scss";
import AddAccount from "./components/addAccount";
import {API} from 'api/index'
const confirm = Modal.confirm;
const Search = Input.Search;

type IState = { userList: Array<object>; visible: boolean,
  pageInfo:any};
export default class User extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      userList: [{ name: "lucy", accout: "hello", createTime: "2019-03-22" }],
      visible: false,
      pageInfo:{
        current:1,
        total:0,
        pageSize:10
      }
    };
  }
  componentDidMount(){
    const {pageInfo}=this.state;
    let params={
      ...pageInfo,
      pageNo:0,
      key:''
    }
    this.getListUsingPost(params)
  }
  getListUsingPost=(param:any)=>{
    API.listUsingPost(param)
    .then(ret=>{
      if(ret.success){
        const {pageInfo}=this.state;
        let userList=ret.data.data||[];
        pageInfo.total=ret.data.total;
        this.setState({userList,pageInfo});
      }
    })
  }
  changeTb=(tbInfo)=>{
    const {pageInfo}=this.state;
    pageInfo.current=tbInfo.current;
    let params={
      ...pageInfo,
      pageNo:tbInfo.current,
    }
    this.setState({pageInfo});
   this.getListUsingPost(params);
    
  }
  onSearch = key => {
    const {pageInfo}=this.state;
    pageInfo.key=key;
    let params={
      ...pageInfo,
      pageNo:pageInfo.current
    }
    delete params.current,
    delete params.total;
    this.setState({pageInfo});
    this.getListUsingPost(params);
  };
  retsetPwd=(record)=>{
    confirm({
      title: '确认重置该用户密码 ？',
      content: '',
      okText:"确认",
      onOk() {
        API.resetUsingPost({id:record.id})
        .then(ret=>{
          if(ret.success){
            message.success("重置密码成功")
          }
        })

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  delUser=(record)=>{
    let self=this;
    confirm({
      title: '确认删除该用户 ？',
      content: '',
      okText:"确认",
      onOk() {
        API.deleteUsingPost({id:record.id})
        .then(ret=>{
           if(ret.success){
            const {pageInfo}=self.state;
            let params={
              ...pageInfo,
              pageNo:0,
              key:''
            }
            message.success("删除用户成功");
            self.getListUsingPost(params)
           }else{
            message.warning("删除用户失败")
           }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  openModel = (flag:any) => {
    this.setState({ visible: true });
  };
  closeModel = (flag:any) => {
    const {pageInfo}=this.state;
      this.setState({ visible: false });
      this.getListUsingPost(pageInfo);
  };
  render() {
    const clns = [
      {
        title: "用户名称",
        dataIndex: "userName",
        key: "userName"
      },
      {
        title: "登录账号",
        dataIndex: "userAccount",
        key: "userAccount"
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
            <span className="tb-btn"  onClick={this.retsetPwd.bind(this,record)}>重置密码</span>
            <Divider type="vertical" />
            <span className="tb-btn" onClick={this.delUser.bind(this,record)}>删除</span>
          </span>
        )
      }
    ];
    const { userList, visible,pageInfo} = this.state;
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
        <Table columns={clns} dataSource={userList} onChange={this.changeTb}  pagination={pageInfo}/>
        <Modal visible={visible} footer={null} closable={false}>
          <AddAccount cancel={this.closeModel.bind(true)} />
        </Modal>
        {/* <Modal visible={visiblePwd} footer={null} closable={false}>
          <ResetPwd cancel={this.closeModel.bind(false)} />
        </Modal> */}
      </div>
    );
  }
}
