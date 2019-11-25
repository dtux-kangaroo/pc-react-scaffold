import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import './style.scss';

export default class TableList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    pageNum: 0,
    totalNum: 0,
    selectedRowKeys: [],
    selectedRows: []
  }

  componentDidMount () {
  }

  changePage = pageNum => {
    console.log(pageNum);
    this.setState({
      pageNum
    });
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };

  delete = () => {
    this.props.delTask(this.state.selectedRowKeys);
  }

  render () {
    const { data, col, style, loading, showDelBtn = true } = this.props;
    const { selectedRowKeys, totalNum } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div className="comp-tableList" style={{...style}}>
        <Table
          className="table"
          dataSource={data}
          columns={col}
          rowKey={(record, index) => index}
          rowSelection={rowSelection}
          loading={loading}
          pagination={{
            total: totalNum,
            showTotal: total => `共${total}条，每页10条`,
            onChange: this.changePage
          }}
        />
        {
          showDelBtn && <Button
          className="del-btn"
          disabled={selectedRowKeys.length == 0}
          onClick={this.delete}>删除</Button>
        }
      </div>
    )
  }
}