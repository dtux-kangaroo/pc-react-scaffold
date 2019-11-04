import * as React from "react";
import "./style.scss";
import { message, Modal, Icon } from 'antd';
import { withRouter } from 'react-router';
import { API } from "api/index";
import TableArea from './components/table-area';
import FormArea from './components/form-area';
import fieldsMap from './fieldsMap';
import  * as moment from 'moment';
//import { url } from 'inspector';
// import token from 'utils/token';
// declare var frontConf
const { confirm } = Modal;

interface IPagination {
  total: number;
  current: number;
  pageSize: number;
}

type IState = {
  recordList: any[];
  pagination: IPagination;
  editMode: EditMode | undefined;
  modalVisible: boolean;
  tableLoading: boolean;
  editRecord: Object;
};

enum EditMode {
  UPDATE,
  ADD,
}

class Home extends React.Component<{}, IState> {
  state: IState = {
    recordList: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
    tableLoading: false,
    modalVisible: false,
    editMode: undefined,
    editRecord: {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.getRecordList(this.state.pagination)
  }

  setEditRecord = (record: Object) => {
    this.setState({ editRecord: record });
  }

  parsePagination = (data: any = {}) => {
    console.log(data)
    const { total = 0, currentPageNumber = 1, perPageSize = 10 } = data;
    return {
      total,
      current: currentPageNumber,
      pageSize: perPageSize,
    }
  }

  getRecordList = (pagination: Partial<IPagination> = {}) => {
    const {current, pageSize } = pagination;
    this.setState({ tableLoading: true });
    API.getRecordList({
      pageNum: current,
      pageSize,
    }).then(({ success, content, resultCode, resultDesc }) => {
      if(success) {
        // content.data.push({
        //   "id": 16,
        //   "serialNumber": 125,
        //   "systemCode": "125",
        //   "systemType": "指挥调度",
        //   "systemName": "西湖水域船舶管理系统",
        //   "subordinateDepartments": "水域管理局",
        //   "accessSituation": "已接入",
        //   "databaseProperties": "自建系统",
        //   "accessMode": "数据中转库",
        //   "updateFrequency": "月",
        //   "lastUpdated": 1570807574000,
        //   "accessTime": 2018,
        //   "systemDescription": "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
        //   "surfaceName": 4,
        //   "haveDictionary": "有中文",
        //   "dataType": "",
        //   "currentSituation": "",
        //   "analysisIndex": "不同时段的订票情况、票务状态、转化率（总支付-已退）/总支付"
        // })
        const timeParser = (item) => {
          if(item.lastUpdated) {
            item.lastUpdated = moment(item.lastUpdated).format('YYYY-MM-DD');
          }
          if(item.accessTime) {
            item.accessTime = moment(item.accessTime).format('YYYY-MM-DD');
          }
          return item;
        }
        const nextPagination = this.parsePagination(content);
        this.setState({ recordList: content.data.map(timeParser), pagination: nextPagination });
      } else {
      }
    })
    .catch(err => {
      message.error(err.message);
    })
    .finally(() => {
      this.setState({ tableLoading: false });
    })
  }

  deleteRecordById = (id: number) => {
    API.deleteRecordById({ id }).then(({ success, resDesc }) => {
      if(success) {
        message.success('删除成功');
      } else {
        message.error(resDesc);
      }
    }).catch(err => {
      message.error(err.message);
    })
  }

  handlePageChange = (pagination) => {
    console.log(pagination)
    // this.getRecordList()
    this.setState({ pagination }, () => {
      this.getRecordList(this.state.pagination)
    })
  }

  handleEdit = (record) => {
    this.setState({ editMode: EditMode.UPDATE, modalVisible: true, editRecord: record });
  }

  handleAdd = () => {
    this.setState({ editMode: EditMode.ADD, modalVisible: true, editRecord: {} });
  }

  handleDeleteRecord = (record) => {
    confirm({
      title: '确认删除该条记录吗？',
      content: record.systemName,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteRecordById(record.id);
        const { pagination, recordList } = this.state;
        if(recordList.length === 1 && pagination.current !== 1) {
          this.setState({ pagination: Object.assign(pagination, { current: pagination.current - 1 }) });
        }
        this.getRecordList(this.state.pagination);
      },
      onCancel: () => {
        message.info('取消成功');
      }
    })
  }

  handleModalCancel = () => {
    confirm({
      title: '是否确认关闭对话框？',
      okText:'确认',
      cancelText: '取消',
      onOk: () => {
        this.setState({ modalVisible: false, editRecord: {} });
      },
      onCancel: () => {}
    })
  }

  handleAddRecord = (editRecord: any) => {
    // this.setState({ editMode: EditMode.ADD, modalVisible: true });
    API.saveRecord(editRecord).then((res) => {
      console.log(res)
      if(res.success) {
        message.success('添加成功');
        this.setState({ modalVisible: false });
        this.getRecordList(this.state.pagination);
      } else {
        message.error(res.resultDesc);
      }
    })
    .catch(err => {
      message.error(err.message);
    })
  }

  handleUpdateReecord = (editRecord: any) => {
    if(editRecord.lastUpdated) {
      console.log(moment(editRecord.lastUpdated));
      // editRecord.lastUpdated = moment()
    }
    confirm({
      title: '是否确认修改该记录',
      onOk: () => {
        API.updateRecord(editRecord).then(({ success, resultDesc }) => {
          if (success) {
            message.success('修改成功');
            this.setState({ modalVisible: false });
            this.getRecordList(this.state.pagination);
          } else {
            message.error(resultDesc);
          }
        }).catch(err => {
          message.error(err.message);
        })
      },
      onCancel: () => {
        message.info('取消编辑');
      }
    })
    
  }

  render() {
    const columns: any = fieldsMap.map(({ key, value }) => {
      return {
        key,
        title: value,
        dataIndex: key,
        align: 'center',
      }
    });
    columns.unshift({ key: 'index', title: '序号', render: (...args: any[]) => args[2] + 1, width: 100, align: 'center' });
    columns.push({
      key: 'action', title: '操作', align: 'center', width: 60, render: (record) => <div>
        <Icon className="icon-button" type="delete" title="删除" onClick={() => this.handleDeleteRecord(record)} />
        <Icon className="icon-button" type="edit" title="编辑" onClick={() => this.handleEdit(record)} />
      </div>
    })

    const { recordList } = this.state;
    return (
      <div className="home-page">
        <TableArea
          recordList={recordList}
          columns={columns}
          handleAdd={this.handleAdd}
          pagination={this.state.pagination}
          handlePageChange={this.handlePageChange}
          tableLoading={this.state.tableLoading}
        />
        <Modal
          title={this.state.editMode === EditMode.ADD ? '新增' : '编辑'}
          visible={this.state.modalVisible}
          onOk={() => { this.state.editMode === EditMode.ADD ? this.handleAddRecord(this.state.editRecord) : this.handleUpdateReecord(this.state.editRecord)}}
          onCancel={this.handleModalCancel}
          okText="确认"
          cancelText="取消"
        >
          <FormArea
            fieldsMap={fieldsMap}
            editRecord={this.state.editRecord}
            setEditRecord={this.setEditRecord}
          />
        </Modal>
      </div>
    );
  }
}

export default withRouter(Home)
