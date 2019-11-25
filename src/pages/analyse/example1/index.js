import React, { Component } from 'react';
import { connect } from "react-redux";
import * as global from "pages/global/redux/action";
import { bindActionCreators } from "redux";
import { Row, Col, Button, Input, Select, Card, message } from 'antd';
import { API } from '@/api';
import PageHeader from 'components/pageHeader';
import TableList from './components/tableList';
import SideTree from 'components/sideTree';
import ModuleModal from './components/moduleModal';
import './style.scss';

const { Option } = Select;

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class ExamplePage1 extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    level: 0,
    actionName: null,
    showModal: false,
    tableLoading: false,
    firstInput: null,
    lastInput: null
  }

  componentDidMount () {
    console.log(this.props);
  }

  updateActiveItem = item => {
    console.log(item);
    const level = item.key ? item.key.match(new RegExp('-', 'g')).length : 0; // 当前目录级数，根目录为0
    this.setState({
      level
    });
  }

  tableDel = ids => {
    this.setState({
      tableLoading: true
    });
    message.success(ids);
    this.setState({
      tableLoading: false
    });
  }

  search = () => {
    console.log(this.state);
  }

  reset = () => {
    this.setState({
      firstInput: null,
      lastInput: null
    });
  }

  addMenu = () => {
    this.setState({
      actionName: 'add',
      showModal: true
    });
  }

  editMenu = () => {
    this.setState({
      actionName: 'edit',
      showModal: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  render () {
    const { level, tableLoading, actionName, showModal } = this.state;
    const objName =  level > 0 ? '菜单' : '模块';
    const data = [{
      id: 0,
      name: 'aaa',
      highLevel: 'aaa',
      time: '2019',
      sort: 0,
      hidden: 0
    }, {
      id: 1,
      name: 'aaa',
      highLevel: 'aaa',
      time: '2019',
      sort: 1,
      hidden: 0
    }, {
      id: 2,
      name: 'aaa',
      highLevel: 'aaa',
      time: '2019',
      sort: 2,
      hidden: 1
    }];
    const col = [{
      title: objName + '名称',
      dataIndex: 'name'
    }, {
      title: '上级',
      dataIndex: 'highLevel'
    }, {
      title: '创建时间',
      dataIndex: 'time'
    }, {
      title: '排序',
      dataIndex: 'sort'
    }, {
      title: '是否隐藏',
      dataIndex: 'hidden',
      render: (text, record) => (
        <span>{text === 0 ? '否' : '是'}</span>
      )
    }, {
      title: '操作',
      dataIndex: 'option',
      render: (text, record) => (
        <a onClick={this.editMenu}>编辑</a>
      )
    }];
    return (
      <div className="comp-example1">
        <PageHeader title="示例页一" hasTimeSelect={true} />
        <Row style={{ margin: '20px 0', background: '#fff' }}>
          <Col span={6}>
            <SideTree updateActiveItem={this.updateActiveItem} />
          </Col>
          <Col span={18}>
            <div style={{ borderLeft: '1px solid #eee', padding: '20px' }}>
              <div className="search_box">
                <div className="input_wrap">
                  <span>{objName}名称</span>
                  <Input
                    placeholder="请输入名称"
                    maxLength="10"
                    value={this.state.firstInput}
                    onChange={e => this.setState({ firstInput: e.target.value })}
                    style={{ width: 200, margin: '0 30px 0 10px' }}
                  />
                  <span>是否隐藏</span>
                  <Select
                    value={this.state.lastInput}
                    placeholder="请选择"
                    onChange={value => this.setState({ lastInput: value })}
                    style={{ width: 120, marginLeft: '10px' }}
                  >
                  <Option value={0}>否</Option>
                    <Option value={1}>是</Option>
                  </Select>
                </div>
                <Button type="primary" style={{ marginTop: '20px' }} onClick={this.search}>搜索</Button>
                <Button style={{ marginLeft: '20px' }} onClick={this.reset}>重置</Button>
              </div>
              <Button type="primary" style={{ marginTop: '20px' }} onClick={this.addMenu}>
                新增{objName}
              </Button>
              <ModuleModal actionName={actionName} objName={objName} visible={showModal} close={this.closeModal} />
              {/* <DistrictModal/>
              <DictionaryModal/> */}
              <TableList data={data} col={col} loading={tableLoading} delTask={this.tableDel} style={{ marginTop: '20px' }} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}